# Sitemaps

A sitemap is a file that contains information about your pages, videos and other content on your website, along with their hierarchical structure and relationships. This information is then used by search engines like google to crawl your website, enabling them to quickly locate and index all of your pages, including those that might be hidden or difficult to find through standard navigation.

Having a sitemap for your website is beneficial and recommended by google as it improves search visibility and ultimately drives more traffic to your site.

Sitemaps are typically created in XML format, although there are other formats available as well. In Flowershow it is generated in XML format.

## Generating sitemaps in Flowershow

It is fairly easy and simple to add a sitemap to your flowershow website. All you have to do is add your website url in your config file's `authorUrl` property as below.

```js
// config.mjs

const config = {
  authorUrl: "https://flowershow.app" // replace with your website url here.
}
```

Thats it! Your XML sitemap will be auto generated and ready for search engines to crawl your content.
