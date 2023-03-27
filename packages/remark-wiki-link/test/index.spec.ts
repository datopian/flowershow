import markdown from "remark-parse";
// import remark2markdown from "remark-stringify";
import { unified } from "unified";
// import { select } from "unist-util-select";
import { visit } from "unist-util-visit";
import { Node } from "unist";

import wikiLinkPlugin from "../src";

describe("remark-wiki-link", () => {
  describe("wiki link with matching permalink", () => {
    test("parses a wiki link with relative path", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["wiki-link"],
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("wiki-link");
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("wiki-link");
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });

    test("parses a wiki link with absolute path", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["/some/folder/wiki-link"],
          absoltePaths: true,
        });

      let ast = processor.parse("[[some/folder/Wiki Link]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("/some/folder/wiki-link");
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("wiki-link");
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });

    test("parses a relative wiki link to file in upper directory", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["wiki-link"],
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("wiki-link");
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("wiki-link");
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });
  });

  // test("parses a wiki link that has no matching permalink", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //   let ast = processor.parse("[[New Page]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data?.exists).toEqual(false);
  //     expect(node.data?.permalink).toEqual("new-page");
  //     expect(node.data?.hName).toEqual("a");
  //     expect((node.data?.hProperties as any).className).toEqual("internal new");
  //     expect((node.data?.hProperties as any).href).toEqual("new-page");
  //     expect((node.data?.hChildren as any)[0].value).toEqual("New Page");
  //   });
  // });

  // test("parses wiki links with aliases", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: []
  //     });

  //   let ast = processor.parse("[[Real Page|Page Alias]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data?.exists).toEqual(false);
  //     expect(node.data?.permalink).toEqual("real-page");
  //     expect(node.data?.hName).toEqual("a");
  //     expect(node.data?.alias).toEqual("Page Alias");
  //     expect((node.data?.hProperties as any).className).toEqual("internal new");
  //     expect((node.data?.hProperties as any).href).toEqual("real-page");
  //     expect((node.data?.hChildren as any)[0].value).toEqual("Page Alias");
  //   });
  // });

  // test("handles wiki alias links with custom divider", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: [],
  //       aliasDivider: ":"
  //     });

  //   let ast = processor.parse("[[Real Page:Page Alias]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data?.exists).toEqual(false);
  //     expect(node.data?.permalink).toEqual("real-page");
  //     expect(node.data?.hName).toEqual("a");
  //     expect(node.data?.alias).toEqual("Page Alias");
  //     expect((node.data?.hProperties as any).className).toEqual("internal new");
  //     expect((node.data?.hProperties as any).href).toEqual("real-page");
  //     expect((node.data?.hChildren as any)[0].value).toEqual("Page Alias");
  //   });
  // });

  // test("parses wiki links with heading", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //   let ast = processor.parse("[[Wiki Link#With Heading]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data?.exists).toEqual(false);
  //     expect(node.data?.permalink).toEqual("wiki-link#with-heading");
  //     expect(node.data?.hName).toEqual("a");
  //     expect((node.data?.hProperties as any).className).toEqual("internal new");
  //     expect((node.data?.hProperties as any).href).toEqual("wiki-link#with-heading");
  //     expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link#With Heading"); // TODO
  //   });
  // });

  // test("handles wiki alias links with heading and custom divider", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //   let ast = processor.parse("[[Real Page#With Heading|Page Alias]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data.exists).toEqual(false);
  //     expect(node.data.permalink).toEqual("real-page#with-heading");
  //     expect(node.data.hName).toEqual("a");
  //     expect(node.data.alias).toEqual("Page Alias");
  //     expect((node.data.hProperties as any).className).toEqual("internal new");
  //     expect((node.data.hProperties as any).href).toEqual("real-page#with-heading");
  //     expect((node.data.hChildren as any)[0].value).toEqual("Page Alias");
  //   });
  // });

  // test("handles wiki alias links with heading, custom divider and matching permalink", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: ["real-page"],
  //     });

  //   let ast = processor.parse("[[Real Page#With Heading|Page Alias]]");
  //   ast = processor.runSync(ast);

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data.exists).toEqual(false);
  //     expect(node.data.permalink).toEqual("real-page#with-heading");
  //     expect(node.data.hName).toEqual("a");
  //     expect(node.data.alias).toEqual("Page Alias");
  //     expect((node.data.hProperties as any).className).toEqual("internal new");
  //     expect((node.data.hProperties as any).href).toEqual("real-page#with-heading");
  //     expect((node.data.hChildren as any)[0].value).toEqual("Page Alias");
  //   });
  // });

  // test("handles wiki alias links with heading, custom divider, matching permalink and shortened obsidian path", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: ["/some/folder/real-page"],
  //     });

  //   let ast = processor.parse("[[Real Page#With Heading|Page Alias]]");
  //   ast = processor.runSync(ast);

  //   console.log(ast)

  //   visit(ast, "wikiLink", (node: Node) => {
  //     expect(node.data.exists).toEqual(false);
  //     expect(node.data.permalink).toEqual("real-page#with-heading");
  //     expect(node.data.hName).toEqual("a");
  //     expect(node.data.alias).toEqual("Page Alias");
  //     expect((node.data.hProperties as any).className).toEqual("internal new");
  //     expect((node.data.hProperties as any).href).toEqual("/some/folder/real-page#with-heading");
  //     expect((node.data.hChildren as any)[0].value).toEqual("Page Alias");
  //   });
  // });

  // test("handles a wiki link heading within the page", () => {
  //   const processor = unified().use(markdown).use(wikiLinkPlugin);

  //   var ast = processor.parse("[[#Heading]]");
  //   ast = processor.runSync(ast);

  //   vistest(ast, "wikiLink", (node) => {
  //     assert.equal(node.data.permalink, "#heading");
  //     assert.equal(node.data.alias, "Heading");
  //     assert.equal(node.data.hName, "a");
  //     assert.equal(node.data.hProperties.className, "internal new");
  //     assert.equal(node.data.hProperties.href, "#heading");
  //     assert.equal(node.data.hChildren[0].value, "Heading");
  //   });
  // });

  // test("parses a wiki link that is an image", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: ["images/Test image.png"],
  //     });

  //   var ast = processor.parse("![[Test image.png]]");
  //   ast = processor.runSync(ast);

  //   vistest(ast, "wikiLink", (node) => {
  //     assert.equal(node.isType, "transclusions");
  //     assert.equal(node.data.permalink, "images/Test image.png");
  //     assert.equal(node.data.exists, true);
  //     assert.equal(node.data.hName, "img");
  //     assert.equal(node.data.hProperties.className, "internal");
  //     assert.equal(node.data.hProperties.src, "/images/Test image.png");
  //   });
  // });

  // test("parses a wiki link that is a PDF", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: ["images/Test.pdf"],
  //     });

  //   var ast = processor.parse("![[Test.pdf]]");
  //   ast = processor.runSync(ast);

  //   vistest(ast, "wikiLink", (node) => {
  //     assert.equal(node.isType, "transclusions");
  //     assert.equal(node.data.permalink, "images/Test.pdf#view=Fit");
  //     assert.equal(node.data.exists, true);
  //     assert.equal(node.data.hName, "embed");
  //     assert.equal(node.data.hProperties.className, "internal");
  //     assert.equal(node.data.hProperties.src, "/images/Test.pdf#view=Fit");
  //   });
  // });

  // test("displays warning for a wiki link that is not a supported image", () => {
  //   const processor = unified()
  //     .use(markdown)
  //     .use(wikiLinkPlugin, {
  //       permalinks: ["images/Test image.pxg"],
  //     });

  //   var ast = processor.parse("![[Test image.pxg]]");
  //   ast = processor.runSync(ast);

  //   vistest(ast, "wikiLink", (node) => {
  //     assert.equal(node.isType, "transclusions");
  //     assert.equal(node.data.permalink, "images/Test image.pxg");
  //     assert.equal(node.data.exists, true);
  //     assert.equal(node.data.hName, "span");
  //     assert.equal(
  //       node.data.hChildren[0].value,
  //       "Document type PXG is not yet supported for transclusion"
  //     );
  //   });
  // });

  // test("stringifies wiki links", () => {
  //   const processor = unified()
  //     .use(markdown, { gfm: true, footnotes: true, yaml: true })
  //     .use(remark2markdown)
  //     .use(wikiLinkPlugin, { permalinks: ["wiki-link"] });

  //   const stringified = processor.processSync("[[Wiki Link]]").value.trim();
  //   assert.equal(stringified, "[[Wiki Link]]");
  // });

  // test("stringifies aliased wiki links", () => {
  //   const processor = unified()
  //     .use(markdown, { gfm: true, footnotes: true, yaml: true })
  //     .use(remark2markdown)
  //     .use(wikiLinkPlugin, {
  //       aliasDivider: ":",
  //     });

  //   const stringified = processor
  //     .processSync("[[Real Page:Page Alias]]")
  //     .value.trim();
  //   assert.equal(stringified, "[[Real Page:Page Alias]]");
  // });

  // context("configuration options", () => {
  //   test("uses pageResolver", () => {
  //     const identity = (name) => [name];

  //     const processor = unified()
  //       .use(markdown)
  //       .use(wikiLinkPlugin, {
  //         pageResolver: identity,
  //         permalinks: ["A Page"],
  //       });

  //     var ast = processor.parse("[[A Page]]");
  //     ast = processor.runSync(ast);

  //     vistest(ast, "wikiLink", (node) => {
  //       assert.equal(node.data.exists, true);
  //       assert.equal(node.data.permalink, "A Page");
  //       assert.equal(node.data.hProperties.href, "/A Page");
  //     });
  //   });

  //   test("uses newClassName", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       newClassName: "new_page",
  //     });

  //     var ast = processor.parse("[[A Page]]");
  //     ast = processor.runSync(ast);

  //     vistest(ast, "wikiLink", (node) => {
  //       assert.equal(node.data.hProperties.className, "internal new_page");
  //     });
  //   });

  //   test("uses hrefTemplate", () => {
  //     const processor = unified()
  //       .use(markdown)
  //       .use(wikiLinkPlugin, {
  //         hrefTemplate: (permalink) => permalink,
  //       });

  //     var ast = processor.parse("[[A Page]]");
  //     ast = processor.runSync(ast);

  //     vistest(ast, "wikiLink", (node) => {
  //       assert.equal(node.data.hProperties.href, "a-page");
  //     });
  //   });

  //   test("uses wikiLinkClassName", () => {
  //     const processor = unified()
  //       .use(markdown)
  //       .use(wikiLinkPlugin, {
  //         wikiLinkClassName: "wiki_link",
  //         permalinks: ["a-page"],
  //       });

  //     var ast = processor.parse("[[A Page]]");
  //     ast = processor.runSync(ast);

  //     vistest(ast, "wikiLink", (node) => {
  //       assert.equal(node.data.hProperties.className, "wiki_link");
  //     });
  //   });
  // });

  // context("open wiki links", () => {
  //   test("handles open wiki links", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //     var ast = processor.parse("t[[\nt");
  //     ast = processor.runSync(ast);

  //     assert.ok(!select("wikiLink", ast));
  //   });

  //   test("handles open wiki links at end of file", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //     var ast = processor.parse("t [[");
  //     ast = processor.runSync(ast);

  //     assert.ok(!select("wikiLink", ast));
  //   });

  //   test("handles open wiki links with partial data", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //     var ast = processor.parse("t [[tt\nt");
  //     ast = processor.runSync(ast);

  //     assert.ok(!select("wikiLink", ast));
  //   });

  //   test("handles open wiki links with partial alias divider", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       aliasDivider: "::",
  //       permalinks: [],
  //     });

  //     var ast = processor.parse("[[t::\n");
  //     ast = processor.runSync(ast);

  //     assert.ok(!select("wikiLink", ast));
  //   });

  //   test("handles open wiki links with partial alias", () => {
  //     const processor = unified().use(markdown).use(wikiLinkPlugin, {
  //       permalinks: [],
  //     });

  //     var ast = processor.parse("[[t|\n");
  //     ast = processor.runSync(ast);

  //     assert.ok(!select("wikiLink", ast));
  //   });
  // });

  // test("exports the plugin with named exports", () => {
  //   assert.equal(wikiLinkPlugin, defaultWikiLinkPlugin);
  // });
});
