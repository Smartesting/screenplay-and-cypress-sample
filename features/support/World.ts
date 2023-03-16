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
import { LoginResponse } from "../../src/core/user/login";
import assert from "assert";
import { IWorld } from "./IWorld";

defineParameterType(ActorParameterType);

type Stop = () => Promise<void>;

export default class World extends ActorWorld implements IWorld {
  public readonly adapters: Adapters;
  public readonly client: IClient<AvailableUserIdentifications>;
  public stops: Stop[] = [];

  public readonly useHttp: boolean;

  public authenticate!: Authenticate;
  public createToDoList!: CreateToDoList;
  public getToDoLists!: GetToDoLists;

  constructor(props: IActorWorldOptions) {
    super(props);

    this.useHttp = this.parameters.interactionMode === "http";
    this.adapters = makeAdapters();

    this.client = this.useHttp
      ? new HttpClient("http://localhost:1234/")
      : new CoreClient(this.adapters);
  }

  public getAuthentication(
    response: LoginResponse
  ): AvailableUserIdentifications {
    if (this.useHttp) {
      assert(response.jwtIdentification);
      return response.jwtIdentification;
    }

    assert(response.user);
    return response.user;
  }
}

setWorldConstructor(World);

Before(async function (this: World) {
  if (this.useHttp) {
    const { app, server } = await startServer({
      hostname: "localhost",
      port: "1234",
      adapters: this.adapters,
    });

    this.stops.push(async () => {
      server.close();
    });

    this.stops.push(async () => {
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
  for (const stop of this.stops) {
    await stop();
  }
});
