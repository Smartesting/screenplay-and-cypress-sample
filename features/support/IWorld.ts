import {
  IClient,
  AvailableUserIdentifications,
} from "../../src/client/IClient";
import { LoginResponse } from "../../src/core/user/login";
import { Adapters } from "../../src/types";
import { Authenticate, CreateToDoList, GetToDoLists } from "./tasks/types";

export interface IWorld {
  adapters: Adapters;
  client: IClient<AvailableUserIdentifications>;

  authenticate: Authenticate;
  createToDoList: CreateToDoList;
  getToDoLists: GetToDoLists;

  getAuthentication(response: LoginResponse): AvailableUserIdentifications;
}
