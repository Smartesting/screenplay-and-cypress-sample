import { DataTable, Given, When, Then } from "@cucumber/cucumber";
import { Actor } from "@cucumber/screenplay";
import World from "./World";

Given("{actor} is authenticated", function (actor: Actor<World>) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When(
  "{actor} creates a todo-list named {string}",
  function (actor: Actor<World>, name: string) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then(
  "{actor} should have the following todo-lists:",
  function (actor: Actor<World>, dataTable: DataTable) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);
