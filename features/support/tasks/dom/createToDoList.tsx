import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { CreateToDoList } from "../types";
import {
  ToDoListCreationForm,
  ToDoListCreationFormTestIds,
} from "../../../../src/components/ToDoLists/CreateForm";

export const createToDoList: CreateToDoList = (userIdentification, name) => {
  return async (actor: Actor<IWorld>) => {
    const { client } = actor.world;
    const props = {
      client,
      userIdentification,
    };
    cy.mount(<ToDoListCreationForm {...props} />);
    cy.get(`[data-testid="${ToDoListCreationFormTestIds.FIELD_NAME}"]`).type(
      name
    );
    cy.get(
      `[data-testid="${ToDoListCreationFormTestIds.ACTION_CREATE}"]`
    ).click();
  };
};
