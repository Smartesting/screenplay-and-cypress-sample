process.env.NODE_ENV = "cucumber";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("ts-node").register({
  project: __dirname + "/../../tsconfig.json",
  transpileOnly: true,
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("source-map-support/register");
