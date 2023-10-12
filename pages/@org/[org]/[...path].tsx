import React from "react";
import { NextSeo } from "next-seo";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import { NavItem, NavGroup } from "@portaljs/core";

import MdxPage from "@/components/MdxPage";
import computeFields from "@/lib/computeFields";
import parse from "@/lib/markdown";
import siteConfig from "@/config/siteConfig";


export default function Page({ source, meta, siteConfig }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    source = JSON.parse(source);

    const seoImages = (() => {
        // if page has specific image set
        if (meta.image) {
            return [
                {
                    url: meta.image.startsWith("http")
                        ? meta.image
                        : `${siteConfig.domain}${meta.image}`,
                    width: 1200,
                    height: 627,
                    alt: meta.title,
                },
            ];
        }
        // otherwise return default images array set in config file
        return siteConfig.nextSeo?.openGraph?.images || [];
    })();

    return (
        <>
            <NextSeo
                title={meta.title}
                description={meta.description}
                openGraph={{
                    title: meta.title,
                    description: meta.description,
                    images: seoImages,
                }}
            />
            <MdxPage source={source} frontMatter={meta} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const urlPath = params?.slug ? (params.slug as string[]).join("/") : "/";

    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });

    const filePath = urlPath === "/" ? "index.md" : urlPath + ".md";
    const filePathEncoded = encodeURI(filePath);

    const object = await S3.send(
        new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: filePathEncoded
        })
    )

    const source = await object.Body.transformToString();
    const { mdxSource, frontMatter } = await parse(source, "mdx", {});

    const config = await siteConfig();

    // TODO temporary replacement for contentlayer's computedFields
    const frontMatterWithComputedFields = await computeFields({
        frontMatter,
        urlPath,
        filePath,
        source,
        siteConfig: config,
    });

    const siteMap: Array<NavGroup | NavItem> = [];

    // TODO
    /* if (frontMatterWithComputedFields?.showSidebar) {
*     // const allPages = await mddb.getFiles({ extensions: ["md", "mdx"] });
*     // TODO this operation has a limit of 1000 objects
*     // use delimiter somehow? https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html#API_ListObjectsV2_RequestSyntax
*     const allPages = await S3.send(
*         new ListObjectsV2Command({
*             Bucket: process.env.R2_BUCKET_NAME,
*             Delimiter: "/",
*         })
*     )
*     const pages = allPages.Contents?.filter((p) => !p.metadata?.isDraft);
*     pages.forEach((page) => {
*         addPageToSitemap(page, siteMap);
*     });
* } */

    return {
        props: {
            source: JSON.stringify(mdxSource),
            meta: frontMatterWithComputedFields,
            siteConfig: config,
            siteMap
        },
    }
}
