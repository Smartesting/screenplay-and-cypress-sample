import { NextApiRequest } from "next";
import { IAuthenticationManager } from "./adapters/Authentication/IAuthenticationManager";
import { IToDoListManager } from "./adapters/ToDoLists/IToDoListManager";
import { IUserManager } from "./adapters/User/IUserManager";

export type Adapters = {
  userManager: IUserManager;
  authenticationManager: IAuthenticationManager;
  toDoListManager: IToDoListManager;
};

export type JwtUserIdentification = {
  jwtToken: string;
  refreshToken: string;
};

export interface RequestWithAdapters extends NextApiRequest {
  adapters: Adapters;
}
