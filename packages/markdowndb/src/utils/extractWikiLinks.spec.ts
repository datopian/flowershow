import remarkWikiLink from "@flowershow/remark-wiki-link";
import { extractWikiLinks } from "./extractWikiLinks";

const config = {
  remarkPlugins: [remarkWikiLink],
  extractors: {
    wikiLink: (node: any) => {
      // TODO how to get wiki links of embed types in a better way?
      // it should be possible, since we are adding { isType: "embed" } to tokens
      const { href, src } = node.data?.hProperties || {};
      return {
        linkType: (href ? "normal" : "embed") as "normal" | "embed",
        to: href ?? src,
      };
    },
  },
};

// TODO test for links with headings and aliases ?
// TODO test pdf embeds
// TODO tests for wiki links with shortened Obsidian paths
// TODO tests for index pages

describe("extractWikiLinks", () => {
  describe("Common Mark links", () => {
    test("should extract CommonMark links", () => {
      const source = "[Page 1](page-1) [Page 2](page-2) [Page 3](page-3)";
      const expectedLinks = [
        { linkType: "normal", to: "page-1" },
        { linkType: "normal", to: "page-2" },
        { linkType: "normal", to: "page-3" },
      ];
      const links = extractWikiLinks({ source, ...config });
      expect(links).toHaveLength(expectedLinks.length);
      links.forEach((link) => {
        expect(expectedLinks).toContainEqual(link);
      });
    });

    test("should extract embed type CommonMark links", () => {
      const source = "![abc](My_File.png)";
      const expectedLinks = [{ linkType: "embed", to: "My_File.png" }];
      const links = extractWikiLinks({ source, ...config });
      expect(links[0]).toEqual(expectedLinks[0]);
    });
  });

  describe("Wiki Links parsed with @flowershow/remark-wiki-link", () => {
    test("should extract wiki links", () => {
      const source = "[[Page 1]] [[Page 2]] [[Page 3]]";
      const expectedLinks = [
        { linkType: "normal", to: "page-1" },
        { linkType: "normal", to: "page-2" },
        { linkType: "normal", to: "page-3" },
      ];
      const links = extractWikiLinks({ source, ...config });
      expect(links).toHaveLength(expectedLinks.length);
      links.forEach((link) => {
        expect(expectedLinks).toContainEqual(link);
      });
    });

    test("should extract embedded wiki links", () => {
      const source = "![[My File.png]]]]";
      const expectedLinks = [{ linkType: "embed", to: "My File.png" }];
      const links = extractWikiLinks({ source, ...config });
      expect(links[0]).toEqual(expectedLinks[0]);
    });
  });

  // TODO fix this test
  // test("should return unique links", () => {
  //   const source = "[[Page 1]] [[Page 2]] [[Page 3]] [[Page 1]]";
  //   const expectedLinks = [
  //     { type: "normal", to: "page-1" },
  //     { type: "normal", to: "page-2" },
  //     { type: "normal", to: "page-3" },
  //   ];
  //   const links = extractWikiLinks({ source, ...config });
  //   expect(links).toHaveLength(expectedLinks.length);
  //   links.forEach((link) => {
  //     expect(expectedLinks).toContainEqual(link);
  //   });
  // });

  test("shouldn't extract external links", () => {
    const source = "[External Link](https://example.com)";
    const links = extractWikiLinks({ source, ...config });
    expect(links).toHaveLength(0);
  });

  test("should return empty array if no links are found", () => {
    const source = "No links here";
    const links = extractWikiLinks({ source, ...config });
    expect(links).toHaveLength(0);
  });

  test("should return empty array if page is empty", () => {
    const source = "";
    const links = extractWikiLinks({ source, ...config });
    expect(links).toHaveLength(0);
  });

  describe("with base file path (slug) passed", () => {
    test("should resolve relative links to absolute links", () => {
      const baseFileSlug = "/__blog__/abc/page-1";
      const source = "[[../xyz/Page 2]] [[./Page 3]] [[Page 4]]";
      const expectedLinks = [
        { linkType: "normal", to: "/__blog__/xyz/page-2", from: baseFileSlug },
        { linkType: "normal", to: "/__blog__/abc/page-3", from: baseFileSlug },
        { linkType: "normal", to: "/__blog__/abc/page-4", from: baseFileSlug },
      ];

      const links = extractWikiLinks({
        source,
        filePath: baseFileSlug,
        ...config,
      });
      expect(links).toHaveLength(expectedLinks.length);
      links.forEach((link) => {
        expect(expectedLinks).toContainEqual(link);
      });
    });

    test("should return absolute links as is", () => {
      const baseFileSlug = "/__blog__/abc/page-1";
      const source = "[[/xyz/Page 2]]";
      const expectedLinks = [
        { linkType: "normal", to: "/xyz/page-2", from: baseFileSlug },
      ];
      const links = extractWikiLinks({
        source,
        filePath: baseFileSlug,
        ...config,
      });
      expect(links).toHaveLength(expectedLinks.length);
      expect(links[0]).toEqual(expectedLinks[0]);
    });
  });
});
