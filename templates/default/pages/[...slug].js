import { allPages } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MdxPage from "../components/MDX";

export default function Page({ body, ...rest }) {
  const Component = useMDXComponent(body.code);
  const children = {
    Component,
    frontMatter: {
      ...rest,
    },
  };
  return <MdxPage children={children} />;
}

export async function getStaticProps({ params }) {
  const urlPath = params.slug.join("/");
  const page = allPages.find((p) => p.url === urlPath);
  return { props: page };
}

export async function getStaticPaths() {
  const paths = allPages.map((page) => {
    const parts = page.url.split("/");
    return { params: { slug: parts } };
  });

  return {
    paths,
    fallback: false,
  };
}
