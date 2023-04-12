import React from "react";
import fs from "fs";

import DRD from "../components/DRD";
import clientPromise from "../lib/mddb.mjs";
import computeFields from "../lib/computeFields";
import parse from "../lib/markdown";
import { GetStaticProps, GetStaticPaths, GetStaticPropsResult } from "next";

export interface PageProps {
  source: any;
  meta: any;
}

export default function Page({ source, meta }: PageProps) {
  source = JSON.parse(source);

  return <DRD source={source} frontMatter={meta} />;
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<PageProps>> => {
  const urlPath = params?.slug ? (params.slug as string[]).join("/") : "/";

  const mddb = await clientPromise;
  const dbFile = await mddb.getFileByUrl(urlPath);
  const filePath = dbFile!.file_path;
  const frontMatter = dbFile!.metadata ?? {};

  const source = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { mdxSource } = await parse(source, "mdx", {});

  // TODO temporary replacement for contentlayer's computedFields
  const frontMatterWithComputedFields = await computeFields({
    frontMatter,
    urlPath,
    filePath,
    source,
  });

  return {
    props: {
      source: JSON.stringify(mdxSource),
      meta: frontMatterWithComputedFields,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const mddb = await clientPromise;
  const allDocuments = await mddb.getFiles({ extensions: ["md", "mdx"] });

  const paths = allDocuments.map((page) => {
    const parts = page!.url_path!.split("/");
    return { params: { slug: parts } };
  });

  return {
    paths,
    fallback: false,
  };
};
