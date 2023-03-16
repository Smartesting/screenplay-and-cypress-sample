import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { CreateToDoList } from "../types";
import {
  IClient,
  AvailableUserIdentifications,
} from "../../../../src/client/IClient";
import { retryPromise } from "../../../../test/helpers/retryPromise";

export enum ToDoListCreationFormTestIds {
  COMPONENT = "ToDoListCreationForm",
  FIELD_NAME = "ToDoListCreationForm.Field.Name",
  ACTION_CREATE = "ToDoListCreationForm.Action.Create",
}

export const ToDoListCreationForm: React.FunctionComponent<{
  client: IClient<AvailableUserIdentifications>;
  userIdentification: AvailableUserIdentifications;
}> = ({ client, userIdentification }) => {
  const [name, setName] = React.useState("");
  function create(event: React.FormEvent) {
    event.preventDefault();

    client.createToDoList(userIdentification, name).then(() => {});
  }

  if (!userIdentification)
    return <span>You are not allowed to create a TODO list</span>;

  return (
    <form data-testid={ToDoListCreationFormTestIds.COMPONENT} onSubmit={create}>
      <label>
        Name:
        <input
          type="text"
          data-testid={ToDoListCreationFormTestIds.FIELD_NAME}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <input
        type="submit"
        data-testid={ToDoListCreationFormTestIds.ACTION_CREATE}
        value="Create"
      />
    </form>
  );
};

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
