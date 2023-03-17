import { CoreClient } from "../src/client/CoreClient";
import { makeAdapters } from "../src/utils/makeAdapters";
import { createToDoListScenario } from "./createToDoListScenario";
import { IWorld } from "./support/IWorld";
import { authenticate } from "./support/tasks/browser/authenticate";
import { createToDoList as createToDoListTask } from "./support/tasks/browser/createToDoList";
import { getToDoLists as getToDoListsTask } from "./support/tasks/browser/getToDoLists";

describe("create-list.feature", () => {
  it("Creating a new todo-list", async () => {
    const adapters = makeAdapters();

    const world: IWorld = {
      adapters,
      client: new CoreClient(adapters),
      authenticate,
      createToDoList: createToDoListTask,
      getToDoLists: getToDoListsTask,

      getAuthentication: (response) => {
        return response.user!;
      },
    };

    createToDoListScenario(world);
  });
});
