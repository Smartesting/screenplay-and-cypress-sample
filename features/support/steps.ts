import { DataTable, Given, When, Then } from "@cucumber/cucumber";
import { Actor } from "@cucumber/screenplay";
import { ToDoList } from "../../src/models/ToDoList";
import { JwtUserIdentification } from "../../src/types";
import World from "./World";
import assert from "assert";
import { AvailableUserIdentifications } from "../../src/client/IClient";

Given(
  "{actor} is authenticated",
  async function (this: World, actor: Actor<World>) {
    const email = `${actor.name}@example.com`;
    const password = `${actor.name}-secret`;
    this.adapters.userManager.create(email, password);

    const { user, error } = await actor.attemptsTo(
      this.authenticate(email, password)
    );
    if (error)
      throw new Error(
        `Unable to authenticate ${actor.name}, got error: ${error}`
      );

    actor.remember("userIdentification", user);
  }
);

When(
  "{actor} creates a todo-list named {string}",
  async function (this: World, actor: Actor<World>, name: string) {
    const userIdentification: AvailableUserIdentifications =
      actor.recall("userIdentification");

    await actor.attemptsTo(this.createToDoList(userIdentification, name));
    const { toDoLists } = await actor.attemptsTo(
      this.getToDoLists(userIdentification)
    );

    actor.remember("toDoLists", toDoLists);
  }
);

Then(
  "{actor} should have the following todo-lists:",
  function (actor: Actor<World>, dataTable: DataTable) {
    const toDoLists: ReadonlyArray<ToDoList> = actor.recall("toDoLists");

    const expectedNames = dataTable
      .hashes()
      .map((row: { name: string }) => row.name);
    const toDoListsNames = toDoLists.map((toDoList) => toDoList.name);

    assert.deepStrictEqual(toDoListsNames, expectedNames);
  }
);
