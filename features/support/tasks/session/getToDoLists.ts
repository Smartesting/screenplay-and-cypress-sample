import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { GetToDoLists } from "../types";

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<IWorld>) => {
    return actor.world.client.getToDoLists(userIdentification);
  };
};
