// import knex from "knex";
import { MarkdownDB } from "./markdowndb";
import { Table } from "./schema";
import { recursiveWalkDir } from "../utils";

/**
 * @jest-environment node
 */
describe("MarkdownDB", () => {
  const pathToContentFixture = "packages/markdowndb/__mocks__/content";
  let mddb: MarkdownDB;

  beforeAll(async () => {
    const dbConfig = {
      client: "sqlite3",
      connection: {
        filename: "markdown.db",
      },
    };

    mddb = new MarkdownDB(dbConfig);
    await mddb.init();
    await mddb.indexFolder({ folderPath: pathToContentFixture });
  });

  afterAll(async () => {
    // TODO why we have to call this twice?
    mddb.db.destroy();
    mddb._destroyDb();
  });

  describe("correct startup and indexing", () => {
    test("adds tables to db", async () => {
      expect(await mddb.db.schema.hasTable(Table.Files)).toBe(true);
      expect(await mddb.db.schema.hasTable(Table.Tags)).toBe(true);
      expect(await mddb.db.schema.hasTable(Table.FileTags)).toBe(true);
      expect(await mddb.db.schema.hasTable(Table.Links)).toBe(true);
    });

    test("indexes all files in folder", async () => {
      const allFiles = recursiveWalkDir(pathToContentFixture);
      const allIndexedFiles = await mddb.getFiles();
      expect(allIndexedFiles).toHaveLength(allFiles.length);
    });
  });

  describe("querying files", () => {
    test("can get all files", async () => {
      const dbFiles = await mddb.getFiles();
      const dbFilesPaths = dbFiles.map((f) => f.path);
      const allFilesPaths = recursiveWalkDir(pathToContentFixture);

      expect(dbFiles).toHaveLength(allFilesPaths.length);
      dbFilesPaths.forEach((p) => {
        expect(allFilesPaths).toContain(p);
      });
    });

    test("can query by file type", async () => {
      const dbFiles = await mddb.getFiles({ filetypes: ["blog"] });
      const dbFilesPaths = dbFiles.map((f) => f.path);

      const expectedPaths = [
        `${pathToContentFixture}/blog/blog3.mdx`,
        `${pathToContentFixture}/blog/blog2.mdx`,
        `${pathToContentFixture}/blog0.mdx`,
      ];

      expect(dbFilesPaths).toHaveLength(expectedPaths.length);
      dbFilesPaths.forEach((p) => {
        expect(expectedPaths).toContain(p);
      });
    });

    test("can query by tags", async () => {
      const dbFiles = await mddb.getFiles({ tags: ["economy", "politics"] });
      const dbFilesPaths = dbFiles.map((f) => f.path);

      const expectedPaths = [
        `${pathToContentFixture}/blog/blog3.mdx`,
        `${pathToContentFixture}/blog/blog2.mdx`,
      ];

      expect(dbFilesPaths).toHaveLength(expectedPaths.length);
      dbFilesPaths.forEach((p) => {
        expect(expectedPaths).toContain(p);
      });
    });

    test("can query by extensions", async () => {
      const dbFiles = await mddb.getFiles({ extensions: ["png"] });
      const dbFilesPaths = dbFiles.map((f) => f.path);

      const expectedPaths = [
        `${pathToContentFixture}/assets/datopian-logo.png`,
      ];

      expect(dbFilesPaths).toHaveLength(expectedPaths.length);
      dbFilesPaths.forEach((p) => {
        expect(expectedPaths).toContain(p);
      });
    });

    test("can query by tags AND filetypes AND extensions", async () => {
      const dbFiles = await mddb.getFiles({
        tags: ["culture"],
        filetypes: ["news"],
        extensions: ["md", "mdx"],
      });
      const dbFilesPaths = dbFiles.map((f) => f.path);
      const expectedPaths = [`${pathToContentFixture}/news/news1.mdx`];

      expect(dbFilesPaths).toHaveLength(expectedPaths.length);
      dbFilesPaths.forEach((p) => {
        expect(expectedPaths).toContain(p);
      });
    });

    test("can find file by slug", async () => {
      const dbFile = await mddb.getFileBySlug("blog/blog2");
      expect(dbFile.slug).toBe("blog/blog2");
    });

    test("can find file by id", async () => {
      const dbFile = await mddb.getFileBySlug("blog/blog2");
      const dbFileById = await mddb.getFileById(dbFile._id);
      expect(dbFileById.slug).toBe("blog/blog2");
    });
  });

  describe("getTags", () => {
    // TODO the list of tags in db should be defined in some config file instead of being extracted from all the files
    test("can get all tags", async () => {
      const dbTags = await mddb.getTags();
      const extectedTags = [
        { name: "economy" },
        { name: "politics" },
        { name: "sports" },
        { name: "culture" },
      ];

      expect(dbTags).toHaveLength(extectedTags.length);
      dbTags.forEach((t) => {
        expect(extectedTags).toContainEqual(t);
      });
    });
  });

  describe("getLinks", () => {
    // test("can get all forward links of a file by file id", async () => {
    //   const file = await mddb.getFile({ slug: "blog/blog2" });
    //   const forwardLinks = await mddb.getLinks({
    //     fileId: file[0]._id,
    //   });
    //   expect(forwardLinks.length).toBe(1);
    // });
    // test("can get all backward links of a file", async () => {
    //   const file = await mddb.query({ urlPath: "blog/blog2" });
    //   const backwardLinks = await mddb.getLinks({
    //     fileId: file[0]._id,
    //     direction: "backward",
    //   });
    //   expect(backwardLinks.length).toBe(2);
    // });
  });

  // TODO why is this needed?
  // test("can query by folder", async () => {
  //   const allBlogFiles = recursiveWalkDir(`${pathToContentFixture}/blog`);
  //   const indexedBlogFiles = await mddb.query({
  //     folder: "blog",
  //     // filetypes: ["md", "mdx"],
  //   });
  //   expect(indexedBlogFiles.length).toBe(allBlogFiles.length);
  // });
});
