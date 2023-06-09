import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { GetToDoLists } from "../types";
import { ToDoLists } from "../../../../src/components/ToDoLists/List";

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<IWorld>) => {
    return new Promise((resolve) => {
      const { client } = actor.world;
      const props = {
        client,
        userIdentification,
      };
      cy.mount(<ToDoLists {...props} />);
      cy.getToDoLists(resolve);
    });
  };
};
