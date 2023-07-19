import React from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";

import { BlogsList, SimpleLayout } from "@portaljs/core";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
/* import computeFields from "../../lib/computeFields"; */
import type { CustomAppProps } from "../_app";

interface BlogIndexPageProps extends CustomAppProps {
    blogs: any[]; // TODO types
}

export default function Blog({
    blogs,
    meta: { title, description },
}: BlogIndexPageProps) {
    return (
        <SimpleLayout title={title} description={description}>
            <BlogsList blogs={blogs} />
        </SimpleLayout>
    );
}

export const getStaticProps: GetStaticProps = async (): Promise<
    GetStaticPropsResult<BlogIndexPageProps>
> => {
    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });

    // TODO this will return only up to 1000 objects
    const allObjects = await S3.send(
        new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME,
            Prefix: "blog/",
            /* Delimiter: "/", */
        })
    )

    // TODO can we get this data in one request?
    const allBlogsPromise = allObjects.Contents?.map(async (o) => {
        const object = await S3.send(
            new GetObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: o.Key,
            })
        )
        return {
            urlPath: o.Key.replace(/\.mdx?$/, ""),
            ...object.Metadata,
        }
    })

    const blogsList = await Promise.all(allBlogsPromise || [])

    console.log(blogsList)

    /* const blogsMetadataPromises = blogFiles.map(async (b) => {
*     const source = fs.readFileSync(b.file_path, { encoding: "utf-8" });

*     // TODO temporary replacement for contentlayer's computedFields
*     const frontMatterWithComputedFields = await computeFields({
*         frontMatter: b.metadata,
*         urlPath: b.url_path,
*         filePath: b.file_path,
*         source,
*     });

*     return frontMatterWithComputedFields;
* }); */

    return {
        props: {
            meta: {
                title: "Blog posts",
                showSidebar: false,
                showToc: false,
                showComments: false,
                showEditLink: false,
                urlPath: "/blog",
            },
            blogs: blogsList,
        },
    };
};
