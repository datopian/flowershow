import { defineDocumentType, makeSource } from "contentlayer/source-files";
import siteConfig from "./config/siteConfig";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import wikiLinkPlugin from "remark-wiki-link-plus";

const sharedFields = {
  title: { type: "string" },
  layout: { type: "string", default: "docs" },
};

const computedFields = {
  url: {
    type: "string",
    resolve: (post) => post._raw.flattenedPath
  },
};

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "**/*.md*",
  contentType: "mdx",
  fields: {
    ...sharedFields,
  },
  computedFields,
}));

const blogFields = {
  date: { type: "date" },
  layout: { type: "string", default: "blog" },
  authors: {
    type: "list",
    of: { type: "string" }
  },
}

const Blog = defineDocumentType(() => ({
  name: "Blog",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ...blogFields,
  },
  computedFields,
}));

const contentLayerExcludeDefaults = ['node_modules', '.git', '.yarn', '.cache', '.next', '.contentlayer', 'package.json', 'tsconfig.json']

export default makeSource({
  contentDirPath: siteConfig.content,
  contentDirExclude: contentLayerExcludeDefaults.concat(['.flowershow', '.obsidian']),
  documentTypes: [Blog, Page],
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
