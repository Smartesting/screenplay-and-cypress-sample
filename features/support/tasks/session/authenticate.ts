import { Actor } from "@cucumber/screenplay";
import { login } from "../../../../src/core/user/login";
import World from "../../World";
import { Authenticate } from "../types";

export const authenticate: Authenticate = (email, password) => {
  return async (actor: Actor<World>) => {
    return actor.world.client.login(email, password);
  };
};
