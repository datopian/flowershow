# How to use obsidian wiki links

Wiki links are hyperlinks links which give one click access to other pages on the site. These are usually denoted within double square brackets `[[ ... ]]` and (in obsidian) would generate the reference to that page automatically.

## Adding the plugin
The plugin is open-source and can be found on the github repo here - [ https://github.com/flowershow/remark-wiki-link-plus](https://github.com/flowershow/remark-wiki-link-plus)

After installing the plugin, add it as a remark plugin in the contentlayer.config.js file and specify the markdown (content) folder.

```javascript
// contentkayer.config.js

export default makeSource({
	contentDirPath: siteConfig.content,
	documentTypes: [Page],
	mdx: {
		remarkPlugins: [
			remarkGfm,
			[ wikiLinkPlugin, { markdownFolder: siteConfig.content } ]
		],
		rehypePlugins: []
	}
});
```

## Usage

Currently 4 types of wiki links syntax are supported which would parse them as `a` tags with their corresponding href attributes.

1) internal links eg. `[[abcd]]`  

	The link would be displayed as `abcd` with the same href attribute.

2) internal links with custom text eg. `[[a|b]]`  

	Here the link text appears as `b`  but links to `a`

3) internal links with header eg. `[[a#bc]]`  

	This will link to page `a` and scroll to the heading `bc` which should be within the page.

4) internal links with header and custom text eg. `[[a#bc|def]]`  

	Here the link text appears as `def` but links to the heading `bc` in page `a`


The source of the reference/links are from the markdown pages in your specified content or data folder.