import { createToDoList } from "../core/todo-lists/create";
import {
  getToDoLists,
  GetToDoListsResponse,
} from "../core/todo-lists/getToDoLists";
import { login, LoginResponse } from "../core/user/login";
import { User } from "../models/User";
import { Adapters } from "../types";
import { IClient } from "./IClient";

export class CoreClient implements IClient<User> {
  constructor(private readonly adapters: Adapters) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    return login(email, password, this.adapters);
  }

  async createToDoList(
    userIdentification: User,
    name: string
  ): Promise<unknown> {
    return createToDoList(userIdentification, name, this.adapters);
  }

  async getToDoLists(userIdentification: User): Promise<GetToDoListsResponse> {
    return getToDoLists(userIdentification, this.adapters);
  }
}
