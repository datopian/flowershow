// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: "http://localhost:3000/",
  },
};

module.exports = config;
