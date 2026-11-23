import { expect, test } from "@playwright/test";

test("home shows the live stage", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Motion, measured." })).toBeVisible();
  await expect(page.getByRole("region", { name: /stage/i })).toBeVisible();
  await expect(page.getByText("LOADING")).toHaveCount(0);
  await page.screenshot({ path: "e2e/artifacts/home-desktop.png", fullPage: true });
});

test("home stays in frame at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Motion, measured." })).toBeVisible();
  await expect(page.getByRole("region", { name: /stage/i })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "e2e/artifacts/home-mobile.png", fullPage: true });
});

test("playground opens a fade", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/playground/motion/fade");
  await expect(page.getByRole("region", { name: /Motion Fade stage/i })).toBeVisible();
  await expect(page.getByText("LOADING")).toHaveCount(0);
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("button", { name: "Play", exact: true })).toBeVisible();
  await page.screenshot({ path: "e2e/artifacts/playground-desktop.png" });
});

test("playground stays in frame at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/playground/motion/fade");
  await expect(page.getByRole("link", { name: "Fade" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "e2e/artifacts/playground-mobile.png" });
});

test("compare renders two columns on a wide screen", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/compare/fade");
  await expect(page.getByRole("heading", { name: "Motion" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "GSAP" })).toBeVisible();
  await page.screenshot({ path: "e2e/artifacts/compare-desktop.png" });
});

test("compare stays usable at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/compare/fade");
  await expect(page.getByRole("button", { name: "Motion" })).toBeVisible();
  await page.screenshot({ path: "e2e/artifacts/compare-mobile.png" });
});

test("studio reset restores the clock", async ({ page }) => {
  await page.goto("/studio");
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByRole("region", { name: /stage/i })).toBeVisible();
});

test("benchmarks render the bundle table", async ({ page }) => {
  await page.goto("/benchmarks");
  await expect(page.getByText("gzip", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("tab", { name: "Runtime" })).toBeVisible();
});
