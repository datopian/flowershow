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

test.describe.parallel("blog page with authors in frontmatter", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/blog/blogtest");
    await Page.getData();
  });

  test("displays and links to author matched by the slug", async ({ page }) => {
    await page.locator("a", { hasText: "John the Great" }).click();
    await expect(page).toHaveURL("/people/john-doe");
    await expect(page).toHaveTitle("John the Great");
  });

  test("displays and links to author matched by the id", async ({ page }) => {
    await page.locator("a", { hasText: "Jane the Great" }).click();
    await expect(page).toHaveURL("/people/jane-doe");
    await expect(page).toHaveTitle("Jane the Great");
  });

  test("displays and links to author matched by the name", async ({ page }) => {
    await page.locator("a", { hasText: "Joe Bloggs" }).click();
    await expect(page).toHaveURL("/people/joe-bloggs");
    await expect(page).toHaveTitle("Joe Bloggs");
  });

  test("doesn't link to author page if it is a draft", async ({ page }) => {
    await expect(page.locator("text=John Nokes")).toHaveCount(1);
    await expect(page.locator("a", { hasText: "John Nokes" })).toHaveCount(0);
  });

  test("displays provided author name if no match found", async ({ page }) => {
    await expect(page.locator("text=The Other Guy")).toHaveCount(1);
  });

  // test("displays author's bio on hover", async ({ page }) => {
  // not implemented
  // });

  // test("author's page displays a list of all pages authored by them", async ({ page }) => {
  // not implemented
  // });
});

test.describe.parallel("blog page without authors", () => {
  test.beforeEach(async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/blogtest");
    await Page.getData();
  });

  test("displays a default author (set in config.js) on Blogs with no frontmatter `authors` field set", async ({
    page,
  }) => {
    await page.locator("a", { hasText: "John the Great" }).click();
    await expect(page).toHaveURL("/people/john-doe");
    await expect(page).toHaveTitle("John the Great");
  });
});
