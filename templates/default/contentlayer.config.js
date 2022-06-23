import { defineDocumentType, makeSource } from "contentlayer/source-files";
import siteConfig from "./config/siteConfig";
import remarkGfm from "remark-gfm";

const sharedFields = {
  title: { type: "string" },
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

export default makeSource({
  contentDirPath: siteConfig.content,
  documentTypes: [Page],
  mdx: {
    remarkPlugins: [ remarkGfm ],
    rehypePlugins: []
  }
});
