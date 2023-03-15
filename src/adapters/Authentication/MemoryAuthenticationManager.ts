import { User } from "../../models/User";
import { IAuthenticationManager } from "./IAuthenticationManager";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../CONFIG";

export class MemoryAuthenticationManager implements IAuthenticationManager {
  private readonly expiresIn = 900;

  getJWT(user: User): string {
    return jwt.sign(
      {
        email: user.email,
      },
      CONFIG.jwtEncryption,
      {
        expiresIn: this.expiresIn,
      }
    );
  }

  async updateRefreshToken(user: User): Promise<string> {
    return "to-be-implemented";
  }

  async userEmailFromJwt(jwtToken: string): Promise<string> {
    let verified: { email: string };
    try {
      verified = jwt.verify(jwtToken, CONFIG.jwtEncryption) as {
        email: string;
      };
    } catch (err) {
      throw new Error("Unable to verify the JWT token");
    }
    return verified.email;
  }
}
