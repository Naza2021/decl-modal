import { Locator, expect } from "@playwright/test";

export const waitForModalVisible = async (modal: Locator) => {
  await expect(modal).toBeVisible();

  await modal.evaluate((el) => getComputedStyle(el).opacity == "1");
};
