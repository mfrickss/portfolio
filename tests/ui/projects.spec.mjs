import { test, expect } from "@playwright/test";
import { translations } from "../../src/translations/translations.js";

const copy = translations.pt.projects;
const fixture = "/portfolio/tests/ui/index.html";
const opener = (page, key) => page.getByRole("button", { name: `${copy.viewDetails}: ${copy.items[key].title}`, exact: true });

test.beforeEach(async ({ page }) => {
  await page.goto(fixture);
  await expect(page.locator("article")).toHaveCount(5);
});

test("keyboard opening, Escape and close button restore focus and body overflow", async ({ page }) => {
  await page.evaluate(() => { document.body.style.overflow = "clip"; });
  const trigger = opener(page, "weatherDashboard");
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: copy.items.weatherDashboard.title })).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("overflow", "clip");
  await page.keyboard.press("Space");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: copy.close, exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("architecture expands, collapses and resets on reopen without exposing public links", async ({ page }) => {
  await opener(page, "proajuCleaner").click();
  const dialog = page.getByRole("dialog");
  const toggle = dialog.locator("button[aria-controls]");
  const section = page.locator(`[id="${await toggle.getAttribute("aria-controls")}"]`);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(section).toBeHidden();
  await expect(dialog.getByRole("link")).toHaveCount(0);
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(section).toBeVisible();
  await expect(section.locator("ol > li")).toHaveCount(3);
  await expect(section).toContainText(copy.items.proajuCleaner.architecture.security);
  await toggle.click();
  await expect(section).toBeHidden();
  await toggle.click();
  await page.keyboard.press("Escape");
  await opener(page, "proajuCleaner").click();
  await expect(dialog.getByRole("button", { name: copy.viewArchitecture, exact: true })).toHaveAttribute("aria-expanded", "false");
});

test("Strict Mode replays setup and cleanup safely across successive projects", async ({ page }) => {
  await page.addInitScript(() => {
    window.dialogLifecycle = { opened: 0, closed: 0 };
    for (const [method, counter] of [["showModal", "opened"], ["close", "closed"]]) {
      const original = HTMLDialogElement.prototype[method];
      HTMLDialogElement.prototype[method] = function (...args) {
        window.dialogLifecycle[counter] += 1;
        return original.apply(this, args);
      };
    }
  });
  await page.reload();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [index, key] of ["botGastos", "stockManager", "mittyTattu"].entries()) {
    const trigger = opener(page, key);
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await page.evaluate(() => window.dialogLifecycle)).toEqual({ opened: (index + 1) * 2, closed: index * 2 + 1 });
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    expect(await page.evaluate(() => window.dialogLifecycle)).toEqual({ opened: (index + 1) * 2, closed: (index + 1) * 2 });
  }
  expect(errors).toEqual([]);
});

test("focus wraps inside the modal and backdrop click closes it", async ({ page }) => {
  await opener(page, "weatherDashboard").click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: copy.close, exact: true });
  const last = dialog.getByRole("link").last();
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(last).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.mouse.click(5, 5);
  await expect(dialog).toHaveCount(0);
  await expect(opener(page, "weatherDashboard")).toBeFocused();
});

test("cards request WebP thumbnails and full resolution is loaded only in details", async ({ page }) => {
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.reload();
  for (const card of await page.locator("article").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.locator("img").evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await card.locator("img").evaluate((img) => img.currentSrc)).toMatch(/\/thumbnails\/.*-(384|768|1152)\.webp$/);
  }
  expect(requests.filter((url) => /\/assets\/projects\/[^/]+\.png$/.test(url))).toEqual([]);
  await opener(page, "weatherDashboard").click();
  const full = page.getByRole("dialog").locator("img");
  await expect.poll(() => full.evaluate((img) => img.naturalWidth)).toBe(1901);
  expect(await full.getAttribute("src")).toMatch(/globalWeather\.png$/);
});

test("failed card and detail images keep context and actions usable", async ({ page }) => {
  await page.route("**/assets/projects/thumbnails/**", (route) => route.abort());
  await page.route("**/assets/projects/globalWeather.png", (route) => route.abort());
  await page.reload();
  const card = page.locator("article").first();
  await expect(card.getByRole("img")).toContainText(copy.imageUnavailable);
  await expect(card.getByRole("heading")).toHaveText(copy.items.weatherDashboard.title);
  await opener(page, "weatherDashboard").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("img")).toContainText(copy.imageUnavailable);
  await expect(dialog.getByRole("heading", { name: copy.items.weatherDashboard.title })).toBeVisible();
  await expect(dialog.getByRole("link", { name: copy.viewGithub })).toHaveAttribute("href", /github.com/);
  await expect(dialog.getByRole("link", { name: copy.viewDeploy })).toHaveAttribute("href", /vercel.app/);
  await page.keyboard.press("Escape");
  await expect(opener(page, "weatherDashboard")).toBeFocused();
});

test("mobile viewport chooses a smaller cover and remains usable with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const image = page.locator("article img").first();
  await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  const highDensity = await page.evaluate(() => devicePixelRatio > 2);
  expect(await image.evaluate((img) => img.currentSrc)).toMatch(highDensity ? /-(768|1152)\.webp$/ : /-(384|768)\.webp$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await opener(page, "weatherDashboard").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(opener(page, "weatherDashboard")).toBeFocused();
});
