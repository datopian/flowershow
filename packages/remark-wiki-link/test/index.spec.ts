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
        permalinks: ["/some/folder/real-page"],
      });

    let ast = processor.parse("[[Real Page#With Heading:Page Alias]]");
    ast = processor.runSync(ast);

    console.log((ast as any).children[0].children[0]);

    visit(ast, "wikiLink", (node: any) => {
      console.log(node);
      expect(node.exists).toEqual(true);
      expect(node.permalink).toEqual("real-page#with-heading");
      expect(node.alias).toEqual("Page Alias");
      expect(node.data.hName).toEqual("a");
      expect((node.data.hProperties as any).className).toEqual("internal new");
      expect((node.data.hProperties as any).href).toEqual(
        "/some/folder/real-page#with-heading"
      );
      expect((node.data.hChildren as any)[0].value).toEqual("Pag Alias");
    });
  });
});
