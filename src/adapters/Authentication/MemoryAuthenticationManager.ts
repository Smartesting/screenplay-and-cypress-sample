import { User } from "../../models/User";
import { IAuthenticationManager } from "./IAuthenticationManager";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../CONFIG";

export class MemoryAuthenticationManager implements IAuthenticationManager {
  private readonly expiresIn = 900;

  getJWT(user: User): string {
    return (
      "Bearer " +
      jwt.sign(
        {
          email: user.email,
        },
        CONFIG.jwtEncryption,
        {
          expiresIn: this.expiresIn,
        }
      )
    );
  }

  async updateRefreshToken(user: User): Promise<string> {
    return "to-be-implemented";
  }
}
