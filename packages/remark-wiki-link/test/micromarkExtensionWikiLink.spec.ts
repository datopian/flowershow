import { syntax } from "../src/lib/syntax";
import { html } from "../src/lib/html";
import { micromark } from "micromark";

describe("micromark-extension-wiki-link", () => {
  describe("pathFormat", () => {
    test("parses a wiki link with 'raw' (default) pathFormat", () => {
      const serialized = micromark("[[../some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="../some/folder/wiki-link" class="internal new">../some/folder/Wiki Link</a></p>'
      );
    });

    test("parses a wiki link with 'obsidian-absolute' pathFormat", () => {
      const serialized = micromark("[[some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pathFormat: "obsidian-absolute" })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/wiki-link" class="internal new">some/folder/Wiki Link</a></p>'
      );
    });

    test("parses a wiki link with 'obsidian-short' pathFormat", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pathFormat: "obsidian-short" })],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="internal new">Wiki Link</a></p>'
      );
    });
  });

  describe("finding matching permalinks", () => {
    test("parses a wiki link that has a matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["wiki-link"] })],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="internal">Wiki Link</a></p>'
      );
    });

    test("parses a wiki link that has no matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: [] })],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="internal new">Wiki Link</a></p>'
      );
    });

    test("parses a shortened Obsidian wiki link that has a matching permalink", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            permalinks: ["/some/folder/wiki-link"],
            pathFormat: "obsidian-short",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/wiki-link" class="internal">Wiki Link</a></p>'
      );
    });
  });

  describe("aliases and headings", () => {
    test("parses a wiki link with heading", () => {
      const serialized = micromark("[[Wiki Link#Some Heading]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link#some-heading" class="internal new">Wiki Link#Some Heading</a></p>'
      );
    });

    test("parses a wiki link with heading and alias", () => {
      const serialized = micromark("[[Wiki Link#Some Heading|Alias]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link#some-heading" class="internal new">Alias</a></p>'
      );
    });

    test("parses a wiki link to a heading on the same page", () => {
      const serialized = micromark("[[#Some Heading]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        // '<p><a href="#some-heading" class="internal new">Some Heading</a></p>' // TODO: should this have internal class only?
        '<p><a href="#some-heading" class="internal new">Some Heading</a></p>'
      );
    });
  });

  describe("image embeds", () => {
    test("parses an image embed of supported file format", () => {
      const serialized = micromark("![[../some/folder/My Image.jpg]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><img src="../some/folder/My Image.jpg" alt="../some/folder/My Image.jpg" class="internal new" /></p>'
      );
    });

    test("parses an image embed of unsupported file format", () => {
      const serialized = micromark("![[../some/folder/My Image.xyz]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>![[../some/folder/My Image.xyz]]</p>");
    });

    test("parses an image embed with an alias", () => {
      const serialized = micromark(
        "![[../some/folder/My Image.jpg|My Image]]",
        {
          extensions: [syntax()],
          htmlExtensions: [html()],
        }
      );
      expect(serialized).toBe(
        '<p><img src="../some/folder/My Image.jpg" alt="My Image" class="internal new" /></p>'
      );
    });

    test("parses an image embed with alt text", () => {
      const serialized = micromark(
        "![[../some/folder/My Image.jpg|Alt Text]]",
        {
          extensions: [syntax()],
          htmlExtensions: [html()],
        }
      );
      expect(serialized).toBe(
        '<p><img src="../some/folder/My Image.jpg" alt="Alt Text" class="internal new" /></p>'
      );
    });

    test("parses a pdf embed", () => {
      const serialized = micromark("![[../some/folder/My Document.pdf]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><iframe width="100%" src="../some/folder/My Document.pdf#toolbar=0" class="internal new" /></p>'
      );
    });
  });

  describe("invalid wiki links", () => {
    test("doesn't parse a wiki link with two missing closing brackets", () => {
      const serialized = micromark("[[Wiki Link", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[[Wiki Link</p>");
    });

    test("doesn't parse a wiki link with one missing closing bracket", () => {
      const serialized = micromark("[[Wiki Link]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[[Wiki Link]</p>");
    });

    test("doesn't parse a wiki link with a missing opening bracket", () => {
      const serialized = micromark("[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[Wiki Link]]</p>");
    });

    test("doesn't parse a wiki link in single brackets", () => {
      const serialized = micromark("[Wiki Link]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe("<p>[Wiki Link]</p>");
    });
  });

  describe("other options", () => {
    test("parses a wiki link with a custom class", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [
          html({
            newClassName: "test-new",
            wikiLinkClassName: "test-wiki-link",
          }),
        ],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="test-wiki-link test-new">Wiki Link</a></p>'
      );
    });

    test("parses a wiki link with a custom divider", () => {
      const serialized = micromark("[[Wiki Link:Alias Name]]", {
        extensions: [syntax({ aliasDivider: ":" })],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="wiki-link" class="internal new">Alias Name</a></p>'
      );
    });

    test("parses a wiki link wit a custom page resolver", () => {
      const serialized = micromark("[[Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pageResolver: (page) => [`/blog/${page}`] })],
      });
      expect(serialized).toBe(
        '<p><a href="/blog/Wiki Link" class="internal new">Wiki Link</a></p>'
      );
    });
  });

  test("parses wiki links to index files", () => {
    const serialized = micromark("[[/some/folder/index]]", {
      extensions: [syntax()],
      htmlExtensions: [html()],
    });
    expect(serialized).toBe(
      '<p><a href="/some/folder" class="internal new">/some/folder/index</a></p>'
    );
  });

  describe("other", () => {
    test("parses a wiki link to some index page in a folder with no matching permalink", () => {
      const serialized = micromark("[[/some/folder/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder" class="internal new">/some/folder/index</a></p>'
      );
    });

    test("parses a wiki link to some index page in a folder with a matching permalink", () => {
      const serialized = micromark("[[/some/folder/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["/some/folder"] })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder" class="internal">/some/folder/index</a></p>'
      );
    });

    test("parses a wiki link to home index page with no matching permalink", () => {
      const serialized = micromark("[[/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="/" class="internal new">/index</a></p>'
      );
    });

    test("parses a wiki link to home index page with a matching permalink", () => {
      const serialized = micromark("[[/index]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ permalinks: ["/"] })],
      });
      expect(serialized).toBe('<p><a href="/" class="internal">/index</a></p>');
    });
  });
});
