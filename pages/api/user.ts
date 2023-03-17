import { NextApiResponse } from "next";
import { IdentifyUserError } from "../../src/adapters/User/IUserManager";
import { login, LoginResponse } from "../../src/core/user/login";
import { RequestWithAdapters } from "../../src/types";

export default async function handler(
  req: RequestWithAdapters,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const response = await login(email, password, req.adapters);

    return res
      .status(loginResponseErrorToHttpCode(response.error))
      .json(response);
  }

  throw new Error(
    `Unsupported method for api/user: ${req.method} - expected POST`
  );
}

function loginResponseErrorToHttpCode(error: IdentifyUserError | null): number {
  switch (error) {
    case IdentifyUserError.invalidCredentials:
      return 422;
  }
  return 200;
}
