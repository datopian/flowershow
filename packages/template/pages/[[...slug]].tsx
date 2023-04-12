/* eslint import/no-default-export: off */
import fs from "fs";
import { useEffect } from "react";
import { NextSeo } from "next-seo";

import { CustomLink, Pre, BlogsList, Mermaid } from "@flowershow/core";
/* import { useMDXComponent } from "@/lib/useMDXComponent"; */
import { getPageData } from "@/lib/getPageData";
import { getAuthorsDetails } from "@/lib/getAuthorsDetails";
import clientPromise from "@/lib/mddb.mjs";
import layouts from "@/layouts";
import { siteConfig } from "@/config/siteConfig";


export default function Page({ source, metadata }) {
    /* const MDXPage = useMDXComponent(source, globals); */
    const { image, title, description, showLinkPreview } = metadata;

    // TODO not sure if this is needed
    // workaround to handle repeating titles
    // remove the first heading from markdown if it's a title and displayed on page
    /* useEffect(() => {
*     const headings = Array.from(document.getElementsByTagName("h1"));
*     // check if frontmatter title is displayed on page (as h1)
*     // warning?: this may return true if we have h1 as jsx in markdown with title value
*     // and can return false if we give the frontmatter title (h1) an id
*     const headingTitle = headings?.find((h) => !h.id && h.innerHTML === title);

*     if (headingTitle) {
*         // find and remove the markdown heading
*         const firstMarkdownHeading = headings.find((h) => {
*             return h.id && headingTitle.innerHTML === h.innerHTML;
*         });

*         firstMarkdownHeading?.parentElement.removeChild(firstMarkdownHeading);
*     }
* }, [title]); */

    const MDXComponents = {
        /* Head, */ // TODO why do we need this here?
        /* a: (props) => (
*     <CustomLink
*         data={allDocuments} // TODO why do we pass all documents here?!
*         usehook={useMDXComponent}
*         preview={showLinkPreview ?? siteConfig.showLinkPreviews}
*         {...props}
*     />
* ),
* pre: Pre,
* mermaid: Mermaid, */
        /* eslint no-unused-vars: off */
        // TODO this is a temporary workaround for errors resulting from importing this component directly in mdx file
        // see this issue for ref: https://github.com/kentcdodds/mdx-bundler/issues/156
        BlogsList,
        wrapper: ({ components, layout, ...props }) => {
            const Layout = layouts[layout];
            return <Layout {...props} />;
        },
        // user defined MDX components could be added here
        // ...userMDXComponents
    };

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
            <MDXPage components={MDXComponents} {...meta} />
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
    const source = fs.readFileSync(page.file_path, { encoding: "utf-8" });

    const metadata = page.metadata || {};

    // TODO this is crap, refactor
    const { data, authors } = page.metadata || {};
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
            const parts = page.url_path.split("/");
            return { params: { slug: parts } };
        });

    return {
        paths,
        fallback: false,
    };
}
