import { ArrayMultimap } from "@teppeis/multimaps";
import { ToDoList } from "../../models/ToDoList";
import { User } from "../../models/User";
import { IToDoListManager } from "./IToDoListManager";
import { v4 as uuidv4 } from "uuid";

export class MemoryToDoListManager implements IToDoListManager {
  private readonly toDoListByUser = new ArrayMultimap<User, ToDoList>();

  async create(name: string, owner: User): Promise<ToDoList> {
    const toDoList = { name, id: uuidv4() };
    this.toDoListByUser.put(owner, toDoList);

    return toDoList;
  }

  async list(owner: User): Promise<readonly ToDoList[]> {
    return this.toDoListByUser.get(owner);
  }
}
