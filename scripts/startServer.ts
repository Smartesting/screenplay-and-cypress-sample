import { startServer } from "../src/utils/startServer";

startServer({ hostname: "localhost", port: "3000" }).then(({ app, server }) => {
  process.on("SIGINT", () => {
    console.log("Shutting down server");
    app.close();
    server.close();
  });
});
