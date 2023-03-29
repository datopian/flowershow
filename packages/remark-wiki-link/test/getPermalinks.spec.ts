import * as path from "path";
// import * as url from "url";
import { getPermalinks } from "../src/lib/getPermalinks";

// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const markdownFolder = path.join(__dirname, "/fixtures/content");
const markdownFolder = path.join(
  ".",
  "/packages/remark-wiki-link/test/fixtures/content"
);

const expectedPermalinks = [
  "/", // /index.md
  "/abc",
  "/blog/first-post",
  "/blog/second-post",
  "/blog/third-post",
  "/blog", // /blog/index.md
  "/blog/tutorials/first-tutorial",
];

describe("getPermalinks", () => {
  test("should return an array of permalinks", () => {
    const permalinks = getPermalinks(markdownFolder);
    // assert.deepStrictEqual(permalinks, expectedPermalinks);
    permalinks.forEach((permalink) => {
      expect(expectedPermalinks).toContain(permalink);
    });
  });
});
