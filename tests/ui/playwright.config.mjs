import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.mjs",
  outputDir: "../../output/playwright/test-results",
  reporter: "list",
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4180",
    viewport: { width: 1280, height: 900 },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium", launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined } } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"], launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined } } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: [{
    cwd: fileURLToPath(new URL("../../", import.meta.url)),
    command: "node tests/ui/server.mjs",
    url: "http://127.0.0.1:4180/portfolio/tests/ui/index.html",
    reuseExistingServer: false,
  }, {
    cwd: fileURLToPath(new URL("../../", import.meta.url)),
    command: "node tests/ui/production-server.mjs",
    url: "http://127.0.0.1:4181/portfolio/",
    reuseExistingServer: false,
  }],
});
