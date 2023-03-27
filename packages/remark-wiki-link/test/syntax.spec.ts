import { syntax } from "../src/lib/syntax";
import { html } from "../src/lib/html";
import { micromark } from "micromark";

describe("micromark-extension-wiki-link", () => {
  it("parses a wiki link that has a matching permalink", () => {
    const serialized = micromark("[[Wiki Link]]", {
      extensions: [syntax()],
      htmlExtensions: [html({ permalinks: ["wiki-link"] })],
    });
    expect(serialized).toBe(
      '<p><a href="/wiki-link" class="internal">Wiki Link</a></p>'
    );
  });
});
