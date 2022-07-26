# Basic configurations

Flowershow aims to provide you with just enough configurations to get you started right away. However, you may want to set some custom things like website title, navigation links in the navbar, or google analytics key.

For this purpose, you should create a `confing.js` file in your content directory. Now you can overwrite default settings (that can be found in `[my-flowershow-project]/config/siteConfig.js`) and extend them.

## `config.js`

Example of user configurations in `your-content-dir/config.js`:

```js
const userConfig = {
  title: 'My Awesome Blog',
  description: 'This is my awesome blog built with Flowershow', 
  author: 'John',
  // logo image
  authorLogo: '/images/logo.svg',
  // url to author website
  authorUrl: 'https://john.app/',
  // Google analytics key e.g. G-XXXX
  analytics: 'G-XXXX',
  // links to the pages you want to add to the navbar
  navLinks: [
    { href: '/about', name: 'About' },
  ],
  // optional additional nextSeo content set on each page
  // see https://github.com/garmeeh/next-seo
//  nextSeo: {
//    openGraph: {
//      images: [
//        {
//          url: 'https://image.url/...',
//          alt: '',
//          width: 1200,
//          height: 627,
//          type: 'image/png',
//        }
//      ]
//    }
//  }

}

export default userConfig

```

