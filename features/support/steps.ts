import { Given, When, Then } from "@cucumber/cucumber";
import { isAuthenticated } from "./steps/core/authentication";
import {
  createToDoList,
  assertToDoLists,
  listToDoLists,
} from "./steps/core/toDoLists";

Given("{actor} is authenticated", isAuthenticated);

When("{actor} creates a todo-list named {string}", createToDoList);

When("{actor} lists his/her todo-lists", listToDoLists);

Then("{actor} should have the following todo-lists:", assertToDoLists);
