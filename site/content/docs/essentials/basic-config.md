# Basic configurations

Flowershow aims to provide you with just enough configurations to get you started right away. However, you may want to set some personal 

For this purpose, there is a `confing.js` file, in which you can overwrite deafult settings (that can be found in `[my-flowershow-project]/config/siteConfig.js`) and extend them.

## `config.js`

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

## Custom layouts
