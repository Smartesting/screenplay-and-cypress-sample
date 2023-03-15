import { User } from "../../models/User";
import { IAuthenticationManager } from "./IAuthenticationManager";
import assert from "assert";
import jwt from "jsonwebtoken";
import { MemoryAuthenticationManager } from "./MemoryAuthenticationManager";

function IAuthenticationManagerContractTest(
  implementationName: string,
  makeAdapter: () => Promise<IAuthenticationManager>
) {
  describe(`IAuthenticationManager: ${implementationName}`, () => {
    let authenticationManager: IAuthenticationManager;
    const user: User = {
      email: "whatever@example.com",
    };

    beforeEach(async () => {
      authenticationManager = await makeAdapter();
    });

    describe("getJWT", () => {
      it("generates a JWT token for the user", async () => {
        const jwtToken = authenticationManager.getJWT(user);

        const decodedToken = jwt.decode(jwtToken);
        if (!decodedToken) throw new Error("Unable to decode JWT token");

        assert.strictEqual(
          (decodedToken as { email: string }).email,
          user.email
        );
      });
    });

    describe("userEmailFromJwt", () => {
      it("raises an error if the JWT token is not signed with the correct key", async () => {
        const jwtToken = jwt.sign(
          { email: "someone@example.com" },
          "definitly-not-a-real-jwt-secret"
        );

        await assert.rejects(
          async () => authenticationManager.userEmailFromJwt(jwtToken),
          new Error("Unable to verify the JWT token")
        );
      });

      it("returns the email stored in the JWT token", async () => {
        const jwtToken = await authenticationManager.getJWT(user);
        const email = await authenticationManager.userEmailFromJwt(jwtToken);

        assert.strictEqual(email, user.email);
      });
    });
  });
}

IAuthenticationManagerContractTest(
  "MemoryAuthenticationManager",
  async () => new MemoryAuthenticationManager()
);
