import { Actor } from "@cucumber/screenplay";
import { AvailableUserIdentifications } from "../../../../src/client/IClient";
import { ToDoList } from "../../../../src/models/ToDoList";
import { IWorld } from "../../IWorld";
import assert from "assert";

export async function createToDoList(
  this: IWorld,
  actor: Actor<IWorld>,
  name: string
) {
  const userIdentification: AvailableUserIdentifications =
    actor.recall("userIdentification");

  return actor.attemptsTo(this.createToDoList(userIdentification, name));
}

export async function listToDoLists(this: IWorld, actor: Actor<IWorld>) {
  const userIdentification: AvailableUserIdentifications =
    actor.recall("userIdentification");

  return actor
    .attemptsTo(this.getToDoLists(userIdentification))
    .then(({ toDoLists }) => actor.remember("toDoLists", toDoLists));
}

export function assertToDoLists(
  actor: Actor<IWorld>,
  dataTable: { hashes: () => { name: string }[] }
) {
  const toDoLists: ReadonlyArray<ToDoList> = actor.recall("toDoLists") ?? [];

  const expectedNames = dataTable
    .hashes()
    .map((row: { name: string }) => row.name);
  const toDoListsNames = toDoLists.map((toDoList) => toDoList.name);

  assert.deepStrictEqual(toDoListsNames, expectedNames);
}
