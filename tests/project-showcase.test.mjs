import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, mkdtempSync, unlinkSync, rmdirSync } from "node:fs";
import { tmpdir } from "node:os";
import sharp from "sharp";
import { dirname, basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { myProjects, projectThumbnailWidths } from "../src/components/constants/index.js";
import { translations } from "../src/translations/translations.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const keys = ["weatherDashboard", "stockManager", "botGastos", "proajuCleaner", "mittyTattu"];
const expectedActions = [
  ["https://github.com/mfrickss/GlobalWeatherDashboard", "https://global-weather-dashboard-cyan.vercel.app/", false, null],
  ["https://github.com/mfrickss/stockmanager", "https://stockmanager-navy-ten.vercel.app/login/?next=/", false, null],
  ["https://github.com/mfrickss/n8n_bot_gastos", null, false, null],
  [null, null, true, "internalProject"],
  [null, "https://mitty-psi.vercel.app/", false, "privateRepository"],
];

test("exactly five unique cases in the specified order", () => {
  assert.deepEqual(myProjects.map(({ key }) => key), keys);
  assert.equal(new Set(myProjects.map(({ id }) => id)).size, 5);
});

test("public, internal and private cases expose exactly the specified actions", () => {
  assert.deepEqual(myProjects.map(({ githubUrl, deployUrl, isCaseStudy, badgeKey }) =>
    [githubUrl, deployUrl, isCaseStudy, badgeKey]), expectedActions);
});

function requireText(value) {
  assert.equal(typeof value, "string");
  assert.ok(value.trim());
}

test("PT and EN contain each overview, technical bullet and accessible label", () => {
  const labels = ["title", "imageUnavailable", "viewDetails", "close", "viewGithub", "viewDeploy", "viewArchitecture", "hideArchitecture", "technologies", "confidentiality", "technicalHighlights"];
  for (const language of ["pt", "en"]) {
    const copy = translations[language].projects;
    assert.deepEqual(Object.keys(copy.items).sort(), [...keys].sort());
    labels.forEach((label) => requireText(copy[label]));
    ["internalProject", "privateRepository"].forEach((badge) => requireText(copy.badges[badge]));
    assert.equal(Object.hasOwn(copy, "starLabels"), false);
    for (const key of keys) {
      const item = copy.items[key];
      ["title", "description", "imageAlt", "overview"].forEach((field) => requireText(item[field]));
      assert.equal(Object.hasOwn(item, "star"), false);
      assert.ok(item.highlights.length > 0);
      item.highlights.forEach(requireText);
      assert.equal(Boolean(item.architecture), key === "proajuCleaner");
    }
    const architecture = copy.items.proajuCleaner.architecture;
    assert.equal(architecture.steps.length, 3);
    architecture.steps.forEach(({ title, description }) => { requireText(title); requireText(description); });
    requireText(architecture.failureHandling);
    requireText(architecture.security);
    assert.doesNotMatch(JSON.stringify(copy), /ShingekiAPI|SportConnect|Dessert Delight|Clone TabNews|peticionamento/i);
  }
  for (const key of keys) {
    assert.equal(translations.pt.projects.items[key].highlights.length, translations.en.projects.items[key].highlights.length);
  }
});

test("images have accurate intrinsic dimensions and diagrams use contain", () => {
  for (const project of myProjects) {
    const image = readFileSync(resolve(root, "public", project.image));
    assert.equal(image.subarray(1, 4).toString(), "PNG");
    assert.equal(image.readUInt32BE(16), project.imageWidth);
    assert.equal(image.readUInt32BE(20), project.imageHeight);
    assert.equal(project.imageFit, ["botGastos", "proajuCleaner"].includes(project.key) ? "contain" : "cover");
  }
});

test("every case image exists with exact filename casing and is not ignored", () => {
  const assets = new Set(myProjects.map(({ image }) => image));
  for (const project of myProjects) for (const width of projectThumbnailWidths) assets.add(`${project.cardImage}-${width}.webp`);
  for (const asset of assets) {
    const path = resolve(root, "public", asset);
    assert.ok(existsSync(path), asset);
    assert.ok(readdirSync(dirname(path)).includes(basename(path)), asset);
    const result = spawnSync("git", ["check-ignore", "--no-index", "--stdin"], {
      cwd: root, input: "public/" + asset, encoding: "utf8"
    });
    assert.equal(result.status, 1, `${asset}: ${result.stdout || result.stderr}`);
    if (process.env.CI) {
      const tracked = spawnSync("git", ["ls-files", "--error-unmatch", "public/" + asset], { cwd: root, encoding: "utf8" });
      assert.equal(tracked.status, 0, `${asset} must be tracked for reproducible builds`);
    }
  }
});

test("responsive covers have correct dimensions and a bounded download size", async () => {
  let standardCoverBytes = 0;
  for (const project of myProjects) {
    for (const width of projectThumbnailWidths) {
      const bytes = readFileSync(resolve(root, "public", `${project.cardImage}-${width}.webp`));
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, "webp");
      assert.equal(metadata.width, width);
      assert.equal(metadata.height, width * 9 / 16);
      assert.ok(bytes.length < 150_000, `${project.key} ${width}w: ${bytes.length} bytes`);
      if (width === 768) standardCoverBytes += bytes.length;
    }
  }
  assert.ok(standardCoverBytes < 250_000, `${standardCoverBytes} bytes for the five 768w covers`);
});

test("native re-export stays synchronized with catalog dimensions", { skip: process.platform !== "win32" }, () => {
  const output = mkdtempSync(resolve(tmpdir(), "portfolio-media-"));
  const projects = myProjects.filter(({ key }) => ["botGastos", "proajuCleaner"].includes(key));
  try {
    const result = spawnSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", resolve(root, "scripts/export-project-media.ps1"), "-OutputDirectory", output], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    for (const project of projects) {
      const image = readFileSync(resolve(output, basename(project.image)));
      assert.equal(image.readUInt32BE(16), project.imageWidth);
      assert.equal(image.readUInt32BE(20), project.imageHeight);
    }
  } finally {
    for (const project of projects) {
      const path = resolve(output, basename(project.image));
      if (existsSync(path)) unlinkSync(path);
    }
    rmdirSync(output);
  }
});

test("technology labels are consistent, unversioned and text-only", () => {
  const names = new Map();
  for (const project of myProjects) {
    for (const tag of project.tags) {
      assert.equal(Object.hasOwn(tag, "path"), false);
      if (tag.id === "n8n") assert.equal(tag.name, "n8n");
      else assert.doesNotMatch(tag.name, /\d|\b(?:Flash|API|AJAX)\b|pytest-django/);
      if (names.has(tag.id)) assert.equal(tag.name, names.get(tag.id));
      names.set(tag.id, tag.name);
    }
    assert.equal(new Set(project.tags.map(({ id }) => id)).size, project.tags.length);
  }
  assert.equal(names.get("pytest"), "pytest");
  assert.equal(names.get("react"), "React");
  assert.equal(names.get("gemini"), "Google Gemini");
});

test("PROAJU source contains qualitative results and no unsupported metric", () => {
  const source = JSON.parse(readFileSync(resolve(root, "assets-source/projects/Proaju-CDACleaner.excalidraw"), "utf8").replace(/^\uFEFF/, ""));
  const text = source.elements.filter(({ type }) => type === "text").map(({ text, originalText }) => text + originalText).join("\n");
  assert.doesNotMatch(text, /80%|peticionamento|Ã/);
  assert.match(text, /Redução de\ntrabalho manual/);
});
