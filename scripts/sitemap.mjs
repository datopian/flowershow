import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

import config from "../content/config.mjs";

export default async function sitemap() {
  const prettierConfig = await prettier.resolveConfig("");

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  // TODO this will only fetch up to 1000 objects !!
  const allR2Objects = await S3.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME
    })
  )

  const contentPages = allR2Objects
    .Contents
    .map((x) => `/${x.Key.replace(/\.mdx?$/, "")}`)
  const pages = await globby([
    "pages/*.(js|tsx)",
    "!pages/_*.(js|tsx)",
    "!pages/api",
    "!pages/404.(js|tsx)",
    "!pages/**/\\[\\[*\\]\\].(js|tsx)", // pages/[[...slug]].tsx
  ]);

  const siteUrl = config?.domain?.replace(/\/$/, "");

  if (siteUrl) {
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .concat(contentPages)
        .map((page) => {
          const path = page
            .replace("pages/", "/")
            .replace("public/", "/")
            .replace(/\.js|.tsx|.mdx|.md[^\/.]+$/, "")
            .replace("/feed.xml", "");
          const route = path === "/index" ? "" : path;
          return `
            <url>
              <loc>${siteUrl}${route}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

    const formatted = prettier.format(sitemap, {
      ...prettierConfig,
      parser: "html",
    });
    writeFileSync("public/sitemap.xml", formatted);
    console.log("Sitemap generated...");
  }
}
