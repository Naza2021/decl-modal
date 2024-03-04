import { expect, test } from "@playwright/test";
import { waitForModalVisible } from "./utilts";

const generalTests = () => {
  test("Popup", async ({ page }) => {
    const popup = page.getByTestId("popup");
    await popup.click();
    const modal = page.locator("[data-modal-back-id]");
    await waitForModalVisible(modal);
    const popupButton = modal.locator("button");
    await popupButton.click();
    await page.mouse.move(0, 0);
    await expect(modal).not.toBeVisible();
  });

  test("Menu", async ({ page }) => {
    const menu = page.getByTestId("menu");
    await menu.click();
    const modal = page.locator("[data-modal-back-id]");
    await waitForModalVisible(modal);
    await modal.click();
    await expect(modal).not.toBeVisible();
  });

  test("Modal", async ({ page }) => {
    const exampleModal = page.getByTestId("modal");
    await exampleModal.click();
    const modal = page.locator("[data-modal-back-id]");
    await waitForModalVisible(modal);
    await modal.click({ position: { x: 0, y: 0 } });
    await expect(modal).not.toBeVisible();
  });

  test("Tooltip", async ({ page }) => {
    const tooltip = page.getByTestId("tooltip");
    const tooltipCoords = await tooltip.boundingBox();
    if (!tooltipCoords) throw new Error();
    await page.mouse.move(tooltipCoords?.x, tooltipCoords?.y);
    const modal = page.locator("[data-modal-back-id]");
    await waitForModalVisible(modal);
    await page.mouse.move(0, 0);
    await expect(modal).not.toBeVisible();
  });

  test.describe("Input Modal", () => {
    test.beforeEach(async ({ page }) => {
      const exampleModal = page.getByTestId("input");
      await exampleModal.click();
      const modal = page.locator("[data-modal-back-id]");
      await waitForModalVisible(modal);
      await page.locator("input").fill("test");
      await modal.locator("button").click();
      await expect(modal).not.toBeVisible();
    });

    test("Modal Input Working", async ({ page }) => {
      await expect(page.getByTestId("toast")).toHaveText("Input: test");
    });

    test("Toast", async ({ page }) => {
      const exampleModal = page.getByTestId("toast");
      await exampleModal.click();
      const modal = page.locator("[data-modal-back-id]");
      await waitForModalVisible(modal);
      await modal.click();
      await expect(modal).not.toBeVisible();
    });
  });
};

test.describe("Next.js", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  generalTests();
});

test.describe("Svelte", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  generalTests();
});
