import React from "react";

import { IClient, AvailableUserIdentifications } from "../../client/IClient";
import { ToDoList } from "../../models/ToDoList";

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
      {toDoLists.map((toDoList, index) => (
        <li key={`key-${index}`}>{toDoList.name}</li>
      ))}
    </ul>
  );
};
