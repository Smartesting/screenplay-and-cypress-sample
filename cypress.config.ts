import { defineConfig } from "cypress";
import { Adapters } from "./src/types";
import { startServer } from "./src/utils/startServer";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "**/*.feature.cy.tsx",
    setupNodeEvents(on, config) {
      on("task", {
        startServer(adapters: Adapters) {
          return startServer({
            hostname: "localhost",
            port: "1234",
            adapters: adapters,
          });
        },
      });
    },
  },

  e2e: {
    setupNodeEvents(on, config) {},
  },
});
