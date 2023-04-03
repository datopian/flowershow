import { recursiveWalkDir } from "./recursiveWalkDir";

describe("recursiveWalkDir", () => {
  const contentFixturePath = "packages/markdowndb/__mocks__/content/index.mdx";
  /*
   * To get all the file paths in the content fixture, run the following command in the terminal:
   * find <contentFicturePath> -type f
   * watch out for double slashes in the output
   * */
  const contentFixtureFilePaths = [
    "packages/markdowndb/__mocks__/content/index.mdx",
    "packages/markdowndb/__mocks__/content/blog/blog3.mdx",
    "packages/markdowndb/__mocks__/content/blog/blog2.mdx",
    "packages/markdowndb/__mocks__/content/blog/blog1.mdx",
    "packages/markdowndb/__mocks__/content/blog0.mdx",
    "packages/markdowndb/__mocks__/content/assets/datopian-logo.png",
  ];

  test("should return all files in a directory", async () => {
    const paths = recursiveWalkDir("packages/markdowndb/__mocks__/content");

    expect(paths.length).toBe(contentFixtureFilePaths.length);
    paths.forEach((file) => {
      expect(contentFixtureFilePaths).toContain(file);
    });
  });
});
