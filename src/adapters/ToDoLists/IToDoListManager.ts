import { ToDoList } from "../../models/ToDoList";
import { User } from "../../models/User";

export interface IToDoListManager {
  create(name: string, owner: User): Promise<ToDoList>;

  list(owner: User): Promise<ReadonlyArray<ToDoList>>;
}
