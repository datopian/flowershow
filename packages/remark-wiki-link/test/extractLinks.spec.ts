import extractLinks from "../src/utils/extractLinks";

describe("extractLinks", () => {
  test("should extract wikiLinks", () => {
    const source = "[[Page 1]] [[Page 2]] [[Page 3]]";
    const expectedLinks = ["page-1", "page-2", "page-3"];
    const links = extractLinks(source);
    expect(links).toHaveLength(expectedLinks.length);
    links.forEach((link) => {
      expect(expectedLinks).toContain(link);
    });
  });

  test("should extract CommonMark links", () => {
    const source = "[Page 1](page-1) [Page 2](page-2) [Page 3](page-3)";
    const expectedLinks = ["page-1", "page-2", "page-3"];
    const links = extractLinks(source);
    expect(links).toHaveLength(expectedLinks.length);
    links.forEach((link) => {
      expect(expectedLinks).toContain(link);
    });
  });

  test("should return unique links", () => {
    const source = "[[Page 1]] [[Page 2]] [[Page 3]] [[Page 1]]";
    const expectedLinks = ["page-1", "page-2", "page-3"];
    const links = extractLinks(source);
    expect(links).toHaveLength(expectedLinks.length);
    links.forEach((link) => {
      expect(expectedLinks).toContain(link);
    });
  });

  test("shouldn't extract external links", () => {
    const source = "[External Link](https://example.com)";
    const links = extractLinks(source);
    expect(links).toHaveLength(0);
  });

  test("should convert relative links to absolute links when file slug (not index page) is passed", () => {
    const fileSlug = "/__blog__/abc/page-1";
    const source = "[[../xyz/Page 2]]";
    const expectedLinks = ["/__blog__/xyz/page-2"];
    const links = extractLinks(source, fileSlug);
    expect(links[0]).toBe(expectedLinks[0]);
  });

  // TODO test for index pages

  test("should return empty array if no links are found", () => {
    const source = "No links here";
    const links = extractLinks(source);
    expect(links).toHaveLength(0);
  });

  test("should return empty array if page is empty", () => {
    const source = "";
    const links = extractLinks(source);
    expect(links).toHaveLength(0);
  });
});
