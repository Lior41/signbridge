import { test, expect } from "@playwright/test";
test("research limitations and manual correction are visible", async ({ page }) => {
  await page.goto("/studio");
  await expect(page.getByText("Recognition isn’t available yet.")).toBeVisible();
  await expect(page.getByText("CAMERA OFF", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Try a prewritten interface scenario" }).click();
  await expect(page.getByText("PREWRITTEN WALKTHROUGH · NOT AI OUTPUT")).toBeVisible();
  await page.getByRole("button", { name: "Not what I meant" }).click();
  await expect(page.getByText("Suggestion rejected. No meaning was assumed.")).toBeVisible();
  await page.getByLabel("Type what you mean (stays in this page)").fill("Please write your reply.");
  await page.getByRole("button", { name: "Add to this walkthrough" }).click();
  await expect(page.getByText("Please write your reply.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "End walkthrough" }).click();
  await expect(page.getByText("Please write your reply.", { exact: true })).not.toBeVisible();
});
test("unsupported local files are rejected before any upload", async ({ page }) => {
  await page.goto("/studio");
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "sample.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("Synthetic invalid clip"),
    });
  await expect(page.getByRole("alert").filter({ hasText: /MP4|WebM/ })).toBeVisible();
});
