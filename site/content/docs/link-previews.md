---
title: Link Preview Tooltips
---

Flowershow supports showing tooltips with the page's preview content when hovering over links to other documents within your site.

> [!note]
> Tooltips are only supported for internal links ie. links to other pages within your site and not for external links eg. `https://someOtherSite.com/`

After hovering over a link, the tooltip will be displayed as seen in the screenshot below:
![[link-preview.jpg]]

If your page has an image in the frontmatter, the image will also be displayed in the following style
![[link-preview-with-image.jpg]]

This feature is enabled by default and if not required, it can be toggled off by setting the `linkPreviews` variable to false in your `config.js` file.

```js
// config.js

const config = {
  linkPreviews: false,
};
```
