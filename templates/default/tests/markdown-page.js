const { expect } = require('@playwright/test');

exports.MarkdownPage = class PlaywrightPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async getData(page) {
    const res = await page.evaluateHandle(() => document.body.querySelector('#__NEXT_DATA__'));

    const {
      props: { pageProps },
    } = JSON.parse(await res.innerText());

    this.props = pageProps;

    expect(this.props).toHaveProperty(['_raw'] && ['url']);
    expect(this.props._raw.contentType).toBe('markdown');

    await res.dispose();
  }

  async pageObjectModel() {
    await this.getData();
  }
};
