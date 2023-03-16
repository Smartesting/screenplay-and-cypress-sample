import { Actor } from "@cucumber/screenplay";
import { IWorld } from "../../IWorld";

export async function isAuthenticated(this: IWorld, actor: Actor<IWorld>) {
  const email = `${actor.name}@example.com`;
  const password = `${actor.name}-secret`;
  this.adapters.userManager.create(email, password);

  return actor
    .attemptsTo(this.authenticate(email, password))
    .then((loginResponse) => {
      if (loginResponse.error)
        throw new Error(
          `Unable to authenticate ${actor.name}, got error: ${loginResponse.error}`
        );

      actor.remember(
        "userIdentification",
        this.getAuthentication(loginResponse)
      );
    });
}
