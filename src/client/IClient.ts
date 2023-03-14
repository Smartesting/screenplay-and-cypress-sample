import { GetToDoListsResponse } from "../core/todo-lists/getToDoLists";
import { LoginResponse } from "../core/user/login";
import { User } from "../models/User";
import { JwtUserIdentification } from "../types";

export type AvailableUserIdentifications = JwtUserIdentification | User;

export interface IClient<
  UserIdentification extends AvailableUserIdentifications
> {
  login(email: string, password: string): Promise<LoginResponse>;

  createToDoList(
    userIdentification: UserIdentification,
    name: string
  ): Promise<unknown>;

  getToDoLists(
    userIdentification: UserIdentification
  ): Promise<GetToDoListsResponse>;
}
