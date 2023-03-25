import path from "path";
import assert from "assert";
import * as url from "url";
import { getPermalinks } from "../src/lib/getPermalinks.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const markdownFolder = path.join(__dirname, "/fixtures/content");

const expectedPermalinks = [
  "/", // /index.md
  "/blog/first-post",
  "/blog/second-post",
  "/blog/third-post",
  "/blog", // /blog/index.md
  "/blog/tutorials/first-tutorial",
];

describe("getPermalinks", () => {
  it("should return an array of permalinks", () => {
    const permalinks = getPermalinks(markdownFolder);
    // assert.deepStrictEqual(permalinks, expectedPermalinks);
    permalinks.forEach((permalink) => {
      assert.ok(expectedPermalinks.includes(permalink));
    });
  });
});
