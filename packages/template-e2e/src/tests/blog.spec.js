const { test, expect } = require("@playwright/test");
const { MarkdownPage } = require("../support/markdown-page");

test.describe.parallel("blog index page", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/blog");
    await Page.getData();
  });

  test("correctly renders a blog post from /blog dir", async ({ page }) => {
    await page.locator("text=Conquer the seven seas").click();
    await expect(page).toHaveURL("/blog/blogtest");
    await expect(page).toHaveTitle("Conquer the seven seas");
  });

  test("correctly renders a page from outside of /blog dir", async ({
    page,
  }) => {
    await page.locator("text=Conquer the puddles").click();
    await expect(page).toHaveURL("/blogtest");
    await expect(page).toHaveTitle("Conquer the puddles");
  });
});
