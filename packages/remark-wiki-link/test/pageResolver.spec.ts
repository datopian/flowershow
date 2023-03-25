import { pageResolver } from "../src/lib/pageResolver";

describe("pageResolver", () => {
  describe("with no permalinks passed", () => {
    test("should return sluggified path for absolute links", () => {
      const href = pageResolver()("/Some/Folder/Test File 1");
      expect(href).toEqual("/some/folder/test-file-1");
    });

    test("should return sluggified path for absolute links with headings", () => {
      const href = pageResolver()("/Some/Folder/Test File 1#Some heading");
      expect(href).toEqual("/some/folder/test-file-1#some-heading");
    });

    test("should return sluggified path for relative links", () => {
      const href = pageResolver()("../Folder/Test File 2");
      expect(href).toEqual("../folder/test-file-2");
    });

    test("should return sluggified path for relative links with headings", () => {
      const href = pageResolver()("../Folder/Test File 2#Some heading");
      expect(href).toEqual("../folder/test-file-2#some-heading");
    });

    describe("for links to embedded files", () => {
      test("should return unchanged path for absolute links", () => {
        const href = pageResolver()("/Some/Folder/Test File 1.jpg");
        expect(href).toEqual("/Some/Folder/Test File 1.jpg");
      });

      test("should return unchanged path for relative links", () => {
        const href = pageResolver()("../Folder/Test File 1.jpg");
        expect(href).toEqual("../Folder/Test File 1.jpg");
      });

      test("should return unchanged path for links to unsupported file types", () => {
        const href = pageResolver()("../Folder/Test File 1.xyz");
        expect(href).toEqual("../Folder/Test File 1.xyz");
      });
    });
  });

  describe("with permalinks passed", () => {
    test("should return matching permalink for absolute path", () => {
      const href = pageResolver(["/some/folder/test-file-1"])(
        "/Some/Folder/Test File 1"
      );
      expect(href).toEqual("/some/folder/test-file-1");
    });

    test("should return matching permalink for relative path", () => {
      const href = pageResolver(["../folder/test-file-2"])(
        "../Folder/Test File 2"
      );
      expect(href).toEqual("../folder/test-file-2");
    });

    test("should return sluggified path if no matching permalink is found for absolute path", () => {
      const href = pageResolver(["/some/folder/test-file-2"])(
        "/Some/Folder/Test File 1"
      );
      expect(href).toEqual("/some/folder/test-file-1");
    });

    test("should return sluggified path if no matching permalink is found for relative path", () => {
      const href = pageResolver(["../folder/test-file-1"])(
        "../Folder/Test File 2"
      );
      expect(href).toEqual("../folder/test-file-2");
    });

    test("should return matching permalink for shortened Obsidian path", () => {
      const href = pageResolver(["/some/folder/test-file-1"])("Test File 1");
      expect(href).toEqual("/some/folder/test-file-1");
    });

    test("should return matching permalink for shortened Obsidian path with heading", () => {
      const href = pageResolver(["/some/folder/test-file-1"])(
        "Test File 1#Some heading"
      );
      expect(href).toEqual("/some/folder/test-file-1#some-heading");
    });

    test("should return sluggified path if no matching permalink is found for shortened Obsidian path", () => {
      const href = pageResolver(["/some/folder/test-file-2"])("Test File 1");
      expect(href).toEqual("test-file-1");
    });

    test("should return sluggified path if no matching permalink is found for shortened Obsidian path with heading", () => {
      const href = pageResolver(["/some/folder/test-file-2"])(
        "Test File 1#Some heading"
      );
      expect(href).toEqual("test-file-1#some-heading");
    });
  });
});
