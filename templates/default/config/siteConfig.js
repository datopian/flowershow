import userConfig from '../content/config.js';

const defaultConfig = {
  navbarTitle: {
    text: 'Flowershow',
    logo: '/_flowershow/logo.svg',
    url: 'https://flowershow.app/',
    // site version displayed in the NavBar next to logo
    version: 'Alpha',
  },
  description: 'Publish your digital garden',
  author: 'Flowershow',
  // logo image
  authorLogo: '/_flowershow/logo.svg',
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
  theme: {
    default: 'dark',
    toggleIcon: '/_flowershow/theme-button.svg',
  },
  navLinks: [
    { href: '/about', name: 'About' },
  ],
};

const siteConfig = {
  ...defaultConfig,
  ...userConfig,
  // prevent theme object overrides for
  // values not provided in userConfig
  theme: {
    ...defaultConfig.theme,
    ...userConfig.theme,
  }
};

module.exports = siteConfig;
