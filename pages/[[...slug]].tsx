import fs from "fs";
import { NextSeo } from "next-seo";
import type { GetStaticProps, GetStaticPaths, GetStaticPropsResult } from "next";
import type { NavItem, NavGroup } from "@portaljs/core";

import MdxPage from "@/components/MdxPage";
import clientPromise from "@/lib/mddb.mjs";
import computeFields from "@/lib/computeFields";
import parse from "@/lib/markdown";
import siteConfig from "@/config/siteConfig";
import type { CustomAppProps } from "./_app";
import CanvasElement from "@/components/ObsidianCanvas";

interface SlugPageProps extends CustomAppProps {
  source: any;
  type: 'md' | 'canvas';
}

export default function Page({ source, type, meta }: SlugPageProps) {
  source = JSON.parse(source);

  const seoImages = (() => {
    // if page has specific image set
    if (meta.image) {
      return [
        {
          url: meta.image.startsWith("http")
            ? meta.image
            : `${siteConfig.domain}${meta.image}`,
          width: 1200,
          height: 627,
          alt: meta.title,
        },
      ];
    }
    // otherwise return default images array set in config file
    return siteConfig.nextSeo?.openGraph?.images || [];
  })();

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
          images: seoImages,
        }}
      />
      {type === "md" ? (
        <MdxPage source={source} frontMatter={meta} />
      ) : (
        <CanvasElement data={source} />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<SlugPageProps>> => {
  const urlPath = params?.slug ? (params.slug as string[]).join("/") : "/";

  const mddb = await clientPromise;
  const dbFile = await mddb.getFileByUrl(urlPath);
  const filePath = dbFile!.file_path;
  const frontMatter = dbFile!.metadata ?? {};

  const type = dbFile!.extension === 'canvas' ? 'canvas' : 'md';
  const rawFile = fs.readFileSync(filePath, { encoding: 'utf-8' });
  let source;
  let frontMatterWithComputedFields: any = {};
  const siteMap: Array<NavGroup | NavItem> = [];
  if (type === 'md') {
    const { mdxSource } = await parse(rawFile, 'mdx', {});
    source = mdxSource;
    // TODO temporary replacement for contentlayer's computedFields
    frontMatterWithComputedFields = await computeFields({
      frontMatter,
      urlPath,
      filePath,
      source: rawFile,
    });

    if (frontMatterWithComputedFields?.showSidebar) {
      const allPages = await mddb.getFiles({ extensions: ['md', 'mdx'] });
      const pages = allPages.filter((p) => !p.metadata?.isDraft);
      pages.forEach((page) => {
        addPageToSitemap(page, siteMap);
      });
    }
  }

  if (type === 'canvas') {
    const canvas = JSON.parse(rawFile);
    const nodesPromises = canvas.nodes.map(async (node: any) => {
      if (node.type === 'text') {
        const { mdxSource } = await parse(node.text, 'mdx', {});
        return {
          ...node,
          source: mdxSource,
        };
      }
      if (node.type === 'file' && node.file.endsWith('.md')) {
        const rawFile = fs.readFileSync('content/' + node.file, {
          encoding: 'utf-8',
        });
        const { mdxSource } = await parse(rawFile, 'mdx', {});

        return {
          ...node,
          source: mdxSource,
        };
      }
      return node;
    });
    
    const nodes = await Promise.all(nodesPromises);
    source = {
      ...canvas,
      nodes,
    };
  }

  return {
    props: {
      type,
      source: JSON.stringify(source),
      meta: frontMatterWithComputedFields,
      siteMap,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const mddb = await clientPromise;
  const allDocuments = await mddb.getFiles({ extensions: ["md", "mdx", "canvas"] });

  const paths = allDocuments
    .filter((page) => page.metadata?.isDraft !== true)
    .map((page) => {
      const url = decodeURI(page.url_path);
      const parts = url.split("/");
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TODO temporaty solution
// we should generate a file with sitemap instead of computing it on the fly for each page
/* function addPageToGroup(page: MddbFile, sitemap: Array<NavGroup>) { */
function addPageToSitemap(page: any, sitemap: Array<NavGroup | NavItem>) {
  const urlDecoded = decodeURI(page.url_path);
  const urlParts = urlDecoded!.split("/").filter((part) => part);
  // don't add home page to the sitemap
  if (urlParts.length === 0) return;
  // top level, root pages
  if (urlParts.length === 1) {
    /* let rootGroup = sitemap.find((g) => g.name === "root");
     * if (!rootGroup) {
     *     rootGroup = { name: "root", path: "/", level: 0, children: [] };
     *     sitemap.push(rootGroup);
     * }
     * rootGroup.children.push({
     *     name: page.metadata?.title || urlParts[0],
     *     href: page.url_path,
     * }); */
    sitemap.push({
      name: page.metadata?.title || urlParts[0],
      href: page.url_path,
    });
  } else {
    // /blog/blogtest
    const nestingLevel = urlParts.length - 1; // 1
    let currArray: Array<NavItem | NavGroup> = sitemap;

    for (let level = 0; level <= nestingLevel; level++) {
      if (level === nestingLevel) {
        currArray.push({
          name: page.metadata?.title || urlParts[level],
          href: page.url_path,
        });
        continue;
      }

      const matchingGroup = currArray
        .filter(isNavGroup)
        .find(
          (group) =>
            group.path !== undefined && decodeURI(page.url_path).startsWith(group.path)
        );
      if (!matchingGroup) {
        const newGroup: NavGroup = {
          name: capitalize(urlParts[level]),
          path: urlParts.slice(0, level + 1).join("/"),
          level,
          children: [],
        };
        currArray.push(newGroup);
        currArray = newGroup.children;
      } else {
        currArray = matchingGroup.children;
      }
    }
  }
}

function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return (item as NavGroup).children !== undefined;
}
