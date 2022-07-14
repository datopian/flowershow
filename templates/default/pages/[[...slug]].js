import { allDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MdxPage from "../components/MDX";
import allDocumentsProps from "../data/props.json"

export default function Page({ body, pageProps, ...rest }) {
  const Component = useMDXComponent(body.code, pageProps);
  const children = {
    Component,
    frontMatter: {
      ...rest,
    },
  };
  return <MdxPage children={children} />;
}

export async function getStaticProps({ params }) {
  // params.slug is undefined for root index page
  const urlPath = params.slug ? params.slug.join("/") : '';
  const page = allDocuments.find((p) => p.url === urlPath);
  const pageTitle = page.title;
  const pageProps = pageTitle ? allDocumentsProps[pageTitle] : {};
  return { props: {
    ...page,
    pageProps
  } };
}

export async function getStaticPaths() {
  const paths = allDocuments.map((page) => {
    const parts = page.url.split("/");
    return { params: { slug: parts } };
  });

  return {
    paths,
    fallback: false,
  };
}
