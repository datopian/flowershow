import userConfig from '../content/config.js'

const defaultConfig = {
  title: 'Flowershow',
  description: 'Publish your digital garden', 
  author: 'Flowershow',
  // logo image
  authorLogo: '/assets/images/logo.svg',
  // url to author
  authorUrl: 'https://flowershow.app/',
  // Google analytics key e.g. G-XXXX
  analytics: '',
  // content source directory for markdown files
  // DO NOT CHANGE THIS VALUE
  // if you have your notes in another (external) directory,
  // /content dir should be a symlink to that directory
  content: 'content',
  // site version displayed in the NavBar next to logo
  version: 'Alpha',
  // Theme
  navLinks: [
    { href: '/about', name: 'About' },
  ],
  // optional additional nextSeo content set on each page
  // see https://github.com/garmeeh/next-seo
  nextSeo: {
    openGraph: {
      images: [
        {
          url: userConfig.socialImageUrl 
            ? userConfig.socialImageUrl 
            : 'https://flowershow.app/assets/images/frontpage-screenshot.jpg',
          alt: userConfig.title ? userConfig.title : '',
          width: 1200,
          height: 627,
          type: 'image/jpg',
        }
      ]
    },
    twitter: {
      handle: userConfig.twitter?.handle ? userConfig.twitter.handle : "@flowershow",
      site: userConfig.twitter?.site ? userConfig.twitter.site : "https://flowershow.app",
      cardType: "summary_large_image",
    },
  }
}

const siteConfig = Object.assign({}, defaultConfig, userConfig)

module.exports = siteConfig
