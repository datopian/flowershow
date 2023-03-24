import assert from "assert";
import { isMediaFile, supportedFileFormats } from "../src/lib/isMediaFile.js";

describe("isMediaFile", () => {
  it("should return true for a supported file format", () => {
    supportedFileFormats.forEach((fileFormat) => {
      const filePath = `image.${fileFormat}`;
      assert.equal(isMediaFile(filePath)[0], true);
    });
  });

  it("should return false for an unsupported file format", () => {
    const filePath = "image.xyz";
    assert.equal(isMediaFile(filePath)[0], false);
  });

  it("should return true for a supported file format with relative path", () => {
    const filePath = "../../image.png";
    assert.equal(isMediaFile(filePath)[0], true);
  });

  it("should return true for a supported file format with absolute path", () => {
    const filePath = "/home/user/image.png";
    assert.equal(isMediaFile(filePath)[0], true);
  });
});
