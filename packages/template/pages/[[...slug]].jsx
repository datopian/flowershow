/* eslint import/no-default-export: off */
import { allDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

import { MdxPage } from "../components/MDX";
import { getPageData } from "../lib/getPageData";
import { getAuthorsDetails } from "../lib/getAuthorsDetails";

export default function Page({ body, data, ...rest }) {
  const mdxComponent = useMDXComponent(body.code, data);
  const frontMatter = { ...rest };
  return <MdxPage mdxComponent={mdxComponent} frontMatter={frontMatter} />;
}

export async function getStaticProps({ params }) {
  // params.slug is undefined for root index page
  const urlPath = params.slug ? params.slug.join("/") : "";
  const page = allDocuments.find((p) => p.url_path === urlPath);
  const data = await getPageData(page.data);
  // temporary workaround for passing authors to blog layout
  const authorsDetails = getAuthorsDetails(page.authors);
  return { props: { ...page, data, authorsDetails } };
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
