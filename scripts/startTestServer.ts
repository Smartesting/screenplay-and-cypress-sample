import { makeAdapters } from "../src/utils/makeAdapters";
import { startServer } from "../src/utils/startServer";

async function startTestServer() {
  const adapters = makeAdapters();
  await adapters.userManager.create("Harper@example.com", "Harper-secret");

  return startServer({ port: "3000", adapters });
}

startTestServer().then(({ app, server }) => {
  process.on("SIGINT", () => {
    console.log("Shutting down server");
    app.close();
    server.close();
  });
});
