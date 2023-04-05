# MarkdownDB [![](https://badgen.net/npm/v/@flowershow/markdowndb)](https://www.npmjs.com/package/@flowershow/markdowndb)

MarkdownDB is a ... that parses your markdown files and saves them to your local SQLite database, so that you can easily import them into your application.

**🚧 MarkdownDB is in its early development stage**

## How to use in Next.js app

If you don't have your Next.js project yet, create one with:

```sh
npx create-next-app@latest my-mddb-app
```

Once the project is created, install the MarkdownDB package:

```sh
npm i @flowershow/markdowndb
```

And run the following command, passing the path to your markdown content folder as an argument.

```sh
npx mddb <path-to-your-content-folder>
# e.g.
# npx mddb my-mddb-content
```

🎉 Done! You should see a new `markdown.db` file created in the root of your project.

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

Now, in any of your pages you can use it to query the database, e.g.:

```tsx
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

## Features

- [ ] ...

## Upcoming features

- [ ] config file
- [ ] custom document types and schemas
- [ ] ...
