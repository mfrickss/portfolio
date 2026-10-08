import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { translations } from "../../src/translations/translations.js";

const production = "http://127.0.0.1:4181/portfolio/";

test("production page renders, announces its language and loads local media", async ({ page }, info) => {
  const errors = [];
  const missing = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.url().startsWith(production) && response.status() >= 400) missing.push(response.url()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.labMetrics = { cls: 0, lcp: null };
    if (PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) new PerformanceObserver((list) => { window.labMetrics.lcp = list.getEntries().at(-1).startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.labMetrics.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(production);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("#home canvas")).toBeVisible();
  await expect.poll(() => page.locator("#home canvas").evaluate((canvas) => canvas.width)).toBeGreaterThan(0);
  // Wait for the GLB and decoder before checking for asynchronous render errors.
  await expect.poll(() => page.evaluate(() => performance.getEntriesByType("resource").some((entry) => entry.name.endsWith(".glb") && entry.responseEnd > 0))).toBe(true);
  const metrics = await page.evaluate(() => ({ ...window.labMetrics, viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio }, navigation: performance.getEntriesByType("navigation")[0].toJSON(), paints: performance.getEntriesByType("paint").map((entry) => entry.toJSON()) }));
  await info.attach("local-performance-baseline", { body: JSON.stringify(metrics, null, 2), contentType: "application/json" });
  await writeFile(`output/playwright/performance-${info.project.name}.json`, JSON.stringify(metrics, null, 2));
  for (const image of await page.locator("#work article img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `output/playwright/production-${info.project.name}.png`, fullPage: true });
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("mobile navigation closes on selection and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(production);
  const menu = page.locator("button[aria-controls='mobile-navigation']");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.locator("#mobile-navigation").getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#work")).toBeFocused();
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("language switch updates the open project and document language", async ({ page }) => {
  await page.goto("/portfolio/tests/ui/index.html");
  await page.getByRole("button", { name: "Mudar para Inglês" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const project = translations.en.projects.items.weatherDashboard;
  await page.getByRole("button", { name: `${translations.en.projects.viewDetails}: ${project.title}`, exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText(project.overview);
  // Exercise an external locale update while the modal makes the background inert.
  await page.getByRole("button", { name: "Switch to Portuguese" }).evaluate((button) => button.click());
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("dialog")).toContainText(translations.pt.projects.items.weatherDashboard.overview);
  await page.keyboard.press("Escape");
});

test("contact rejects whitespace and preserves input after delivery failure", async ({ page }) => {
  let deliveries = 0;
  await page.route("https://api.emailjs.com/**", (route) => { deliveries++; return route.fulfill({ status: deliveries === 1 ? 500 : 200, body: deliveries === 1 ? "Failure" : "OK" }); });
  await page.goto(production);
  await page.locator("#contact-name").fill("   ");
  await page.locator("#contact-email").fill("test@example.com");
  await page.locator("#contact-message").fill("   ");
  await page.getByRole("button", { name: translations.pt.contact.send, exact: true }).click();
  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  expect(deliveries).toBe(0);
  await page.locator("#contact-name").fill("Test");
  await page.locator("#contact-message").fill("A test message");
  await page.getByRole("button", { name: translations.pt.contact.send, exact: true }).click();
  await expect(page.locator("#contact")).toContainText(translations.pt.contact.errorMessage);
  await expect(page.locator("#contact-message")).toHaveValue("A test message");
  expect(deliveries).toBe(1);
  await page.getByRole("button", { name: translations.pt.contact.retry, exact: true }).click();
  await expect(page.locator("#contact")).toContainText(translations.pt.contact.successMessage);
  await expect(page.locator("#contact-message")).toHaveValue("");
  expect(deliveries).toBe(2);
});

test("clipboard failure displays the email and does not load confetti", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("Denied")) }, configurable: true }));
  const confettiRequests = [];
  page.on("request", (request) => { if (request.url().includes("confetti.module")) confettiRequests.push(request.url()); });
  await page.goto(production);
  await page.getByRole("button", { name: translations.pt.buttons.copy, exact: true }).click();
  await expect(page.locator("#about")).toContainText(translations.pt.buttons.copyError);
  await expect(page.locator("#about a[href^='mailto:']")).toBeVisible();
  expect(confettiRequests).toEqual([]);
});

test("restored visual effects remain active with the system motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(production);
  await expect(page.locator(".animate-orbit").first()).toHaveCSS("animation-name", "orbit");
  await expect(page.locator(".animate-orbit").first()).toHaveCSS("animation-play-state", "running");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator(".animate-meteor").first()).toHaveCSS("animation-name", "meteor");
});

