import React from "react";
import { MDXRemote } from "next-mdx-remote";
import { Mermaid } from "@flowershow/core";

import layouts from "../layouts";

// TODO
/* import { Hero } from "./custom/Hero"
 * import { WhatIsFlowershow } from "./custom/WhatIsFlowershow.jsx"
 * import { Features } from "./custom/Features.jsx" */

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  mermaid: Mermaid,
  /* Hero,
   * WhatIsFlowershow,
   * Features */
};

export default function DRD({ source, frontMatter }) {
  const Layout = ({ children }) => {
    if (frontMatter.layout) {
      const LayoutComponent = layouts[frontMatter.layout];
      return <LayoutComponent {...frontMatter}>{children}</LayoutComponent>;
    }
    return <>{children}</>;
  };

  return (
    <div className="prose mx-auto">
      <header>
        <div className="mb-6">
          {/* Default layout */}
          {!frontMatter.layout && (
            <>
              <h1>{frontMatter.title}</h1>
              {frontMatter.author && (
                <div className="-mt-6">
                  <p className="opacity-60 pl-1">{frontMatter.author}</p>
                </div>
              )}
              {frontMatter.description && (
                <p className="description">{frontMatter.description}</p>
              )}
            </>
          )}
        </div>
      </header>
      <main>
        <Layout>
          <MDXRemote {...source} components={components} />
        </Layout>
      </main>
    </div>
  );
}
