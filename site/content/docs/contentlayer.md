# Contentlayer configuration

## What is Contentlayer?

Under the hood, Flowershow uses [Contentlayer](https://www.contentlayer.dev/) to parse your markdown notes and transform them into data. This data will then be used by React and Next.js to generate HTML for your Flowershow website.

> Contentlayer is a content SDK that validates and transforms your content into type-safe JSON data you can easily import into your application.

## Contentlayer config file

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❗ Note that in the examples below, we are directly modifying the `contentlayer.config.js` file. This will change in upcoming releases, as we're currently working on separating Flowershow core settings from user configurations to enable smooth upgrades.
</div>

For Contentlayer to do its job, it needs to know a few things in advance:

- a directory with your markdown files
- document type definitions that describe structures of JSON files it should create out of these markdown files

These two things (and more), are set up in `contentlayer.config.js` file, which can be found in the top-level directory of your Flowershow project. This file looks something like this:

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
    resolve: (post) => post._raw.flattenedPath,
  },
};

// "Page" document type definition
const Page = defineDocumentType(() => ({
  name: "Page", // type name
  filePathPattern: "**/*.md*", // files that will be converted to this type's shape
  contentType: "mdx",
  fields: {
    //
    ...sharedFields,
  },
  computedFields,
}));

// ...
export default makeSource({
  // ...
});
```

As you can see, the default document type which will be applied to all your markdown files (because of the catch-all `filePathPattern` - `"**/*.md*"`) is the `Page` document type. Both `fields` and `computedFields` properties describe the shape and behavior of your content. They also tell Contentlayer how to parse each value in a page frontmatter, so that you can use it e.g. in your custom layouts. (See our guide about [[layouts]] to learn more).y

## Adding a remark / rehype plugins

To add a remark/rehype plugin, you first need to install it and then add it in the `contentlayer.config.js` file.
