/* eslint import/no-default-export: off */
import React from "react";
import fs from "fs";
import { NextSeo } from "next-seo";

import { getPageData } from "../lib/getPageData";
import { getAuthorsDetails } from "../lib/getAuthorsDetails";
import clientPromise from "../lib/mddb.mjs";
import { siteConfig } from "../config/siteConfig";

export default function Page({ source, metadata }) {
  /* const MDXPage = useMDXComponent(source, globals); */
  const { image, title, description } = metadata;

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
      <div>{source}</div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const mddb = await clientPromise;
  // params.slug is undefined for root index page
  const urlPath = params.slug ? params.slug.join("/") : "/";
  const page = await mddb.getFileByUrl(urlPath);

  // Read source
  // TODO add method on MddbFile returned from mddb
  const source = fs.readFileSync(page!.file_path, { encoding: "utf-8" });
  const metadata = page!.metadata || {};

  // TODO this is crap, refactor
  const { data, authors } = metadata || {};
  const globals = data ? await getPageData(data) : {};
  const authorsDetails = await getAuthorsDetails(authors);

  return { props: { source, metadata, authorsDetails, globals } };
}

export async function getStaticPaths() {
  const mddb = await clientPromise;
  const allDocuments = await mddb.getFiles({ extensions: ["mdx", "md"] });

  const paths = allDocuments
    .filter((page) => !page.metadata?.isDraft)
    .map((page) => {
      // TODO files returned from db with extensions mdx and md should always have url_path
      const parts = page.url_path!.split("/");
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
}
