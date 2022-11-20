import { NextSeo } from "next-seo";
import Head from "next/head";

import { siteConfig } from "../config/siteConfig";
import { CustomLink } from "./Link";
import { Pre } from "./Pre";

const components = {
  Head,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ layout, ...rest }) => {
    /* eslint-disable-next-line @typescript-eslint/no-var-requires*/
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

export function MdxPage({ mdxComponent, frontMatter, ...rest }) {
  const Component = mdxComponent;

  // Handle SEO Image urls in frontmatter
  const websiteUrl = siteConfig.authorUrl.replace(/\/+$/, "");
  const frontMatterImage =
    typeof frontMatter?.image === "string" && frontMatter.image;
  const seoImageUrl =
    frontMatterImage && frontMatterImage.startsWith("http")
      ? frontMatterImage
      : websiteUrl + frontMatterImage;

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.description,
          images: frontMatter.image
            ? [
                {
                  url: seoImageUrl,
                  width: 1200,
                  height: 627,
                  alt: frontMatter.title,
                },
              ]
            : siteConfig?.nextSeo?.openGraph?.images || [],
        }}
      />
      <Component
        layout={frontMatter.layout}
        components={components}
        frontMatter={frontMatter}
        {...rest}
      />
    </>
  );
}
