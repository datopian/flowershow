# Configuration

Flowershow supports setting common configuration values using a `config.js` file in your content directory. With it you can customize some things like website title, navigation links in the navbar, or set your google analytics key.

## Create `config.js`

Example of configuration in `your-content-dir/config.js`:

```js
const userConfig = {
  title: 'My Awesome Blog',
  description: 'This is my awesome blog built with Flowershow', 
  author: 'John',
  // logo image
  authorLogo: '/images/logo.svg',
  // url to author website
  authorUrl: 'https://john.app/',
  // links to the pages you want to add to the navbar
  navLinks: [
    { href: '/about', name: 'About' },
  ],
}

export default userConfig
```

## Navbar Title and Logo

The Title and Logo in the navbar can be set by adding a **navbarTitle** attribute in your config. If you don't want a logo to be displayed in the navbar of your site, then don't include the logo field.

The **navbarTitle** supports adding the following two fields:

* text (your navbar title)
* logo (path to your logo img file)

```js
const userConfig = {
  navBarTitle: {
    text: 'Your custom title here',
    logo: '/assets/your-logo.svg'
  }
}
```