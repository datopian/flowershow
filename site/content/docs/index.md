---
title: Documentation
---

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
🚧 Flowershow is under very active development. To learn more about some of the planned features, take a look at our <span>[[roadmap|Roadmap]]</span>.
</div>

<div className="border-2 border-slate-400 rounded-md px-4">
✨ Too see some of the Flowershow features in action, check out our <span>[[demo|Demo Pages]]</span>.
</div>

## What is Flowershow?
Flowershow is an open-source tool for easily converting your markdown files into an elegant website. It's built on standard, modern web stack – React, Next.js and Tailwind and shipped with a basic default theme (used to publish this website) to get you started with just a few clicks. 

Flowershow supports CommonMark and GitHub Flavored Markdown, but also many Obsidian-specific elements, like internal links or footnotes[^1].
[^1]: Support for some GFM and Obsidian-specific syntax elements is still work in progress. See our [[roadmap]] to learn more.

## Sites built with Flowershow

* This website!
* https://ecosystem.lifeitself.us/

## Quick Start

<div className="border-2 border-slate-400 rounded-md px-4 pb-2 mb-3">
❕ **Pre-requisites**
- [Node.js](https://nodejs.org/en/) installed
- [Git](https://git-scm.com/) installed
</div>
At the moment, there is only one starter template - default template. The fastest way to use it to bootstrap your website is:
```bash
npx create-next-app@latest -e https://github.com/flowershow/flowershow/tree/main/templates/default
# or
yarn create next-app -e https://github.com/flowershow/flowershow/tree/main/templates/default
```

At the moment

### Publishing your Obsidian vault




### Publishing standalone markdown files


[3. Configure the app with your content in step 1]

4. Deploy: this part is up to you. Our app is nextjs based so use any of these hosting providers: Vercel, Cloudflare, Netlify, … to deploy the site. TODO: link to instructions for one or more of them..

# Obsidian Wiki Links

^b9a436

Wiki links are hyperlinks links which give one click access to other pages on the site. These are usually denoted within double square brackets `[[ ... ]]` and (in obsidian) would generate the reference to that page automatically.

Four types of links are supported:

* Internal link `[[docs]]` which renders as [[layout-docs]]  
* Internal link with custom divider `[[docs/index|Docs page]]` which renders as [[docs/index|Docs page]] 
* Internal link with heading `[[nextjs-plugins#NextJS Plugin Research]]` which renders as [[nextjs-plugins#NextJS Plugin Research]] 
* Internal link with heading and custom divider `[[tailwind#Tailwind Support|Tailwind Support]]` which renders as [[tailwind-support#Tailwind Support|Tailwind Support]] 

## Details

Currently 4 types of wiki links syntax are supported which would parse them as `a` tags with their corresponding href attributes.

1. internal links eg. `[[abcd]]`  

	The link would be displayed as `abcd` with the same href attribute.

2. internal links with custom text eg. `[[a|b]]`  

	Here the link text appears as `b`  but links to `a`

3. internal links with header eg. `[[a#bc]]`  

	This will link to page `a` and scroll to the heading `bc` which should be within the page.

4. internal links with header and custom text eg. `[[a#bc|def]]`  

	Here the link text appears as `def` but links to the heading `bc` in page `a`

The source of the reference/links are from the markdown pages in your specified content folder.

## Frontmatter

Posts can have frontmatter like:

```md
---
title: Hello World
author: Rufus Pollock
---
```

The title and description are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.

# Tailwind Support

Flowershow comes with built-in [tailwind](https://tailwindcss.com) support on any markdown page for styling your content.

That means you can do things like:

```hmtl

<div className="text-xl text-red-600">

# Hello World

</div
```

>[!Note] className rather than class
>
> You may have noticed we used `className` rather than `class` attribute in our html. That's because we are using [[docs/mdx|MDX]] (markdown extended) rather than pure markdown and so we follow react conventions and use `className` 

And it means you have access to the full ecosystem of tailwind features and components.

# How to use components in your markdown

## Steps

1. Create a component (eg. Hero.js) in components folder
2. Add it to components in `components/MDX'
```javascript
import Hero from './Hero.js'

const components = {
	...
	Hero,
	...
}
```
3. Use directly in markdown file as 
```javascript
---
// frontmatter
layout: ...
---

<Hero />
```

## Passing data in mdx

1. Add the data in `pages/[[slug]].js`
```javascript
const testData = [
  { title: "First", value: 1 },
  { title: "Second", value: 2 },
  { title: "Third", value: 3 },
]

export default function Page({ body, ...rest }) {
  const Component = useMDXComponent(body.code, { testData });
	...
}
```
2. Use as props value in markdown
```javascript
<ExampleComponent data={testData} />
```

# Developers

## Adding the plugin

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
