import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";
import { Authenticate } from "../types";

export const authenticate: Authenticate = (email, password) => {
  return async (actor: Actor<IWorld>) => {
    return new Promise((resolve) => {
      cy.visit("/");
      cy.login(email, password);
      cy.url()
        .should("contain", "/todo-lists")
        .then(() => {
          resolve({
            error: null,
            user: { email: "whatever@example.com" },
            jwtIdentification: {
              jwtToken: "",
              refreshToken: "",
            },
          });
        });
    });
  };
};
