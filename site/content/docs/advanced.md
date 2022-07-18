---
title: Advanced configurations
---

## Adding a plugin

The plugin is open-source and can be found on the github repo here - [ https://github.com/flowershow/remark-wiki-link-plus](https://github.com/flowershow/remark-wiki-link-plus)

After installing the plugin, add it as a remark plugin in the contentlayer.config.js file and specify the markdown (content) folder.

```javascript
// contentlayer.config.js

import wikiLinkPlugin from 'remark-wiki-link-plus';

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
