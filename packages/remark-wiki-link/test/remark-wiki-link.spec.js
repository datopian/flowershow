import assert from "assert";
import markdown from "remark-parse";
import remark2markdown from "remark-stringify";
import { unified } from "unified";
import { select } from "unist-util-select";
import { visit } from "unist-util-visit";

import { wikiLinkPlugin } from "../src/index.js";
import defaultWikiLinkPlugin from "../src/index.js";

describe("remark-wiki-link", () => {
  it("parses a wiki link that has a matching permalink", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["test"],
      });

    var ast = processor.parse("[[test]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.permalink, "test");
      assert.equal(node.data.exists, true);
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.href, "/test");
      assert.equal(node.data.hChildren[0].value, "test");
    });
  });

  it("parses a wiki link that has no matching permalink", () => {
    const processor = unified().use(markdown).use(wikiLinkPlugin, {
      permalinks: [],
    });

    var ast = processor.parse("[[New Page]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.exists, false);
      assert.equal(node.data.permalink, "new-page");
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.hProperties.className, "internal new");
      assert.equal(node.data.hProperties.href, "/new-page");
      assert.equal(node.data.hChildren[0].value, "New Page");
    });
  });

  it("handles wiki alias links with custom divider", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["example/test"],
      });

    var ast = processor.parse("[[example/test|custom text]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.exists, true);
      assert.equal(node.data.permalink, "example/test");
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.alias, "custom text");
      assert.equal(node.value, "example/test");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.href, "/example/test");
      assert.equal(node.data.hChildren[0].value, "custom text");
    });
  });

  it("handles wiki links with heading", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["example/test"],
      });

    var ast = processor.parse("[[example/test#with heading]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.exists, true);
      assert.equal(node.data.permalink, "example/test#with-heading");
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.href, "/example/test#with-heading");
      assert.equal(node.data.hChildren[0].value, "example/test#with heading");
    });
  });

  it("handles wiki alias links with heading and custom divider", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["example/test"],
      });

    var ast = processor.parse("[[example/test#with heading|custom text]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.exists, true);
      assert.equal(node.data.permalink, "example/test#with-heading");
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.href, "/example/test#with-heading");
      assert.equal(node.data.hChildren[0].value, "custom text");
    });
  });

  it("handles a wiki link heading within the page", () => {
    const processor = unified().use(markdown).use(wikiLinkPlugin);

    var ast = processor.parse("[[#Heading]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.data.permalink, "#heading");
      assert.equal(node.data.alias, "Heading");
      assert.equal(node.data.hName, "a");
      assert.equal(node.data.hProperties.className, "internal new");
      assert.equal(node.data.hProperties.href, "#heading");
      assert.equal(node.data.hChildren[0].value, "Heading");
    });
  });

  it("parses a wiki link that is an image", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["images/Test image.png"],
      });

    var ast = processor.parse("![[Test image.png]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.isType, "transclusions");
      assert.equal(node.data.permalink, "images/Test image.png");
      assert.equal(node.data.exists, true);
      assert.equal(node.data.hName, "img");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.src, "/images/Test image.png");
    });
  });

  it("parses a wiki link that is a PDF", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["images/Test.pdf"],
      });

    var ast = processor.parse("![[Test.pdf]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.isType, "transclusions");
      assert.equal(node.data.permalink, "images/Test.pdf#view=Fit");
      assert.equal(node.data.exists, true);
      assert.equal(node.data.hName, "embed");
      assert.equal(node.data.hProperties.className, "internal");
      assert.equal(node.data.hProperties.src, "/images/Test.pdf#view=Fit");
    });
  });

  it("displays warning for a wiki link that is not a supported image", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ["images/Test image.pxg"],
      });

    var ast = processor.parse("![[Test image.pxg]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node) => {
      assert.equal(node.isType, "transclusions");
      assert.equal(node.data.permalink, "images/Test image.pxg");
      assert.equal(node.data.exists, true);
      assert.equal(node.data.hName, "span");
      assert.equal(
        node.data.hChildren[0].value,
        "Document type PXG is not yet supported for transclusion"
      );
    });
  });

  it("stringifies wiki links", () => {
    const processor = unified()
      .use(markdown, { gfm: true, footnotes: true, yaml: true })
      .use(remark2markdown)
      .use(wikiLinkPlugin, { permalinks: ["wiki-link"] });

    const stringified = processor.processSync("[[Wiki Link]]").value.trim();
    assert.equal(stringified, "[[Wiki Link]]");
  });

  it("stringifies aliased wiki links", () => {
    const processor = unified()
      .use(markdown, { gfm: true, footnotes: true, yaml: true })
      .use(remark2markdown)
      .use(wikiLinkPlugin, {
        aliasDivider: ":",
      });

    const stringified = processor
      .processSync("[[Real Page:Page Alias]]")
      .value.trim();
    assert.equal(stringified, "[[Real Page:Page Alias]]");
  });

  context("configuration options", () => {
    it("uses pageResolver", () => {
      const identity = (name) => [name];

      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          pageResolver: identity,
          permalinks: ["A Page"],
        });

      var ast = processor.parse("[[A Page]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node) => {
        assert.equal(node.data.exists, true);
        assert.equal(node.data.permalink, "A Page");
        assert.equal(node.data.hProperties.href, "/A Page");
      });
    });

    it("uses newClassName", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        newClassName: "new_page",
      });

      var ast = processor.parse("[[A Page]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node) => {
        assert.equal(node.data.hProperties.className, "internal new_page");
      });
    });

    it("uses hrefTemplate", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          hrefTemplate: (permalink) => permalink,
        });

      var ast = processor.parse("[[A Page]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node) => {
        assert.equal(node.data.hProperties.href, "a-page");
      });
    });

    it("uses wikiLinkClassName", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          wikiLinkClassName: "wiki_link",
          permalinks: ["a-page"],
        });

      var ast = processor.parse("[[A Page]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node) => {
        assert.equal(node.data.hProperties.className, "wiki_link");
      });
    });
  });

  context("open wiki links", () => {
    it("handles open wiki links", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        permalinks: [],
      });

      var ast = processor.parse("t[[\nt");
      ast = processor.runSync(ast);

      assert.ok(!select("wikiLink", ast));
    });

    it("handles open wiki links at end of file", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        permalinks: [],
      });

      var ast = processor.parse("t [[");
      ast = processor.runSync(ast);

      assert.ok(!select("wikiLink", ast));
    });

    it("handles open wiki links with partial data", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        permalinks: [],
      });

      var ast = processor.parse("t [[tt\nt");
      ast = processor.runSync(ast);

      assert.ok(!select("wikiLink", ast));
    });

    it("handles open wiki links with partial alias divider", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        aliasDivider: "::",
        permalinks: [],
      });

      var ast = processor.parse("[[t::\n");
      ast = processor.runSync(ast);

      assert.ok(!select("wikiLink", ast));
    });

    it("handles open wiki links with partial alias", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin, {
        permalinks: [],
      });

      var ast = processor.parse("[[t|\n");
      ast = processor.runSync(ast);

      assert.ok(!select("wikiLink", ast));
    });
  });

  it("exports the plugin with named exports", () => {
    assert.equal(wikiLinkPlugin, defaultWikiLinkPlugin);
  });
});
