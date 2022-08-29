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
