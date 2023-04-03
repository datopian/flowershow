import { extractWikiLinks } from "./extractWikiLinks";

// TODO test for links with headings and aliases ?
// TODO test pdf embeds
// TODO tests for wiki links with shortened Obsidian paths
// TODO tests for index pages
// TODO test custom extractors
// TODO test with other remark plugins e.g. original wiki links

describe("extractWikiLinks", () => {
  describe("Common Mark links", () => {
    test("should extract CommonMark links", () => {
      const source = "[Page 1](page-1) [Page 2](page-2) [Page 3](page-3)";
      const expectedLinks = [
        { linkType: "normal", linkSrc: "page-1" },
        { linkType: "normal", linkSrc: "page-2" },
        { linkType: "normal", linkSrc: "page-3" },
      ];
      const links = extractWikiLinks(source);
      expect(links).toHaveLength(expectedLinks.length);
      links.forEach((link) => {
        expect(expectedLinks).toContainEqual(link);
      });
    });

    test("should extract embed type CommonMark links", () => {
      const source = "![abc](My_File.png)";
      const expectedLinks = [{ linkType: "embed", linkSrc: "My_File.png" }];
      const links = extractWikiLinks(source);
      expect(links[0]).toEqual(expectedLinks[0]);
    });
  });

  describe("Obsidian wiki links", () => {
    test("should extract wiki links", () => {
      const source = "[[Page 1]] [[Page 2]] [[Page 3]]";
      const expectedLinks = [
        { linkType: "normal", linkSrc: "page-1" },
        { linkType: "normal", linkSrc: "page-2" },
        { linkType: "normal", linkSrc: "page-3" },
      ];
      const links = extractWikiLinks(source);
      expect(links).toHaveLength(expectedLinks.length);
      links.forEach((link) => {
        expect(expectedLinks).toContainEqual(link);
      });
    });

    test("should extract embedded wiki links", () => {
      const source = "![[My File.png]]]]";
      const expectedLinks = [{ linkType: "embed", linkSrc: "My File.png" }];
      const links = extractWikiLinks(source);
      expect(links[0]).toEqual(expectedLinks[0]);
    });
  });

  // TODO fix this test
  // test("should return unique links", () => {
  //   const source = "[[Page 1]] [[Page 2]] [[Page 3]] [[Page 1]]";
  //   const expectedLinks = [
  //     { linkType: "normal", linkSrc: "page-1" },
  //     { linkType: "normal", linkSrc: "page-2" },
  //     { linkType: "normal", linkSrc: "page-3" },
  //   ];
  //   const links = extractWikiLinks({ source, ...config });
  //   expect(links).toHaveLength(expectedLinks.length);
  //   links.forEach((link) => {
  //     expect(expectedLinks).toContainEqual(link);
  //   });
  // });

  test("shouldn't extract external links", () => {
    const source = "[External Link](https://example.com)";
    const links = extractWikiLinks(source);
    expect(links).toHaveLength(0);
  });

  test("should return empty array if no links are found", () => {
    const source = "No links here";
    const links = extractWikiLinks(source);
    expect(links).toHaveLength(0);
  });

  test("should return empty array if page is empty", () => {
    const source = "";
    const links = extractWikiLinks(source);
    expect(links).toHaveLength(0);
  });
});
