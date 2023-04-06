# MarkdownDB

[![](https://badgen.net/npm/v/@flowershow/markdowndb)](https://www.npmjs.com/package/@flowershow/markdowndb)

MarkdownDB is a javascript library for treating markdown files as a database -- as a "MarkdownDB". Specifically, it:

- Parses your markdown files to extract structured data (frontmatter, tags etc) and creates an index in a local SQLite database
- Provides a lightweight javascript API for querying the database and importing files into your application

**🚧 MarkdownDB is in its early development stage**

## Quick start

Install the MarkdownDB package in your Node.js project:

```sh
npm i @flowershow/markdowndb
```

And run the following command, passing the path to your markdown content folder as an argument.

```sh
npx mddb <path-to-your-content-folder>
# e.g.
# npx mddb my-mddb-content
```

...or, if you don't have a Node.js project and just want to index your content into an SQLite databse and handle the rest on your own:

```sh
npx @flowershow/markdowndb <path-to-your-content>
```

🎉 Done! You should see a new `markdown.db` file created in the directory where you ran the command.

You can preview it with any SQLite viewer, e.g. https://sqlitebrowser.org/.

You can also add it as a script to your `package.json` file:

```json
{
  "name": "my-mddb-app",
  "scripts": {
    ...
    "mddb": "mddb <path-to-your-content-folder>",
    "prebuild": "npm run mddb"
  },
  ...
}

```

Now, once the data is in the database, you can add the following script to your project (e.g. in `/lib` folder). It will allow you to establish a single connection to the database and use it across you app.

```
// lib/mddb.ts
import { MarkdownDB } from "@flowershow/markdowndb";

const dbPath = "markdown.db";

const client = new MarkdownDB({
    client: "sqlite3",
    connection: {
        filename: dbPath,
    },
});

const clientPromise = client.init();

export default clientPromise;
```

Now, you can import it across your project to query the database, e.g.:

```js
import clientPromise from "@/lib/mddb";

const mddb = await clientPromise;
const blogs = await mddb.getFiles({
  folder: "blog",
  extensions: ["md", "mdx"],
});
```

### With Next.js project

For example, in your Next.js project's pages, you could do:

```tsx
// /pages/blog/index.ts

import clientPromise from "@/lib/mddb";
import { BlogsList, SimpleLayout } from "@/components";

export default function Blog({ blogs }) {
  return (
    <>
      <SimpleLayout title="Blog posts">
        <BlogsList blogs={blogs} />
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  const mddb = await clientPromise;
  let blogs = await mddb.getFiles({
    folder: "blog",
    extensions: ["md", "mdx"],
  });

  const blogsObjects = blogs.map((b) => b.toObject());

  return {
    props: {
      blogs: blogsObjects,
    },
  };
}
```

## API reference

TBD

## Features

- indexing markdown files into an SQLite database, with:
  - frontmatter data extraction (specifically tags and document types)
  - wiki links extraction (CommonMark links, Obsidian links and embeds)
- querying database for:
  - a list of all or some of the markdown files in your content folder: e.g. get all your blog posts tagged with "tutorial"
  - get backlinks to or forward on a given page, and e.g. list them in the bottom of your pages, so that users can quickly find related content

## Upcoming features

- custom document types and schemas with data validation
- computed fields
- indexing multiple folders
- extracting tasks
- and much more...
