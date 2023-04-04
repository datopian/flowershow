import { parseFile } from "./parseFile";

const source = `---
title: Hello World
tags: [hello, world]
---
# Hello World
[[Some Link]]
[[blog/Some Other Link]]
[[blog/Some Other Link|Page Alias]]
![[Some Image.png]]
`;

describe("parseFile", () => {
  it("should parse a file returning metadata and wiki links", () => {
    const expectedMetadata = {
      title: "Hello World",
      tags: ["hello", "world"],
    };
    const expectedLinks = [
      { linkType: "normal", linkSrc: "some-link" },
      { linkType: "normal", linkSrc: "blog/some-other-link" },
      { linkType: "normal", linkSrc: "blog/some-other-link" },
      { linkType: "embed", linkSrc: "Some Image.png" },
    ];
    const { metadata, links } = parseFile(source);
    expect(metadata).toEqual(expectedMetadata);
    expect(links).toEqual(expectedLinks);
  });
});
