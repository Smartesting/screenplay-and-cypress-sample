import React from "react";

import { IClient, AvailableUserIdentifications } from "../../client/IClient";

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
