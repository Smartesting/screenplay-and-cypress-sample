import Actor from "@cucumber/screenplay/dist/src/Actor";
import { IAuthenticationManager } from "../src/adapters/Authentication/IAuthenticationManager";
import { CoreClient } from "../src/client/CoreClient";
import { User } from "../src/models/User";
import { makeAdapters } from "../src/utils/makeAdapters";
import { IWorld } from "./support/IWorld";
import { isAuthenticated } from "./support/steps/core/authentication";
import {
  assertToDoLists,
  createToDoList,
  listToDoLists,
} from "./support/steps/core/toDoLists";
import { authenticate } from "./support/tasks/dom/authenticate";
import { createToDoList as createToDoListTask } from "./support/tasks/dom/createToDoList";
import { getToDoLists as getToDoListsTask } from "./support/tasks/dom/getToDoLists";

describe("create-list.feature", () => {
  it("Creating a new todo-list", async () => {
    const authenticationManager: IAuthenticationManager = {
      getJWT: function (user: User): string {
        return `${user.email}`;
      },

      updateRefreshToken: async function (user: User): Promise<string> {
        return "refresh-token";
      },

      userEmailFromJwt: async function (jwtToken: string): Promise<string> {
        return jwtToken;
      },
    };
    const adapters = makeAdapters({
      authenticationManager,
    });

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

    const actor = new Actor(world, "bob");
    const datatable = {
      hashes: () => [{ name: "Morning routine" }],
    };

    cy.wrap(isAuthenticated.bind(world)(actor)).then(() => {
      cy.wrap(createToDoList.bind(world)(actor, "Morning routine")).then(() => {
        cy.wrap(listToDoLists.bind(world)(actor)).then(() => {
          cy.wrap(assertToDoLists.bind(world)(actor, datatable));
        });
      });
    });
  });
});
