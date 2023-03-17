import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { GetToDoLists } from "../types";
import { ToDoList } from "../../../../src/models/ToDoList";
import {
  ToDoLists,
  ToDoListstestIds,
} from "../../../../src/components/ToDoLists/List";

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<IWorld>) => {
    return new Promise((resolve) => {
      const { client } = actor.world;
      const props = {
        client,
        userIdentification,
      };
      cy.mount(<ToDoLists {...props} />);
      cy.get(`[data-testid="${ToDoListstestIds.TODOLISTS}"]`)
        .children()
        .then((toDoListsItems) => {
          const toDoLists: ToDoList[] = [];
          toDoListsItems.each((_, li) => {
            toDoLists.push({
              id: "123",
              name: li.textContent ?? "",
            });
          });
          resolve({ toDoLists });
        });
    });
  };
};
