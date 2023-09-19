import React from "react";
import Head from "next/head";

import { MDXRemote } from "next-mdx-remote";
import { Mermaid, Pre } from "@portaljs/core";

import layouts from "../layouts";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
    mermaid: Mermaid,
    pre: Pre,
};

export default function MdxPage({ source, frontMatter }) {
    const Layout = ({ children }) => {
        if (frontMatter.layout) {
            const LayoutComponent = layouts[frontMatter.layout];
            return <LayoutComponent {...frontMatter}>{children}</LayoutComponent>;
        }
        return <>{children}</>;
    };

    return (
        <main id="mdxpage" className="prose mx-auto">
            <Head>
                {/* KaTeX styles */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossOrigin="anonymous" />
            </Head>
            <Layout>
                <MDXRemote {...source} components={components} />
            </Layout>
        </main>
    );
}
