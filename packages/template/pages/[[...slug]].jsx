/* eslint import/no-default-export: off */
import { NextSeo } from "next-seo";
import { allDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

import { CustomLink, Pre, BlogsList } from "@flowershow/core";

import { getPageData } from "../lib/getPageData";
import { getAuthorsDetails } from "../lib/getAuthorsDetails";
import layouts from "../layouts";
import { siteConfig } from "../config/siteConfig";

export default function Page({ globals, body, ...meta }) {
  const MDXPage = useMDXComponent(body.code, globals);
  const { image, title, description } = meta;

  const MDXComponents = {
    /* Head, */ // TODO why do we need this here?
    a: CustomLink,
    pre: Pre,
    /* eslint no-unused-vars: off */
    // TODO this is a temporary workaround for errors resulting from importing this component directly in mdx file
    // see this issue for ref: https://github.com/kentcdodds/mdx-bundler/issues/156
    BlogsList,
    wrapper: ({ components, layout, ...props }) => {
      const Layout = layouts[layout];
      return <Layout {...props} />;
    },
    // user defined MDX components could be added here
    // ...userMDXComponents
  };

  // Handle SEO Image urls in frontmatter
  // TODO why do we remove the "/" at the end? Should images be in form of "/some_image.png"?
  const websiteUrl = siteConfig.authorUrl.replace(/\/+$/, "");
  const seoImageUrl =
    image && image.startsWith("http") ? image : websiteUrl + image;

  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title: title,
          description: description,
          images: image
            ? [
                {
                  url: seoImageUrl,
                  width: 1200,
                  height: 627,
                  alt: title,
                },
              ]
            : siteConfig?.nextSeo?.openGraph?.images || [],
        }}
      />
      <MDXPage components={MDXComponents} {...meta} />;
    </>
  );
}

export async function getStaticProps({ params }) {
  // params.slug is undefined for root index page
  const urlPath = params.slug ? params.slug.join("/") : "";
  const page = allDocuments.find((p) => p.url_path === urlPath);
  const globals = await getPageData(page.data);
  // TODO this is a temporary solution used to pass authors to blog layout
  const authorsDetails = getAuthorsDetails(page.authors);
  return { props: { ...page, authorsDetails, globals } };
}

export async function getStaticPaths() {
  const paths = allDocuments
    .filter((page) => !page?.isDraft)
    .map((page) => {
      const parts = page.url_path.split("/");
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
}
