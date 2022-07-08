import { defineDocumentType, makeSource } from "contentlayer/source-files";
import siteConfig from "./config/siteConfig";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link-plus"

const sharedFields = {
  title: { type: "string" },
  layout: { type: "string", default: "docs" }
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

const contentLayerExcludeDefaults = ['node_modules', '.git', '.yarn', '.cache', '.next', '.contentlayer', 'package.json', 'tsconfig.json']

export default makeSource({
  contentDirPath: siteConfig.content,
  contentDirExclude: contentLayerExcludeDefaults.concat(['.flowershow', '.obsidian']),
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [ 
      remarkGfm,
      [ wikiLinkPlugin, { markdownFolder: siteConfig.content } ]
    ],
    rehypePlugins: []
  }
});
