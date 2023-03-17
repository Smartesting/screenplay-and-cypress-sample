import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { GetToDoLists } from "../types";

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<IWorld>) => {
    return new Promise((resolve) => {
      cy.getToDoLists(resolve);
    });
  };
};
