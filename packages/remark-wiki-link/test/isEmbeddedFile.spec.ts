import {
  isEmbeddedFileLink,
  supportedFileFormats,
} from "../src/lib/isEmbeddedFileLink";

describe("isEmbeddedFileLink", () => {
  test("should return [false, null] for a path with no file extension", () => {
    const filePath = "/content/some/markdown/page";
    expect(isEmbeddedFileLink(filePath)).toStrictEqual([false, null, null]);
  });

  test("should return [true, true] for a path with supported file extension", () => {
    supportedFileFormats.forEach((fileFormat) => {
      const filePath = `image.${fileFormat}`;
      expect(isEmbeddedFileLink(filePath)).toStrictEqual([
        true,
        true,
        fileFormat,
      ]);
    });
  });

  test("should return [true, false] for a path with unsupported file extension", () => {
    const filePath = "image.xyz";
    expect(isEmbeddedFileLink(filePath)).toStrictEqual([true, false, "xyz"]);
  });

  test("should work with absolute paths", () => {
    const filePath = "/some/folder/image.png";
    expect(isEmbeddedFileLink(filePath)).toStrictEqual([true, true, "png"]);
  });

  test("should work with relative paths", () => {
    const filePath = "../some/folder/image.png";
    expect(isEmbeddedFileLink(filePath)).toStrictEqual([true, true, "png"]);
  });
});
