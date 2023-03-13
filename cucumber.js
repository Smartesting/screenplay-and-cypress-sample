const path = require("path");
const defaultOptions =
  "--require features/support/env.js --require 'features/**/*.ts' --publish-quiet";
const interactions = path.join(__dirname, "features", "support", "tasks");

module.exports = {
  default: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(interactions, "session"),
  })}`,

  http: `${defaultOptions} --world-parameters ${JSON.stringify({
    tasks: path.join(interactions, "session"),
    interactionMode: "http",
  })}`,
};
