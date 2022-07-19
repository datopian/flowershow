---
title: Contentlayer configuration
---

## What is Contentlayer?

Under the hood, Flowershow uses [Contentlayer](https://www.contentlayer.dev/) to parse your markdown notes and transform them into data. This data will then be used by React and Next.js to generate HTML for your Flowershow website.

>Contentlayer is a content SDK that validates and transforms your content into type-safe JSON data you can easily import into your application.

## Contentlayer config file

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❗ Note that in the examples below, we are directly modifing the `contentlayer.config.js` file. This will change in upcoming releases, as we're currently working on separating Flowershow core settings from user configurations to enable smooth upgrades.
</div>

In order for Contentlayer to do its job, it needs to know a few things in advance:
- a directory with your markdown files
- document type definitions that describe structures of JSON files it should create out of these markdown files

These two things (and more), are set up in `contentlayer.config.js` file, which can be found in the top level directory of your Flowershow project. This file looks something like this:

```js
// contentlayer.config.js
//
// ...
import { defineDocumentType, makeSource } from "contentlayer/source-files";

// fields required by Flowershow
const sharedFields = {
  title: { type: "string" },
  layout: { type: "string", default: "docs" },
};

// fields required by Flowershow
const computedFields = {
  url: {
    type: "string",
    resolve: (post) => post._raw.flattenedPath
  },
};

// "Page" document type definition
const Page = defineDocumentType(() => ({
  name: "Page", // type name
  filePathPattern: "**/*.md*", // files that will be converted to this type's shape
  contentType: "mdx",
  fields: { // 
    ...sharedFields,
  },
  computedFields,
}));

// ...
export default makeSource({
  // ...
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [ 
      remarkGfm,
      [ wikiLinkPlugin, { markdownFolder: siteConfig.content } ]
    ],
    rehypePlugins: [
      [rehypePrismPlus, { ignoreMissing: true }]
    ]
  }
});

```

## Creating custom document types

Most probably you have many different types of notes in your vault - blog posts, daily journals, research notes or maybe even recipes. It would be nice to change the way they are displayed on your website, depending on what type they are.

In order to do this, you can create a custom Contentlayer document type, that will be used to parse files specifiend in the `filePathPattern` field. As an example, you could create a `Journal` document type, like so:

```js
// ...

const blogFields = {
  date: { type: "string" },
  layout: { type: "string", default: "blog" },
}

const Blog = defineDocumentType(() => ({
  name: "Blog",
  // filePathPattern: "**/*.md*",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ...blogFields,
  },
  computedFields,
}));


export default makeSource({
  // ...
  documentTypes: [Blog, Page],
  // ...
});

```

## Defining custom frontmatter fields

In the example above, we have also defined a custom frontmatter field - `date` - for our `Blog` document type. This field

## Adding a remark / rehype plugins

In order to add another plugin, you first need to install it and then add it as a remark (or rehype) plugin in the `contentlayer.config.js` file. Some plugins, like `wikiLinkPlugin` above allow for customizations, which are passed as a 