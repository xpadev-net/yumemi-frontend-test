import { expect, Page, test } from "@playwright/test";

import { mockRESASApi, prefectureData } from "@/__tests__/mock.ts";

test("flow test: valid api key", async ({ page }) => {
  await mockRESASApi(page);
  await page.goto("http://localhost:4173/");
  await inputApiKey(page, "test");
  const prefectureButtons = await validatePrefectureList(page);
  await prefectureButtons[
    Math.round(Math.random() * (prefectureButtons.length - 1))
  ].click();
  await validateGraph(page);
});

test("flow test: invalid api key", async ({ page }) => {
  await mockRESASApi(page);
  await page.goto("http://localhost:4173/");
  await inputApiKey(page, "invalid");
  await validateErrorBanner(page);
});

const inputApiKey = async (page: Page, apiKey: string) => {
  const input = page.locator("input");
  await input.waitFor({ state: "attached" });
  await page.fill("input", apiKey);
  await page.click("button");
  await input.waitFor({ state: "detached" });
};

const validatePrefectureList = async (page: Page) => {
  const buttons = page.locator("button");
  await buttons.first().waitFor({ state: "attached" });
  const prefectureButtons = await buttons.all();
  expect(prefectureButtons.length).toBe(prefectureData.length);
  for (const [index, prefecture] of prefectureData.entries()) {
    expect(await prefectureButtons[index].textContent()).toBe(
      prefecture.prefName,
    );
  }
  return prefectureButtons;
};

const validateErrorBanner = async (page: Page) => {
  const retryButton = page.locator("button[variant=primary]");
  await retryButton.waitFor({ state: "attached" });
  expect(await retryButton.textContent()).toBe("再試行");
};

const validateGraph = async (page: Page) => {
  const graph = page.locator(".recharts-surface");
  await graph.first().waitFor({ state: "attached" });
};
