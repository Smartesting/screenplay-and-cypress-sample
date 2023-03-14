import {
  Before,
  After,
  defineParameterType,
  setWorldConstructor,
} from "@cucumber/cucumber";
import {
  ActorParameterType,
  ActorWorld,
  IActorWorldOptions,
} from "@cucumber/screenplay";
import { CoreClient } from "../../src/client/CoreClient";
import { HttpClient } from "../../src/client/HttpClient";
import {
  AvailableUserIdentifications,
  IClient,
} from "../../src/client/IClient";
import { Adapters } from "../../src/types";
import { retryPromise } from "../../test/helpers/retryPromise";
import { Authenticate, CreateToDoList, GetToDoLists } from "./tasks/types";
import fetch from "node-fetch";
import { startServer } from "../../src/utils/startServer";
import { makeAdapters } from "../../src/utils/makeAdapters";
import { streamToString } from "../../src/utils/streamToString";

defineParameterType(ActorParameterType);

type Stop = () => Promise<void>;

export default class World extends ActorWorld {
  public readonly adapters: Adapters;
  public readonly client: IClient<AvailableUserIdentifications>;
  public stops: Stop[] = [];

  public authenticate!: Authenticate;
  public createToDoList!: CreateToDoList;
  public getToDoLists!: GetToDoLists;

  constructor(props: IActorWorldOptions) {
    super(props);

    this.adapters = makeAdapters();

    this.client = this.useHttp()
      ? new HttpClient("http://localhost:1234/")
      : new CoreClient(this.adapters);
  }

  public useHttp() {
    return this.parameters.interactionMode === "http";
  }
}

setWorldConstructor(World);

Before(async function (this: World) {
  if (this.useHttp()) {
    const { app, server } = await startServer({
      hostname: "localhost",
      port: "1234",
      adapters: this.adapters,
    });
    this.stops.push(async () => {
      console.log("Shutting down server");
      await server.close();
    });
    this.stops.push(async () => {
      console.log("Shutting down app");
      return app.close();
    });

    await retryPromise(
      async () => {
        return fetch("http://localhost:1234/");
      },
      { retryDelay: 100, timeout: 5000 }
    );
  }
});

After(async function (this: World) {
  await Promise.all(this.stops);
});
