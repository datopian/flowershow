// This file is a temporary replacement for legacy contentlayer's computeFields + default fields values
import { remark } from "remark";
import stripMarkdown, { Options } from "strip-markdown";
import { siteConfig } from "../config/siteConfig";

const extractTitle = (source: string) => {
  const heading = source.trim().match(/^#\s+(.*)/);
  if (heading) {
    const title = heading[1]
      // replace wikilink with only text value
      .replace(/\[\[([\S]*?)]]/, "$1");

    const stripTitle = await remark().use(stripMarkdown).process(title);
    return stripTitle.toString().trim();
  }
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
};

export const computeFields = ({
  frontmatter,
  urlPath,
  filePath,
  source,
}: {
  frontmatter: Record<string, any>;
  urlPath: string;
  filePath: string;
  source: string;
}) => {
  // Fields with corresponding config options
  // TODO see _app.tsx
  const showComments = frontmatter.showComments ?? siteConfig.showComments;
  const showEditLink = frontmatter.showEditLink ?? siteConfig.showEditLink;
  // TODO take config into accout
  const showLinkPreview =
    frontmatter.showLinkPreview ?? siteConfig.showLinkPreview;
  const showToc = frontmatter.showToc ?? siteConfig.showToc;
  const showSidebar = frontmatter.showSidebar ?? siteConfig.showSidebar;

  // Computed fields
  const title = frontmatter.title ?? extractTitle(source);
  const description = frontmatter.description ?? extractDescription(source);
  const date = frontmatter.date ?? frontmatter.created ?? null;
  // TODO blog layout for blog type pages
  const layout = frontmatter.layout ?? "docs";
  const slug = urlPath.replace(/^(.+?\/)*/, "");
  const isDraft = frontmatter.isDraft ?? false;
  const editUrl =
    siteConfig.editLinkRoot && `${siteConfig.editLinkRoot}/${filePath}`;

  return {
    ...frontmatter,
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
