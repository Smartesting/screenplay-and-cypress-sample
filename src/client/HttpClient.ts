import { GetToDoListsResponse } from "../core/todo-lists/getToDoLists";
import { LoginResponse } from "../core/user/login";
import { JwtUserIdentification } from "../types";
import { IClient } from "./IClient";
import fetch from "node-fetch";
import { streamToString } from "../utils/streamToString";

export type ReqInit = {
  method?: string;
  body?: Object;
  headers?: Record<string, string>;
};

export class HttpClient implements IClient<JwtUserIdentification> {
  constructor(private readonly serverUrl: string) {}

  login(email: string, password: string): Promise<LoginResponse> {
    return this.fetchJson(`${this.serverUrl}/api/user`, {
      method: "POST",
      body: { email, password },
    });
  }

  createToDoList(
    userIdentification: JwtUserIdentification,
    name: string
  ): Promise<unknown> {
    return this.fetchJson(`${this.serverUrl}/api/todo-list`, {
      method: "POST",
      body: { name },
    });
  }

  getToDoLists(
    userIdentification: JwtUserIdentification
  ): Promise<GetToDoListsResponse> {
    return this.fetchJson(`${this.serverUrl}/api/todo-lists`, {
      method: "GET",
    });
  }

  protected async fetchJson<T>(url: string, init: ReqInit): Promise<T> {
    const body = init.body ? JSON.stringify(init.body) : undefined;
    const response = await fetch(url, {
      ...init,
      body,
      headers: {
        ...init.headers,
        "Content-Type": "application/json",
      },
    });
    try {
      const json = await response.json();
      return json as T;
    } catch (err) {
      const body = await streamToString(response.body);
      const status = response.status;

      console.log({ err, status, body });
      throw err as Error;
    }
  }
}
