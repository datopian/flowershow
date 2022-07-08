import { allDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MdxPage from "../components/MDX";

const testData = [
  { title: "First", value: 1 },
  { title: "Second", value: 2 },
  { title: "Third", value: 3 },
]

export default function Page({ body, ...rest }) {
  const Component = useMDXComponent(body.code, { testData });
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
  return { props: page };
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
