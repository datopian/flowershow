import markdown from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Node } from "unist";

import wikiLinkPlugin from "../src/lib/remarkWikiLink";

describe("remark-wiki-link", () => {
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

    let ast = processor.parse("[[Real Page#With Heading:Page Alias]]");
    ast = processor.runSync(ast);

    visit(ast, "wikiLink", (node: Node) => {
      expect(node.data.exists).toEqual(true);
      expect(node.data.permalink).toEqual("/some/folder/123/real-page");
      expect(node.data.alias).toEqual("Page Alias");
      expect(node.data.hName).toEqual("a");
      expect((node.data.hProperties as any).className).toEqual(
        "my-wiki-link-class"
      );
      expect((node.data.hProperties as any).href).toEqual(
        "https://my-site.com/some/folder/123/real-page#with-heading"
      );
      expect((node.data.hChildren as any)[0].value).toEqual("Page Alias");
    });
  });
});
