import React from "react";

import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { GetToDoLists } from "../types";
import {
  IClient,
  AvailableUserIdentifications,
} from "../../../../src/client/IClient";
import { ToDoList } from "../../../../src/models/ToDoList";
import { retryPromise } from "../../../../test/helpers/retryPromise";

export enum ToDoListstestIds {
  COMPONENT = "ToDoLists",
  PLACEHOLDER = "ToDoLists.PlaceHolder",
  TODOLISTS = "ToDoLists.ToDoLists",
}

export const ToDoLists: React.FunctionComponent<{
  client: IClient<AvailableUserIdentifications>;
  userIdentification: AvailableUserIdentifications;
}> = ({ client, userIdentification }) => {
  const [toDoLists, setToDoLists] = React.useState<ReadonlyArray<ToDoList>>([]);
  React.useEffect(() => {
    client
      .getToDoLists(userIdentification)
      .then(({ toDoLists }) => setToDoLists(toDoLists));
  }, [client]);

  if (toDoLists.length === 0)
    return (
      <span data-testid={ToDoListstestIds.PLACEHOLDER}>
        Loading todolists...
      </span>
    );

  return (
    <ul data-testid={ToDoListstestIds.TODOLISTS}>
      {toDoLists.map((toDoList) => (
        <li>{toDoList.name}</li>
      ))}
    </ul>
  );
};

export const getToDoLists: GetToDoLists = (userIdentification) => {
  return async (actor: Actor<IWorld>) => {
    const { client } = actor.world;
    const userIdentificationPromise = retryPromise(
      () =>
        new Promise<void>((resolve, reject) => {
          if (actor.recall("userIdentification")) return resolve();
          reject();
        }),
      { timeout: 5000 }
    );

    cy.wrap(userIdentificationPromise).then(() => {
      const props = {
        client,
        userIdentification: actor.recall("userIdentification"),
      };
      cy.mount(<ToDoLists {...props} />);
      cy.get(`[data-testid="${ToDoListstestIds.TODOLISTS}"]`).then(
        (toDoLists) => {}
      );
    });

    return [];
  };
};
