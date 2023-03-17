import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { CreateToDoList } from "../types";
import { ToDoListCreationForm } from "../../../../src/components/ToDoLists/CreateForm";
import { ToDoListCreationFormTestIds } from "../../../../src/components/ToDoLists/ToDoListCreationFormTestIds";

export const createToDoList: CreateToDoList = (userIdentification, name) => {
  return async (actor: Actor<IWorld>) => {
    const { client } = actor.world;
    const props = {
      client,
      userIdentification,
    };
    cy.mount(<ToDoListCreationForm {...props} />);
    cy.createToDoList(name);
  };
};
