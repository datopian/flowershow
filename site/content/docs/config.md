# Configuration

Flowershow supports setting common configuration values using a `config.js` file in your content directory. With it you can customize some things like website title, navigation links in the navbar, or set your google analytics key.

## Create `config.js`

Example of configuration in `your-content-dir/config.js`:

```js
const userConfig = {
  title: "My Awesome Blog",
  description: "This is my awesome blog built with Flowershow",
  author: "John",
  // logo image
  authorLogo: "/images/logo.svg",
  // url to author website
  authorUrl: "https://john.app/",
  // links to the pages you want to link to in the navbar
  navLinks: [{ href: "/about", name: "About" }],
  // any folders/files that you want to exclude from being published; all other files in your content folder will be published
  contentExclude: ['docs/testpage/md'],
  // publish only these folders/files in your content folder (you can combine contentInclude and contentExclude)
  contentInclude: ['docs'],
};

export default userConfig;
```

## Navbar

### Dropdown

Flowershow supports adding dropdown menus in your navbar.

Example of configuration in `your-content-dir/config.js`:

```js
const userConfig = {
  // links to the pages you want to add to the navbar
  navLinks: [
    { href: '/about', name: 'About' },
    //dropdown menu should not have an href and should contain 'subItems' array
    {name: 'DropdownExample', subItems: [{href: '/goToLink1', name: 'Link1'}, {href: 'goToLink2', name: 'Link2}]}
  ],
}

export default userConfig
```

### Title and Logo

The Title and the logo in the navbar can be set by adding a **navbarTitle** attribute in your config. If you don't want a logo to be displayed in the navbar of your site, then don't include the logo field.

The **navbarTitle** supports adding the following two fields:

- text (your navbar title)
- logo (path to your logo img file)

```js
const userConfig = {
  navBarTitle: {
    text: "Your custom title here",
    logo: "/assets/your-logo.svg",
  },
};
```

## Edit this page link

If you keep your content in a public GitHub repository, and would like to encourage other people to contribute to it, you can show "Edit this page" button at the bottom of the page. It will link to the source file in your repository.

In order to make it work, you'll first need to set these two properties in your `config.js` file:

```js
{
  repoRoot: "https://github.com/flowershow/flowershow", //example
  repoEditPath: "/edit/main/site/content/", //example
}
```

### Default setting

You can disable or enable showing the button for all your pages by setting this property in your `config.js` file. The button is disabled by default.

```js
{
	editLinkShow: false,
}
```

### Per-page setting

You can also overwrite the default setting in single pages by including this field in the frontmatter:

```md
---
editLink: true
---
```

## Keep file unpublished

You can overwrite the contentInclude field by including this field in the frontmatter:

```md
---
isDraft: true
---
```
