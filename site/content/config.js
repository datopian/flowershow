const config = {
  title: 'Flowershow',
  // Google analytics key e.g. G-XXXX
  analytics: 'G-RQWLTRWBS2',
  navLinks: [
    // { href: '/docs', name: 'QuickStart' },
    { href: '/docs/roadmap', name: 'Roadmap' },
    { href: '/docs/guides', name: 'Guides' },
  ],
  nextSeo: {
    openGraph: {
      images: [
        {
          url: 'https://flowershow.app/assets/images/frontpage-screenshot.jpg',
          alt: 'Flowershow',
          width: 1200,
          height: 627,
          type: 'image/jpg',
        }
      ]
    },
    twitter: {
      handle: "@flowershow",
      site: "https://flowershow.app",
      cardType: "summary_large_image",
    },
  }
}

export default config
