const { test, expect } = require("@playwright/test")
const { MarkdownPage } = require('./markdown-page')

test.describe("Pages", () => {

  // Test if index page exists and is from markdown
  test("index.md @ root", async ({ page, baseURL }) => {
    const Page = new MarkdownPage(page)
    await Page.goto('/')
    await Page.getData(page)

    expect(Page.props.url).toBe('');
    expect(Page.props._raw.sourceFilePath).toBe('index.md')
  });

  // Test About page exists and is from markdown
  // test('about.md @ root', async ({ page }) => {
  //   const Page = new MarkdownPage(page)
  //   await Page.goto("/about");
  //   await Page.getData(page);

  //   expect(Page.props.url).toBe('about');
  //   expect(Page.props._raw.sourceFilePath).toBe("about.md");
  // })

  // Test for nested index.md routes
  test('Nested index routes [demo/index.md]', async ({ page, baseURL }) => {
    const Page = new MarkdownPage(page);
    await Page.goto("/demo");
    await Page.getData(page);

    expect(Page.props.url).toBe("demo");
    expect(Page.props._raw.sourceFilePath).toBe("demo/index.md");
    
  })
});
