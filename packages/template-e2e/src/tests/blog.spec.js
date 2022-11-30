const { test, expect } = require("@playwright/test");
const { MarkdownPage } = require("../support/markdown-page");

test.describe.parallel("blog index", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/blog");
    await Page.getData();
  });

  test("blog link1", async ({ page }) => {
    await page.locator("text=Conquer the seven seas").click();
    await expect(page).toHaveURL("/blog/blogtest1");
    await expect(page).toHaveTitle("Conquer the seven seas");
  });

  test("blog link2", async ({ page }) => {
    await page.locator("text=Conquer the lakes").click();
    await expect(page).toHaveURL("/blog/blogtest2");
    await expect(page).toHaveTitle("Conquer the lakes");
  });

  test("blog link3", async ({ page }) => {
    await page.locator("text=Conquer the puddles").click();
    await expect(page).toHaveURL("/blog/blogtest3");
    await expect(page).toHaveTitle("Conquer the puddles");
  });
});
