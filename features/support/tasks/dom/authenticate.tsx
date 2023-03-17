import React from "react";

import { Actor } from "@cucumber/screenplay";
import { LoginResponse } from "../../../../src/core/user/login";
import { IWorld } from "../../IWorld";
import { Authenticate } from "../types";
import {
  Login,
  LogintestIds,
} from "../../../../src/components/Authentication/Login";

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
