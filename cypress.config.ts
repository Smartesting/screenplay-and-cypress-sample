import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "**/*.feature.cy.tsx",
    setupNodeEvents(on, config) {},
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/*.feature.e2e.cy.tsx",
    setupNodeEvents(on, config) {},
  },
});
