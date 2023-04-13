# Configuration

Flowershow supports setting common configuration values using a `config.js` file in your content directory. With it you can customize some things like website title, navigation links in the navbar, or set your google analytics key.

## Create `config.js`

Example of configuration in `your-content-dir/config.js`:

```js
const config = {
  title: "My Awesome Blog",
  description: "This is my awesome blog built with Flowershow",
  author: "John",
  authorLogo: "/images/logo.svg",
  authorUrl: "https://john.app/",
  // links to the pages you want to link to in the navbar and in the footer
  navLinks: [{ href: "/about", name: "About" }],
};

export default config;
```

### Title and Logo

The Title and the logo in the navbar can be set by adding a **navbarTitle** attribute in your config.

```js
const userConfig = {
  ...
  navBarTitle: {
    text: "Your custom title here",
    logo: "/assets/your-logo.svg", // optional
  },
};
```

## Edit this page link

If you keep your content in a public GitHub repository, and would like to encourage other people to contribute to it, you can show "Edit this page" button at the bottom of the page. It will link to the source file in your repository.

In order to make it work, you'll first need to set these two properties in your `config.js` file:

```js
const userConfig = {
  ...
  showEditLink: true,
  editLinkRoot: "https://github.com/flowershow/flowershow/edit/main/site",
};
```

You can also overwrite the `showEditLink` property in a single page by including this field in the frontmatter:

```md
---
showEditLink: false
---
```
