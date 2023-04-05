import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  displayName: "markdowndb",
  preset: "../../jest.preset.js",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!remark-parse)"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "(.+)\\.js$": "$1",
  },
};

export default jestConfig;