test("meteors animate and successful email copying launches confetti", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.resolve() }, configurable: true }));
  await page.goto(production);
  const card = page.locator("#about .grid-3");
  await card.scrollIntoViewIfNeeded();
  const meteor = card.locator(".animate-meteor").first();
  await expect(meteor).toHaveCSS("animation-play-state", "running");
  const transform = await meteor.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => meteor.evaluate((element) => getComputedStyle(element).transform)).not.toBe(transform);
  await page.getByRole("button", { name: translations.pt.buttons.copy, exact: true }).click();
  await expect(page.getByRole("button", { name: translations.pt.buttons.copied, exact: true })).toBeVisible();
  await expect(page.locator("body > canvas")).toBeVisible();
});

test("meteors start throughout the card and return-to-top resets parallax immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`${production}#contact`);
  const card = page.locator("#about .grid-3");
  const positions = await card.locator(".animate-meteor").evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().top / 10)));
  expect(new Set(positions).size).toBeGreaterThan(2);
  await page.getByRole("link", { name: translations.pt.footer.backToTop }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  // Capture at the end of scrolling, without waiting for another spring to settle.
  const offset = await page.locator('#home div[style*="mountain-3"]').evaluate((element) => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" ? 0 : new DOMMatrix(transform).m42;
  });
  expect(Math.abs(offset)).toBeLessThan(1);
});

test("a failed 3D module leaves content and project controls usable", async ({ page }) => {
  await page.route("**/assets/HeroScene-*.js", (route) => route.abort());
  await page.goto(production);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const project = translations.pt.projects.items.weatherDashboard;
  await page.getByRole("button", { name: `${translations.pt.projects.viewDetails}: ${project.title}`, exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText(project.overview);
  await page.keyboard.press("Escape");
});

test("3D stops drawing outside the hero and orbit durations follow their props", async ({ page }) => {
  await page.addInitScript(() => {
    window.sceneDraws = 0;
    for (const constructor of [window.WebGLRenderingContext, window.WebGL2RenderingContext].filter(Boolean)) {
      for (const method of ["drawElements", "drawArrays", "drawElementsInstanced", "drawArraysInstanced"]) {
        const original = constructor.prototype[method];
        if (!original) continue;
        constructor.prototype[method] = function (...args) { window.sceneDraws++; return original.apply(this, args); };
      }
    }
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(production);
  await expect.poll(() => page.evaluate(() => window.sceneDraws)).toBeGreaterThan(10);
  await page.evaluate(() => window.scrollTo({ top: document.getElementById("work").offsetTop, behavior: "instant" }));
  await expect.poll(() => page.locator("#home").evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThan(0);
  await page.evaluate(() => new Promise((resolve) => { let frames = 0; const frame = () => ++frames === 10 ? resolve() : requestAnimationFrame(frame); requestAnimationFrame(frame); }));
  const before = await page.evaluate(() => window.sceneDraws);
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 300)));
  expect(await page.evaluate(() => window.sceneDraws)).toBe(before);
  await expect(page.locator(".animate-orbit").first()).toHaveCSS("animation-duration", "50s");
  await expect(page.locator(".animate-orbit").last()).toHaveCSS("animation-duration", "50s");
});
