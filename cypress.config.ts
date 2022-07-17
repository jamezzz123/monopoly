import { defineConfig } from "cypress";
import pluginsFile from "./tests/e2e/plugins/index.js";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: "tests/e2e/support/index.js",
    specPattern: "tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents() {
      // implement node event listeners here
      pluginsFile();
    },
  },
});
