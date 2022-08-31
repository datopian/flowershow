import { defineDocumentType, makeSource } from "contentlayer/source-files";
import siteConfig from "./config/siteConfig";
import codeExtra from "remark-code-extra";
import {h} from 'hastscript'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax';
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import wikiLinkPlugin from "remark-wiki-link-plus";

const sharedFields = {
  title: { type: "string" },
  description: { type: "string" },
  image: { type: "string" },
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
      remarkMath,
      [wikiLinkPlugin, { markdownFolder: siteConfig.content }],
      /** Using the code extra plugin from https://github.com/s0/remark-code-extra
       *  to create new mermaid pre tags to use with mdx-mermaid.
       *  rehypePrismPlus plugin modifies the pre tags and due to this mdx-mermaid
       *  component cannot receive the values in the required format.
       *  Refer issue https://github.com/flowershow/flowershow/issues/12 for more info.
      */
      [codeExtra, {
        transform: (node) => {
          if (node.type == "code" && node.lang == "mermaid") {
            // reset values else rehype-prism-plus throws error
            node.type = ""
            node.lang = ""
            return ({
              // create new pre tag element here for mermaid
              after: [{
                type: "element",
                tagName: "pre",
                properties: {
                  className: "code-mermaid"
                },
                children: [{
                  type: "text",
                  value: node.value
                }]
              }],
              // remove the pre tag element created by rehype-prism-plus
              // otherwise both will be displayed
              transform: n => {
                const preElem = n.data.hChildren.find(el => el.tagName === "pre")
                const index = n.data.hChildren.indexOf(preElem)
                n.data.hChildren.splice(index, 1)
              }
            })
          } else {
            return null
          }
        }
      }],
      [remarkToc, {
        heading: "Table of contents",
        maxDepth: "3",
        tight: true,
      }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        content(node) {
          return [
            h('svg', {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "1.5",
              stroke: "#ab2b65",
              className: "w-5 h-5",
            },
              [
                h('path', {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d:"M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                })
              ]
             )
          ]
        }
      }],
      rehypeMathjax,
      [rehypePrismPlus, { ignoreMissing: true }]
    ]
  }
});
