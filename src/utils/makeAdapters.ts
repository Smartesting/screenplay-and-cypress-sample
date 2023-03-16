import { MemoryAuthenticationManager } from "../adapters/Authentication/MemoryAuthenticationManager";
import { MemoryToDoListManager } from "../adapters/ToDoLists/MemoryToDoListManager";
import { MemoryUsermanager } from "../adapters/User/MemoryUserManager";
import { Adapters } from "../types";

export function makeAdapters(adapters: Partial<Adapters> = {}): Adapters {
  const defaultAdapters: Adapters = {
    userManager: new MemoryUsermanager(),
    authenticationManager: new MemoryAuthenticationManager(),
    toDoListManager: new MemoryToDoListManager(),
  };

  return {
    ...defaultAdapters,
    ...adapters,
  };
}
