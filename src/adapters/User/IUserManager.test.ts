import assert from "assert";
import {
  CreateUserError,
  IdentifyUserError,
  IUserManager,
} from "./IUserManager";
import { MemoryUsermanager } from "./MemoryUserManager";

function IUserManagerContractTest(
  implementationName: string,
  makeUserManager: () => Promise<IUserManager>
) {
  describe(`IUserManager: ${implementationName}`, () => {
    let userManager: IUserManager;
    const email = "someone@example.com";
    const password = "superS3cret";

    beforeEach(async () => {
      userManager = await makeUserManager();
    });

    describe("create", () => {
      it("creates a new user", async () => {
        const { user, error } = await userManager.create(email, password);

        assert.deepStrictEqual(user, { email });
        assert.strictEqual(error, null);
      });

      it("returns error CreateUserError.emailAlreadyUsed is the email is in use", async () => {
        await userManager.create(email, password);
        const { user, error } = await userManager.create(email, password);

        assert.strictEqual(error, CreateUserError.emailAlreadyUsed);
        assert.strictEqual(user, null);
      });
    });

    describe("identify", () => {
      beforeEach(async () => {
        await userManager.create(email, password);
      });

      it("returns error IdentifyUserError.invalidCredentials if the user is unknown", async () => {
        const { user, error } = await userManager.identify(
          "someoneelseemail@example.com",
          password
        );

        assert.strictEqual(error, IdentifyUserError.invalidCredentials);
        assert.strictEqual(user, null);
      });

      it("returns error IdentifyUserError.invalidCredentials if the password is incorrect", async () => {
        const { user, error } = await userManager.identify(
          email,
          `wrong-${password}`
        );

        assert.strictEqual(error, IdentifyUserError.invalidCredentials);
        assert.strictEqual(user, null);
      });

      it("returns the user if the email and password are correct", async () => {
        const { user, error } = await userManager.identify(email, password);

        assert.deepStrictEqual(user, { email });
        assert.deepStrictEqual(error, null);
      });
    });
  });
}

IUserManagerContractTest(
  "MemoryUserManager",
  async () => new MemoryUsermanager()
);
