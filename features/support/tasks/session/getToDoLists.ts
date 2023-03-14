import { Actor } from "@cucumber/screenplay";
import World from "../../World";
import { GetToDoLists } from "../types";

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<World>) => {
    return actor.world.client.getToDoLists(userIdentification);
  };
};
