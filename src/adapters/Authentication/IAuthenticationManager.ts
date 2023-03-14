import { User } from "../../models/User";

export interface IAuthenticationManager {
  getJWT(user: User): string;

  updateRefreshToken(user: User): Promise<string>;
}
