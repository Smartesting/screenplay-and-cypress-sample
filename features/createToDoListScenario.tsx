import Actor from "@cucumber/screenplay/dist/src/Actor";
import { IWorld } from "./support/IWorld";
import { isAuthenticated } from "./support/steps/core/authentication";
import {
  assertToDoLists,
  createToDoList,
  listToDoLists,
} from "./support/steps/core/toDoLists";

export function createToDoListScenario(world: IWorld) {
  const actor = new Actor(world, "Harper");
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
}
