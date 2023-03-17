/// <reference types="cypress" />

import { LogintestIds } from "../../src/components/Authentication/LogintestIds";
import { ToDoListCreationFormTestIds } from "../../src/components/ToDoLists/ToDoListCreationFormTestIds";
import { ToDoListsTestIds } from "../../src/components/ToDoLists/ToDoListsTestIds";
import { GetToDoListsResponse } from "../../src/core/todo-lists/getToDoLists";
import { ToDoList } from "../../src/models/ToDoList";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get(`[data-testid="${LogintestIds.FIELD_EMAIL}"]`).type(email);
  cy.get(`[data-testid="${LogintestIds.FIELD_PASSWORD}"]`).type(password);
  cy.get(`[data-testid="${LogintestIds.ACTION_LOGIN}"]`).click();
});

Cypress.Commands.add("createToDoList", (name: string) => {
  cy.get(`[data-testid="${ToDoListCreationFormTestIds.FIELD_NAME}"]`).type(
    name
  );
  cy.get(
    `[data-testid="${ToDoListCreationFormTestIds.ACTION_CREATE}"]`
  ).click();
});

Cypress.Commands.add(
  "getToDoLists",
  (callback: (response: GetToDoListsResponse) => void) => {
    cy.get(`[data-testid="${ToDoListsTestIds.TODOLISTS}"]`)
      .children()
      .then((toDoListsItems) => {
        const toDoLists: ToDoList[] = [];
        toDoListsItems.each((_, li) => {
          toDoLists.push({
            id: "123",
            name: li.textContent ?? "",
          });
        });
        callback({ toDoLists });
      });
  }
);

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createToDoList(name: string): Chainable<void>;
      getToDoLists(
        callback: (response: GetToDoListsResponse) => void
      ): Chainable<void>;
    }
  }
}
