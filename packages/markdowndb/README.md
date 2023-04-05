# markdowndb

Parse markdown files and store them in an SQL database.

## TODOs

- [ ] Finish the link extraction and refactor
- [ ] Tutorial
- [ ] Design of MarkdownDB and especially the plugin system. NB: i think the best approach is to orient this around use cases
  - [ ] extract first heading as title metadata
  - [ ] add a metadata field
  - [ ] See job stories on https://datahub.io/notes/markdowndb
- [ ] Flowershow refactor to MarkdownDB from ContentLayer.dev (maybe just plan)
- [ ] Landing page / launch announce

## Design

MarkdownDB will parse all markdown files in a given directory and store them in a database. It will also extract links and store them in the database. It will also extract metadata from the markdown files.

### Ideas

- metadata type checking for different document types ?

### Custom tables

Not sure if needed

## How to use

In your Next.js project, install the package:

```sh
npm i @flowershow/markdowndb
```

Then, add the following to your `next.config.js`:

```js
const dbConfig = {
  client: "sqlite3",
  connection: {
    filename: "./markdown.db",
  },
  useNullAsDefault: true,
};

const mddb = new MarkdownDB(dbConfig);
await mddb.init();
await mddb.indexFolder({ folderPath: pathToContentFixture });
```
