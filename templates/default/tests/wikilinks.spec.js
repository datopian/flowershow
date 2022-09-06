const { test, expect } = require('@playwright/test');
const { MarkdownPage } = require('./markdown-page');

test.describe('wiki links', () => {

  // test("parses a wiki link", async ({ page }) => {
  //   const Page = new MarkdownPage(page);
  //   await Page.goto('/docs/syntax');
  //   await Page.getData(page);

  //   const wikiLink = await Page.props.body.raw.includes(' [[features]]')

  //   if (wikiLink) {
  //       const link = page.locator('a[href="/features"]')
  //       await expect(link).toBeTruthy()
  //       await expect(link).toHaveText('features')
  //       await expect(link).toHaveClass('internal new')
  //   }
  // })

  // test("parses a wiki link with custom divider", async ({ page }) => {
  //   const Page = new MarkdownPage(page);
  //   await Page.goto('/docs/syntax');
  //   await Page.getData(page);

  //   const wikiLink = await Page.props.body.raw.includes('[[docs/index|wikilinks]]')

  //   if (wikiLink) {
  //       const link = page.locator('a[href="/docs"]')
  //       await expect(link).toBeTruthy()
  //       await expect(link).toHaveText('wikilinks')
  //       await expect(link).toHaveClass('internal')
  //   }
  // })

  // test("parses a wiki link with header", async ({ page }) => {
  //   const Page = new MarkdownPage(page);
  //   await Page.goto('/docs/syntax');
  //   await Page.getData(page);

  //   const wikiLink = await Page.props.body.raw.includes(' [[roadmap#Planned features 🚧]]')

  //   if (wikiLink) {
  //       const link = page.locator('a[href="/docs/roadmap#planned-features-🚧"]')

  //       await expect(link).toBeTruthy()
  //       await expect(link).toHaveText('roadmap#Planned features 🚧')
  //       await expect(link).toHaveClass('internal')
  //   }
  // })

  // test("parses a wiki link with header and custom divider", async ({ page }) => {
  //   const Page = new MarkdownPage(page);
  //   await Page.goto('/docs/syntax');
  //   await Page.getData(page);

  //   const wikiLink = await Page.props.body.raw.includes(' [[roadmap#Features 🚧|Work in progress...]]')
  //   if (wikiLink) {
  //       const link = page.locator('a[href="/docs/roadmap#features-🚧"]')

  //       await expect(link).toBeTruthy()
  //       await expect(link).toHaveText('Work in progress...')
  //       await expect(link).toHaveClass('internal')
  //   }
  // })

});
