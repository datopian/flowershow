const config = {
  title: 'Flowershow',
  description: 'Turn your markdown notes into an elegant website and tailor it to your needs. Flowershow is easy to use, fully-featured, Obsidian compatible and open-source.',
  analytics: 'G-RQWLTRWBS2',
  navLinks: [
    { href: '/docs', name: 'Docs' },
    { href: '/docs/roadmap', name: 'Roadmap' },
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
