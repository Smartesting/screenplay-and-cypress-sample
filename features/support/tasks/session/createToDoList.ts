import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { CreateToDoList } from "../types";

export const createToDoList: CreateToDoList = (userIdentification, name) => {
  return async (actor: Actor<IWorld>) => {
    return actor.world.client.createToDoList(userIdentification, name);
  };
};
