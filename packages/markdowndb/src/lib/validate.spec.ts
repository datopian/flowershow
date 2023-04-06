import { areUniqueObjectsByKey } from "./validate";

describe("areUniqueObjectsByKey", () => {
  test("should return true if all objects have unique values for the given key", () => {
    const objects = [
      { id: "1", name: "one" },
      { id: "2", name: "two" },
      { id: "3", name: "three" },
    ];
    expect(areUniqueObjectsByKey(objects, "id")).toBe(true);
  });

  test("should return false if any objects have duplicate values for the given key", () => {
    const objects = [
      { id: "1", name: "one" },
      { id: "2", name: "two" },
      { id: "2", name: "three" },
    ];
    expect(areUniqueObjectsByKey(objects, "id")).toBe(false);
  });
});
