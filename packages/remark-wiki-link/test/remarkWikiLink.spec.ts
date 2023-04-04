import markdown from "remark-parse";
import { unified } from "unified";
import { select } from "unist-util-select";
import { visit } from "unist-util-visit";
import { Node } from "unist";

import wikiLinkPlugin from "../src/lib/remarkWikiLink";

describe("remark-wiki-link", () => {
  describe("pathFormat", () => {
    test("parses a wiki link with 'raw' (default) pathFormat", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[../some/folder/Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("../some/folder/wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual(
          "../some/folder/wiki-link"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "../some/folder/Wiki Link"
        );
      });
    });

    test("parses a wiki link with 'obsidian-absolute' pathFormat", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, { pathFormat: "obsidian-absolute" });

      let ast = processor.parse("[[some/folder/Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("/some/folder/wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual(
          "/some/folder/wiki-link"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "some/folder/Wiki Link"
        );
      });
    });

    test("parses a wiki link with 'obsidian-short' pathFormat", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["/some/folder/wiki-link"],
          pathFormat: "obsidian-short",
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("/some/folder/wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual(
          "/some/folder/wiki-link"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });
  });

  describe("finding matching permalinks", () => {
    test("parses a wiki link that has a matching permalink", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["wiki-link"],
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("wiki-link");
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });

    test("parses a wiki link that has no matching permalink", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["some-other-link"],
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual("wiki-link");
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });

    test("parses a shortened Obsidian wiki link that has a matching permalink", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: ["/some/folder/wiki-link"],
          pathFormat: "obsidian-short",
        });

      let ast = processor.parse("[[Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("/some/folder/wiki-link");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual(
          "/some/folder/wiki-link"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual("Wiki Link");
      });
    });
  });

  describe("aliases and headings", () => {
    test("parses a wiki link with heading", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[Wiki Link#Some Heading]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("wiki-link#some-heading"); // TODO should this be "wiki-link" only?
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual(
          "wiki-link#some-heading"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "Wiki Link#Some Heading"
        );
      });
    });

    test("parses a wiki link with heading and alias", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[Wiki Link#Some Heading|Alias]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("wiki-link#some-heading"); // TODO should this be "wiki-link" only?
        expect(node.data?.alias).toEqual("Alias");
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual(
          "wiki-link#some-heading"
        );
        expect((node.data?.hChildren as any)[0].value).toEqual("Alias");
      });
    });

    test("parses a wiki link to a heading on the same page", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[#Some Heading]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        // expect(node.data?.exists).toEqual(false); // TODO: should this be true?
        // expect(node.data?.permalink).toEqual(""); // TODO: should this be null?
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual("#some-heading");
        expect((node.data?.hChildren as any)[0].value).toEqual("Some Heading");
      });
    });
  });

  describe("image embeds", () => {
    test("parses an image embed of supported file format", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("![[../some/folder/My Image.png]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.isEmbed).toEqual(true);
        expect(node.data?.target).toEqual("../some/folder/My Image.png");
        expect(node.data?.permalink).toEqual("../some/folder/My Image.png");
        expect(node.data?.hName).toEqual("img");
        expect((node.data?.hProperties as any).src).toEqual(
          "../some/folder/My Image.png"
        );
        expect((node.data?.hProperties as any).alt).toEqual(
          "../some/folder/My Image.png"
        );
      });
    });

    test("parses an image embed of unsupported file format", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("![[../some/folder/My Image.xyz]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.isEmbed).toEqual(true);
        expect(node.data?.target).toEqual("../some/folder/My Image.xyz");
        expect(node.data?.permalink).toEqual("../some/folder/My Image.xyz");
        expect(node.data?.hName).toEqual("p");
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "![[../some/folder/My Image.xyz]]"
        );
      });
    });

    test("parses an image embed with alt text", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("![[../some/folder/My Image.png|Alt Text]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.isEmbed).toEqual(true);
        expect(node.data?.target).toEqual("../some/folder/My Image.png");
        expect(node.data?.permalink).toEqual("../some/folder/My Image.png");
        expect(node.data?.hName).toEqual("img");
        expect((node.data?.hProperties as any).src).toEqual(
          "../some/folder/My Image.png"
        );
        expect((node.data?.hProperties as any).alt).toEqual("Alt Text");
      });
    });

    test("parses a pdf embed", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("![[../some/folder/My Document.pdf]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).not.toEqual(null);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.isEmbed).toEqual(true);
        expect(node.data?.target).toEqual("../some/folder/My Document.pdf");
        expect(node.data?.permalink).toEqual("../some/folder/My Document.pdf");
        expect(node.data?.hName).toEqual("iframe");
        expect((node.data?.hProperties as any).src).toEqual(
          "../some/folder/My Document.pdf#toolbar=0"
        );
      });
    });
  });

  describe("invalid wiki links", () => {
    test("doesn't parse a wiki link with two missing closing brackets", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[Wiki Link");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).toEqual(null);
    });

    test("doesn't parse a wiki link with one missing closing bracket", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[Wiki Link]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).toEqual(null);
    });

    test("doesn't parse a wiki link with a missing opening bracket", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("Wiki Link]]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).toEqual(null);
    });

    test("doesn't parse a wiki link in single brackets", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[Wiki Link]");
      ast = processor.runSync(ast);

      expect(select("wikiLink", ast)).toEqual(null);
    });
  });

  test("supports different config options", () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        aliasDivider: ":",
        pathFormat: "obsidian-short",
        permalinks: ["/some/folder/123/real-page"],
        pageResolver: (pageName: string) => [
          `123/${pageName.replace(/ /g, "-").toLowerCase()}`,
        ],
        wikiLinkClassName: "my-wiki-link-class",
        hrefTemplate: (permalink: string) => `https://my-site.com${permalink}`,
      });

    let ast = processor.parse("[[Real Page#Some Heading:Page Alias]]");
    ast = processor.runSync(ast);

    expect(select("wikiLink", ast)).not.toEqual(null);

    visit(ast, "wikiLink", (node: Node) => {
      expect(node.data?.exists).toEqual(true);
      expect(node.data?.permalink).toEqual("/some/folder/123/real-page");
      expect(node.data?.alias).toEqual("Page Alias");
      expect(node.data?.hName).toEqual("a");
      expect((node.data?.hProperties as any).className).toEqual(
        "my-wiki-link-class"
      );
      expect((node.data?.hProperties as any).href).toEqual(
        "https://my-site.com/some/folder/123/real-page#some-heading"
      );
      expect((node.data?.hChildren as any)[0].value).toEqual("Page Alias");
    });
  });

  test("parses wiki links to index files", () => {
    const processor = unified().use(markdown).use(wikiLinkPlugin);

    let ast = processor.parse("[[/some/folder/index]]");
    ast = processor.runSync(ast);

    expect(select("wikiLink", ast)).not.toEqual(null);

    visit(ast, "wikiLink", (node: Node) => {
      expect(node.data?.exists).toEqual(false);
      expect(node.data?.permalink).toEqual("/some/folder");
      expect(node.data?.alias).toEqual(null);
      expect(node.data?.hName).toEqual("a");
      expect((node.data?.hProperties as any).className).toEqual("internal new");
      expect((node.data?.hProperties as any).href).toEqual("/some/folder");
      expect((node.data?.hChildren as any)[0].value).toEqual(
        "/some/folder/index"
      );
    });
  });

  describe("other", () => {
    test("parses a wiki link to some index page in a folder with no matching permalink", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[/some/folder/index]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("/some/folder");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual("/some/folder");
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "/some/folder/index"
        );
      });
    });

    test("parses a wiki link to some index page in a folder with a matching permalink", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, { permalinks: ["/some/folder"] });

      let ast = processor.parse("[[/some/folder/index]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("/some/folder");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("/some/folder");
        expect((node.data?.hChildren as any)[0].value).toEqual(
          "/some/folder/index"
        );
      });
    });

    test("parses a wiki link to home index page with no matching permalink", () => {
      const processor = unified().use(markdown).use(wikiLinkPlugin);

      let ast = processor.parse("[[/index]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(false);
        expect(node.data?.permalink).toEqual("/");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual(
          "internal new"
        );
        expect((node.data?.hProperties as any).href).toEqual("/");
        expect((node.data?.hChildren as any)[0].value).toEqual("/index");
      });
    });

    test("parses a wiki link to home index page with a matching permalink", () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, { permalinks: ["/"] });

      let ast = processor.parse("[[/index]]");
      ast = processor.runSync(ast);

      visit(ast, "wikiLink", (node: Node) => {
        expect(node.data?.exists).toEqual(true);
        expect(node.data?.permalink).toEqual("/");
        expect(node.data?.alias).toEqual(null);
        expect(node.data?.hName).toEqual("a");
        expect((node.data?.hProperties as any).className).toEqual("internal");
        expect((node.data?.hProperties as any).href).toEqual("/");
        expect((node.data?.hChildren as any)[0].value).toEqual("/index");
      });
    });
  });
});
