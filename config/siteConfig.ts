import { defaultConfig } from "@portaljs/core";
import userConfig from "../content/config.mjs";
let preProcessFunction = (content) => content;

export async function getPreProcessFunction(preProcessFile) {
  if (preProcessFile) {
    try {
      const importedModule = await import(`../content/${preProcessFile}`);
      preProcessFunction = importedModule.default || importedModule;
    } catch (error) {
      console.error("Error importing pre-processing function:", error);
      // Define a default pre-processing function if the import fails
      preProcessFunction = (data) => {
        console.error("Default pre-processing function executed.");
        return data;
      };
    }
  }
  return preProcessFunction;
}

// TODO types
const siteConfig: any = {
  ...defaultConfig,
  ...userConfig,
  // prevent theme object overrides for
  // values not provided in userConfig
  theme: {
    ...defaultConfig.theme,
    ...userConfig?.theme,
  },
};

export default siteConfig;
