import fs from "fs";
import React from "react";
import { GetStaticProps, GetStaticPaths, GetStaticPropsResult } from "next";

import MdxPage from "../components/MdxPage";
import clientPromise from "../lib/mddb.mjs";
import computeFields from "../lib/computeFields";
import parse from "../lib/markdown";
import type { CustomAppProps } from "./_app";

interface SlugPageProps extends CustomAppProps {
  source: any;
}

export default function Page({ source, meta }: SlugPageProps) {
  source = JSON.parse(source);

  return <MdxPage source={source} frontMatter={meta} />;
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<SlugPageProps>> => {
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

  const paths = allDocuments
    .filter((page) => page.metadata?.isDraft !== true)
    .map((page) => {
      const parts = page.url_path.split("/");
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
};
