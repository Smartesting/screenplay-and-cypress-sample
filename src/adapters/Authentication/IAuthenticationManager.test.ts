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
    beforeEach(async () => {
      authenticationManager = await makeAdapter();
    });

    describe("getJWT", () => {
      const user: User = {
        email: "whatever@example.com",
      };

      it("generates a JWT token for the user", async () => {
        const jwtToken = authenticationManager.getJWT(user);

        const [bearer, encodedToken] = jwtToken.split(" ");
        assert.strictEqual(bearer, "Bearer");

        const decodedToken = jwt.decode(encodedToken);
        if (!decodedToken) throw new Error("Unable to decode JWT token");

        assert.strictEqual(
          (decodedToken as { email: string }).email,
          user.email
        );
      });
    });
  });
}

IAuthenticationManagerContractTest(
  "MemoryAuthenticationManager",
  async () => new MemoryAuthenticationManager()
);
