import { ToDoList } from "../../models/ToDoList";
import { User } from "../../models/User";
import { Adapters } from "../../types";

export type GetToDoListsResponse = {
  toDoLists: ReadonlyArray<ToDoList>;
};

export async function getToDoLists(
  user: User,
  { toDoListManager }: Adapters
): Promise<GetToDoListsResponse> {
  const toDoLists = await toDoListManager.list(user);

  return { toDoLists };
}
