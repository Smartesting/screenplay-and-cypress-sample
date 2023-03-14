import { Actor } from "@cucumber/screenplay";
import World from "../../World";
import { CreateToDoList } from "../types";

export const createToDoList: CreateToDoList = (userIdentification, name) => {
  return async (actor: Actor<World>) => {
    return actor.world.client.createToDoList(userIdentification, name);
  };
};
