const { test, expect } = require("@playwright/test");
// const { MarkdownPage } = require("../support/markdown-page");

test.describe.parallel("LHS sidebar (site-wide ToC)", () => {
  test("shows sidebar on a page", async ({ page }) => {
    // const Page = new MarkdownPage(page);
    // await Page.goto("/fixturepage");
    // await Page.getData();
    await page.goto("/fixture-page");

    await expect(page.getByTestId("lhs-sidebar")).toBeVisible();
  });

  test("doesn't show sidebar on a page with disabled sidebar", async ({
    page,
  }) => {
    // const Page = new MarkdownPage(page);
    // await Page.goto("/");
    // await Page.getData();
    await page.goto("/");

    await expect(page.getByTestId("lhs-sidebar")).toBeHidden();
  });

  test("can navigate to a listed page", async ({ page }) => {
    // const Page = new MarkdownPage(page);
    // await Page.goto("/fixturepage");
    // await Page.getData();
    await page.goto("/fixture-page");

    await page
      .getByTestId("lhs-sidebar")
      .getByText("Conquer the puddles")
      .click();
    await expect(page).toHaveURL("/blogtest");
  });
});
