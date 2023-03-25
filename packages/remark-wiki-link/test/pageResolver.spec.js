import assert from "assert";
import { pageResolver } from "../src/lib/pageResolver.js";

describe("pageResolver", () => {
  describe("with no permalinks passed", () => {
    it("should return sluggified path for absolute links", () => {
      const href = pageResolver()("/Some/Folder/Test File 1");
      assert.equal(href, "/some/folder/test-file-1");
    });

    it("should return sluggified path for absolute links with headings", () => {
      const href = pageResolver()("/Some/Folder/Test File 1#Some heading");
      assert.equal(href, "/some/folder/test-file-1#some-heading");
    });

    it("should return sluggified path for relative links", () => {
      const href = pageResolver()("../Folder/Test File 2");
      assert.equal(href, "../folder/test-file-2");
    });

    it("should return sluggified path for relative links with headings", () => {
      const href = pageResolver()("../Folder/Test File 2#Some heading");
      assert.equal(href, "../folder/test-file-2#some-heading");
    });

    describe("for links to embedded files", () => {
      it("should return unchanged path for absolute links", () => {
        const href = pageResolver()("/Some/Folder/Test File 1.jpg");
        assert.equal(href, "/Some/Folder/Test File 1.jpg");
      });

      it("should return unchanged path for relative links", () => {
        const href = pageResolver()("../Folder/Test File 1.jpg");
        assert.equal(href, "../Folder/Test File 1.jpg");
      });

      it("should return unchanged path for links to unsupported file types", () => {
        const href = pageResolver()("../Folder/Test File 1.xyz");
        assert.equal(href, "../Folder/Test File 1.xyz");
      });
    });
  });

  describe("with permalinks passed", () => {
    it("should return matching permalink for absolute path", () => {
      const href = pageResolver(["/some/folder/test-file-1"])(
        "/Some/Folder/Test File 1"
      );
      assert.equal(href, "/some/folder/test-file-1");
    });

    it("should return matching permalink for relative path", () => {
      const href = pageResolver(["../folder/test-file-2"])(
        "../Folder/Test File 2"
      );
      assert.equal(href, "../folder/test-file-2");
    });

    it("should return sluggified path if no matching permalink is found for absolute path", () => {
      const href = pageResolver(["/some/folder/test-file-2"])(
        "/Some/Folder/Test File 1"
      );
      assert.equal(href, "/some/folder/test-file-1");
    });

    it("should return sluggified path if no matching permalink is found for relative path", () => {
      const href = pageResolver(["../folder/test-file-1"])(
        "../Folder/Test File 2"
      );
      assert.equal(href, "../folder/test-file-2");
    });

    it("should return matching permalink for shortened Obsidian path", () => {
      const href = pageResolver(["/some/folder/test-file-1"])("Test File 1");
      assert.equal(href, "/some/folder/test-file-1");
    });

    it("should return matching permalink for shortened Obsidian path with heading", () => {
      const href = pageResolver(["/some/folder/test-file-1"])(
        "Test File 1#Some heading"
      );
      assert.equal(href, "/some/folder/test-file-1#some-heading");
    });

    it("should return sluggified path if no matching permalink is found for shortened Obsidian path", () => {
      const href = pageResolver(["/some/folder/test-file-2"])("Test File 1");
      assert.equal(href, "test-file-1");
    });

    it("should return sluggified path if no matching permalink is found for shortened Obsidian path with heading", () => {
      const href = pageResolver(["/some/folder/test-file-2"])(
        "Test File 1#Some heading"
      );
      assert.equal(href, "test-file-1#some-heading");
    });
  });
});
