// const { test, expect } = require("@playwright/test");
// const { MarkdownPage } = require("../support/markdown-page");

// test.describe.parallel("custom components", () => {
//   test.beforeEach(async ({ page }) => {
//     const Page = new MarkdownPage(page);
//     await Page.goto("/mdxFeatures");
//     await Page.getData();
//   });

//   test("components using Next.js Link", async ({ page }) => {
//     const link = page.locator("#nextlinkbutton a");
//     await expect(link).toContainText("I'm a Next Link Button");
//     await link.click();
//     await expect(page).toHaveURL("/fixturepage");
//   });
// });
