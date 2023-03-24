import assert from "assert";
import {
  isEmbeddedFileLink,
  supportedFileFormats,
} from "../src/lib/isEmbeddedFileLink.js";

describe("isEmbeddedFileLink", () => {
  it("should return [false, null] for a path with no file extension", () => {
    const filePath = "/content/some/markdown/page";
    assert.deepEqual(isEmbeddedFileLink(filePath), [false, null]);
  });

  it("should return [true, true] for a path with supported file extension", () => {
    supportedFileFormats.forEach((fileFormat) => {
      const filePath = `image.${fileFormat}`;
      assert.deepEqual(isEmbeddedFileLink(filePath), [true, true]);
    });
  });

  it("should return [true, false] for a path with unsupported file extension", () => {
    const filePath = "image.xyz";
    assert.deepEqual(isEmbeddedFileLink(filePath), [true, false]);
  });

  it("should work with absolute paths", () => {
    const filePath = "/some/folder/image.png";
    assert.deepEqual(isEmbeddedFileLink(filePath), [true, true]);
  });

  it("should work with relative paths", () => {
    const filePath = "../some/folder/image.png";
    assert.deepEqual(isEmbeddedFileLink(filePath), [true, true]);
  });
});
