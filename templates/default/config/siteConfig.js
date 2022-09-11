import userConfig from '../content/config.js';

const defaultConfig = {
  title: 'Flowershow',
  description: 'Publish your digital garden',
  repoRoot: "https://github.com/flowershow/flowershow",
  repoEditPath: "/edit/main/site/content/",
  editPageShow: false,
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
  theme: {
    default: 'dark',
    toggleIcon: '/assets/images/theme-button.svg',
  },
  navLinks: [
    { href: '/about', name: 'About' },
  ],
};

const siteConfig = { ...defaultConfig, ...userConfig };

module.exports = siteConfig;
