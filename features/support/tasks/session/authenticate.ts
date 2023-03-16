import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { Authenticate } from "../types";

export const authenticate: Authenticate = (email, password) => {
  return async (actor: Actor<IWorld>) => {
    return actor.world.client.login(email, password);
  };
};
