import React from "react";

import { Actor } from "@cucumber/screenplay";
import {
  IClient,
  AvailableUserIdentifications,
} from "../../../../src/client/IClient";
import { LoginResponse } from "../../../../src/core/user/login";
import { IWorld } from "../../IWorld";
import { Authenticate } from "../types";

export enum LogintestIds {
  COMPONENT = "Login",
  FIELD_EMAIL = "Login.Field.Email",
  FIELD_PASSWORD = "Login.Field.Password",
  ACTION_LOGIN = "Login.Action.Login",
}

export const Login: React.FunctionComponent<{
  client: IClient<AvailableUserIdentifications>;
  onClientResponse: (loginResponse: LoginResponse) => void;
}> = ({ client, onClientResponse }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function login(event: React.FormEvent) {
    event.preventDefault();

    client.login(email, password).then(onClientResponse);
  }

  return (
    <form data-testid={LogintestIds.COMPONENT} onSubmit={login}>
      <label>
        Email:
        <input
          type="text"
          name="login"
          data-testid={LogintestIds.FIELD_EMAIL}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="login"
          data-testid={LogintestIds.FIELD_PASSWORD}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Login"
        data-testid={LogintestIds.ACTION_LOGIN}
      />
    </form>
  );
};

export const authenticate: Authenticate = (email, password) => {
  return async (actor: Actor<IWorld>) => {
    return new Promise((resolve) => {
      const { client } = actor.world;
      function onLoginResponse(loginResponse: LoginResponse) {
        resolve(loginResponse);
        const userIdentification = actor.world.getAuthentication(loginResponse);
        actor.remember("userIdentification", userIdentification);
      }

      cy.intercept("/users/").as("login");
      cy.mount(<Login client={client} onClientResponse={onLoginResponse} />);
      cy.get("input").should("have.length", 3);
      cy.get(`[data-testid="${LogintestIds.FIELD_EMAIL}"]`).type(email);
      cy.get(`[data-testid="${LogintestIds.FIELD_PASSWORD}"]`).type(password);
      cy.get(`[data-testid="${LogintestIds.ACTION_LOGIN}"]`).click();
    });
  };
};
