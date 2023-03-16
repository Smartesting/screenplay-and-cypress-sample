import { PromiseAction } from "@cucumber/screenplay";
import { AvailableUserIdentifications } from "../../../src/client/IClient";
import { GetToDoListsResponse } from "../../../src/core/todo-lists/getToDoLists";
import { LoginResponse } from "../../../src/core/user/login";
import { IWorld } from "../IWorld";

export type Authenticate = (
  email: string,
  password: string
) => PromiseAction<LoginResponse, IWorld>;

export type CreateToDoList = (
  userIdentification: AvailableUserIdentifications,
  name: string
) => PromiseAction<unknown, IWorld>;

export type GetToDoLists = (
  userIdentification: AvailableUserIdentifications
) => PromiseAction<GetToDoListsResponse, IWorld>;
