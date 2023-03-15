import { User } from "../../models/User";

export enum CreateUserError {
  emailAlreadyUsed = "email_already_used",
}

export enum IdentifyUserError {
  invalidCredentials = "invalid_credentials",
}

export interface IUserManager {
  create: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: CreateUserError | null }>;

  identify: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: IdentifyUserError | null }>;

  getUserByEmail(email: string): Promise<User | null>;
}
