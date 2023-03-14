import assert from "assert";
import { IdentifyUserError } from "../../adapters/User/IUserManager";
import { User } from "../../models/User";
import { Adapters, JwtUserIdentification } from "../../types";

export type LoginResponse = {
  user: User | null;
  jwtIdentification: JwtUserIdentification | null;
  error: IdentifyUserError | null;
};

export async function login(
  email: string,
  password: string,
  { userManager, authenticationManager }: Adapters
): Promise<LoginResponse> {
  const { user, error } = await userManager.identify(email, password);
  if (error) return { user: null, jwtIdentification: null, error };
  assert(user);

  return {
    user,
    jwtIdentification: {
      jwtToken: authenticationManager.getJWT(user),
      refreshToken: await authenticationManager.updateRefreshToken(user),
    },
    error: null,
  };
}
