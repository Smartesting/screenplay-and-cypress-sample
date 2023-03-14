import next, { NextApiRequest } from "next";
import { createServer } from "http";
import { parse } from "url";
import { Adapters, RequestWithAdapters } from "../types";
import { makeAdapters } from "./makeAdapters";

type ServerOptions = {
  hostname: string;
  port: string;
  adapters: Adapters;
};

const defaultOptions: ServerOptions = {
  hostname: "localhost",
  port: "1234",
  adapters: makeAdapters(),
};

export async function startServer(opts: Partial<ServerOptions>) {
  const { hostname, port, adapters } = {
    ...defaultOptions,
    ...opts,
  };

  const app = next({ port: 1234, hostname: "localhost", dev: true });
  const handle = app.getRequestHandler();

  await app.prepare();
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(
        makeRequestWithAdapters(req as NextApiRequest, adapters),
        res,
        parsedUrl
      );
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  server
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

  return { app, server };
}

function makeRequestWithAdapters(
  req: NextApiRequest,
  adapters: Adapters
): RequestWithAdapters {
  const withAdapters = req as RequestWithAdapters;
  withAdapters.adapters = adapters;
  return req as RequestWithAdapters;
}
