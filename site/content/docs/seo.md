---
title: SEO Configuration
description: How to set up SEO in flowershow
---

Flowershow supports adding standard metadata to your pages to improve social media sharing and search engine discovery.

Metadata values are set for individual pages from their frontmatter title and description. Additionally, you can add a default image and description that will be used for the pages if they are not set explicitly.

Flowershow uses the [NextSeo]( https://github.com/garmeeh/next-seo) plugin that helps to add SEO properties to the page and is a fairly easy setup to follow. 

Add or modify the `nextSeo` as a configuration object in the `config.js` file with your required properties as shown below:

```js
const config = {
  ...
  nextSeo: {
    openGraph: {
      images: [
        {
          url: "https://www.example.ie/og-image.jpg" /*image url path*/,
          alt: "Og Image Alt" /*alternative name for the image*/,
          width: 1200 /*min 800 recommended width value*/,
          height: 627 /*min 600 recommended height value*/,
          type: "image/png" /*image type png, jpg or jpeg*/
        }
      ]
    },
    twitter: {
      handle: "@example",
      site: "https://yoursite.com",
      cardType: "summary_large_image",
    },
    facebook: {
	   appId: '1234567890',
    }
  }
}
```

More options can be found at https://github.com/garmeeh/next-seo#nextseo-options

Note: It is advised to upload an image with the same width and height values as specified above for it to display properly.

Here is a preview of how it should look when sharing the website link on social sites, for example on Twitter:

<img src="/assets/images/twitter-card.jpg" alt="twitter card" />
