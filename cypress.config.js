require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = process.env;
      return config;
    },
    // defaultCommandTimeout: 10000,
    baseUrl: `http://localhost:3001`,
    experimentalRunAllSpecs: true,
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
