const { test, expect } = require("@playwright/test")
const { MarkdownPage } = require('./markdown-page')

test.describe("wiki links", () => {

  test("parses a wiki link", async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto('/demo/wiki-links');
    await Page.getData(page);

    const wikiLink = await Page.props.body.raw.includes(' [[docs]] ')
    
    if (wikiLink) {
        const link = page.locator('a[href="/demo/docs"]')
        
        await expect(link).toBeTruthy()
        await expect(link).toHaveText('docs')
        await expect(link).toHaveClass('internal')
    }
  })
  
  test("parses a wiki link with custom divider", async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto('/demo/wiki-links');
    await Page.getData(page);

    const wikiLink = await Page.props.body.raw.includes(' [[demo/index|Demo page]] ')
    
    if (wikiLink) {
        const link = page.locator('a[href="/demo/index"]')
        
        await expect(link).toBeTruthy()
        await expect(link).toHaveText('Demo page')
        await expect(link).toHaveClass('internal')
    }
  })

  test("parses a wiki link with header", async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto('/demo/wiki-links');
    await Page.getData(page);

    const wikiLink = await Page.props.body.raw.includes(' [[nextjs-plugins#NextJS Plugin Research]] ')
    
    if (wikiLink) {
        const link = page.locator('a[href="/notes/nextjs-plugins#nextjs-plugin-research"]')
        
        await expect(link).toBeTruthy()
        await expect(link).toHaveText('nextjs-plugins#NextJS Plugin Research')
        await expect(link).toHaveClass('internal')
    }
  })

  test("parses a wiki link with header and custom divider", async ({ page }) => {
    const Page = new MarkdownPage(page);
    await Page.goto('/demo/wiki-links');
    await Page.getData(page);

    const wikiLink = await Page.props.body.raw.includes(' [[tailwind#Tailwind Support|Tailwind Support]] ')
    
    if (wikiLink) {
        const link = page.locator('a[href="/docs/tailwind#tailwind-support"]')
        
        await expect(link).toBeTruthy()
        await expect(link).toHaveText('Tailwind Support')
        await expect(link).toHaveClass('internal')
    }
  })

});
