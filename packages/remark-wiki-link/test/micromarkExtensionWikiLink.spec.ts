import { syntax } from "../src/lib/syntax";
import { html } from "../src/lib/html";
import { micromark } from "micromark";

describe("micromark-extension-wiki-link", () => {
  describe("pathFormat", () => {
    test("parses a wiki link 'relative' (default) pathFormat", () => {
      const serialized = micromark("[[../some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html()],
      });
      expect(serialized).toBe(
        '<p><a href="../some/folder/wiki-link" class="internal new">../some/folder/Wiki Link</a></p>'
      );
    });

    test("parses a wiki link 'absolute' pathFormat", () => {
      const serialized = micromark("[[/some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pathFormat: "absolute" })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/wiki-link" class="internal new">/some/folder/Wiki Link</a></p>'
      );
    });

    test("parses a wiki link 'obsidian-absolute' pathFormat", () => {
      const serialized = micromark("[[some/folder/Wiki Link]]", {
        extensions: [syntax()],
        htmlExtensions: [html({ pathFormat: "obsidian-absolute" })],
      });
      expect(serialized).toBe(
        '<p><a href="/some/folder/wiki-link" class="internal new">some/folder/Wiki Link</a></p>'
      );
    });

    test("parses a wiki link 'obsidian-short' pathFormat", () => {
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
});
