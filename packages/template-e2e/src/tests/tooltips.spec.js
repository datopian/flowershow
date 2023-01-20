// TODO: Add tooltips test

// const { test, expect } = require("@playwright/test");
// const { MarkdownPage } = require("../support/markdown-page");

// test.describe.parallel("Link previews on hover", () => {
//   test.beforeEach(async ({ page }) => {
//     const Page = new MarkdownPage(page);
//     await Page.goto("/markdownFeatures");
//     await Page.getData();
//   });

//   test("links", async ({ page }) => {
//     const link = page.locator("#links > p > a");
//     await expect(link).toContainText("Link to fixture page");
//     await link.hover()
//     const tooltipContent = await page.getByRole("tooltip").textContent()
//     await link.click();
//     await expect(page).toHaveURL("/fixturepage");
//   });
// });
