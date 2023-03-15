import { User } from "../../models/User";
import {
  CreateUserError,
  IdentifyUserError,
  IUserManager,
} from "./IUserManager";
import crypto from "crypto";

export class MemoryUsermanager implements IUserManager {
  private readonly usersByEmail = new Map<string, User>();
  private readonly passwordByEmail = new Map<string, string>();

  async create(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: CreateUserError | null }> {
    const existing = this.findUserByEmail(email);
    if (existing !== undefined)
      return { user: null, error: CreateUserError.emailAlreadyUsed };

    const user: User = { email };
    this.usersByEmail.set(email, user);
    this.passwordByEmail.set(email, this.hashPassword(password));

    return { user, error: null };
  }

  async identify(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: IdentifyUserError | null }> {
    const user = this.findUserByEmail(email);
    if (user === undefined)
      return { error: IdentifyUserError.invalidCredentials, user: null };
    if (!this.checkPassword(email, password))
      return { error: IdentifyUserError.invalidCredentials, user: null };

    return { error: null, user };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersByEmail.get(email) ?? null;
  }

  private findUserByEmail(email: string): User | undefined {
    return this.usersByEmail.get(email);
  }

  private checkPassword(email: string, password: string): boolean {
    const storedPassword = this.passwordByEmail.get(email);
    const hashedPassword = this.hashPassword(password);

    return storedPassword !== undefined && hashedPassword === storedPassword;
  }

  private hashPassword(password: string): string {
    // Boo, bad practices. That's just a toy app, don't use this for real apps.
    const shasum = crypto.createHash("sha1");
    shasum.update(password);
    return shasum.digest("hex");
  }
}
