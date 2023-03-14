import { ToDoList } from "../../models/ToDoList";
import { User } from "../../models/User";
import { Adapters } from "../../types";

export type CreateToDoListResponse = {
  toDoList: ToDoList;
};

export async function createToDoList(
  user: User,
  name: string,
  { toDoListManager }: Adapters
): Promise<CreateToDoListResponse> {
  const toDoList = await toDoListManager.create(name, user);

  return { toDoList };
}
