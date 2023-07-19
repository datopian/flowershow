/* eslint import/no-default-export: off */
import React from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { SimpleLayout } from "@portaljs/core";

import type { CustomAppProps } from "./_app";

interface AllPageProps extends CustomAppProps {
    pages: Array<{ urlPath: string; displayName: string }>; // TODO types
}

export default function All({ pages, meta: { title } }: AllPageProps) {
    const pagesGroupedByFirstLetter: {
        [key: string]: Array<{ urlPath: string; displayName: string }>;
    } = pages.reduce((acc, curr) => {
        const firstLetter = curr.displayName.charAt(0);
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(curr);
        return acc;
    }, {});

    const letters = Object.keys(pagesGroupedByFirstLetter).sort();

    return (
        <SimpleLayout title={title}>
            <div className="prose dark:prose-invert max-w-[100%] p-6">
                {letters.map((letter) => (
                    <div key={letter} className="ml-2 pt-2">
                        <h3>{letter}</h3>
                        <hr className="w-full dark:border-gray-700" />
                        <ul className="list-disc flex flex-wrap">
                            {pagesGroupedByFirstLetter[letter].map(
                                ({ urlPath, displayName }) => (
                                    <li key={urlPath} className="pr-8">
                                        <a href={urlPath}>{displayName}</a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </SimpleLayout>
    );
}

export const getStaticProps: GetStaticProps = async (): Promise<
    GetStaticPropsResult<AllPageProps>
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
            /* Delimiter: "/", */
        })
    )

    // TODO can we get this data in one request?
    const allPagesPromise = allObjects.Contents?.map(async (o) => {
        const object = await S3.send(
            new GetObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: o.Key,
            })
        )
        return {
            file_path: o.Key,
            metadata: object.Metadata,
        }
    })

    const allPages = await Promise.all(allPagesPromise || [])

    const allPagesList = allPages
        .filter((page) => page.file_path !== "index.md") // exclude homepage
        .map((page) => {
            const urlPath = page.file_path;
            const displayName = urlPath
                .split("/")
                .pop()
                .replace(/-/g, " ")
                .replace(/\.mdx?$/, "")
                .replace(
                    /^(\w)(.+)/,
                    (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase()
                );

            return { urlPath, displayName };
        })
        .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return {
        props: {
            meta: {
                title: "A-Z Index",
                showSidebar: false,
                showToc: false,
                showComments: false,
                showEditLink: false,
                urlPath: "/_all",
            },
            pages: allPagesList,
        },
    };
};
