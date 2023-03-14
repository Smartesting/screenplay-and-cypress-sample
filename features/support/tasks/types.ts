import { PromiseAction } from "@cucumber/screenplay";
import { AvailableUserIdentifications } from "../../../src/client/IClient";
import { GetToDoListsResponse } from "../../../src/core/todo-lists/getToDoLists";
import { LoginResponse } from "../../../src/core/user/login";
import World from "../World";

export type Authenticate = (
  email: string,
  password: string
) => PromiseAction<LoginResponse, World>;

export type CreateToDoList = (
  userIdentification: AvailableUserIdentifications,
  name: string
) => PromiseAction<unknown, World>;

export type GetToDoLists = (
  userIdentification: AvailableUserIdentifications
) => PromiseAction<GetToDoListsResponse, World>;
