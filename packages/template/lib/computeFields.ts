// This file is a temporary replacement for legacy contentlayer's computeFields + default fields values
import { remark } from "remark";
import stripMarkdown, { Options } from "strip-markdown";
import { siteConfig } from "../config/siteConfig";

// TODO return type

const computeFields = async ({
  frontMatter,
  urlPath,
  filePath,
  source,
}: {
  frontMatter: Record<string, any>;
  urlPath: string;
  filePath: string;
  source: string;
}) => {
  // Fields with corresponding config options
  // TODO see _app.tsx
  const showComments =
    frontMatter.showComments ?? siteConfig.showComments ?? false;
  const showEditLink =
    frontMatter.showEditLink ?? siteConfig.showEditLink ?? false;
  // TODO take config into accout
  const showLinkPreview =
    frontMatter.showLinkPreview ?? siteConfig.showLinkPreview ?? false;
  const showToc = frontMatter.showToc ?? siteConfig.showToc ?? false;
  const showSidebar =
    frontMatter.showSidebar ?? siteConfig.showSidebar ?? false;

  // Computed fields
  const title = frontMatter.title ?? (await extractTitle(source));
  const description =
    frontMatter.description ?? (await extractDescription(source));
  const date = frontMatter.date ?? frontMatter.created ?? null;
  const layout = (() => {
    if (frontMatter.layout) return frontMatter.layout;
    if (urlPath.startsWith("blog/")) return "blog";
    // if (urlPath.startsWith("docs/")) return "docs";
    return "docs"; // TODO default layout from config?
  })();
  const slug = urlPath.replace(/^(.+?\/)*/, "");
  // TODO take into accout include/exclude fields in config
  const isDraft = frontMatter.isDraft ?? false;
  const editUrl =
    siteConfig.editLinkRoot && `${siteConfig.editLinkRoot}/${filePath}`;

  return {
    ...frontMatter,
    title,
    description,
    date,
    layout,
    slug,
    isDraft,
    editUrl,
    showComments,
    showEditLink,
    showLinkPreview,
    showToc,
    showSidebar,
  };
};

const extractTitle = async (source: string) => {
  const heading = source.trim().match(/^#\s+(.*)/);
  if (heading) {
    const title = heading[1]
      // replace wikilink with only text value
      .replace(/\[\[([\S]*?)]]/, "$1");

    const stripTitle = await remark().use(stripMarkdown).process(title);
    return stripTitle.toString().trim();
  }
  return null;
};

const extractDescription = async (source: string) => {
  const content = source
    // remove commented lines
    .replace(/{\/\*.*\*\/}/g, "")
    // remove import statements
    .replace(
      /^import\s*(?:\{\s*[\w\s,\n]+\s*\})?(\s*(\w+))?\s*from\s*("|')[^"]+("|');?$/gm,
      ""
    )
    // remove youtube links
    .replace(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gm, "")
    // replace wikilinks with only text
    .replace(/([^!])\[\[(\S*?)\]]/g, "$1$2")
    // remove wikilink images
    .replace(/!\[[\S]*?]]/g, "");

  // remove markdown formatting
  const stripped = await remark()
    .use(stripMarkdown, {
      remove: ["heading", "blockquote", "list", "image", "html", "code"],
    } as Options)
    .process(content);

  if (stripped.value) {
    const description: string = stripped.value.toString().slice(0, 200);
    return description + "...";
  }
  return null;
};

export default computeFields;

// let showComments = false;
// const comments = siteConfig.comments;

// if (comments && comments.provider && comments.config) {
//     const sourceDir = pageProps.type
//         ? pageProps.type.toLowerCase()
//         : pageProps._raw?.sourceFileDir;
//     const pagesFromConfig =
//         Array.isArray(comments.pages) && comments.pages.length > 0
//             ? comments.pages?.includes(sourceDir)
//             : true;

//     showComments = pageProps.showComments ?? pagesFromConfig;
// }
