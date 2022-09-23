---
title: Optional "Edit this page" button
editLink: true
---

If you keep your content in a public GitHub repository, and would like to encourage other people to contribute to it, you can show "Edit this page" button at the bottom of the page. It will link to the source file in your repository.

In order to make it work, you'll first need to set these two properties in your `config.js` file:

```js
{
  repoRoot: "https://github.com/flowershow/flowershow", //example
  repoEditPath: "/edit/main/site/content/", //example
}
```

## Default setting

You can disable or enable showing the button for all your pages by setting this property in your `config.js` file. The button is disabled by default.

```js
{
	editLinkShow: false,
}
```

## Per-page setting

You can also overwrite the default setting in single pages by including this field in the frontmatter:

```md
---
editLink: true
---
```
