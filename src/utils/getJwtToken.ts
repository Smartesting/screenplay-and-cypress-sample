import { NextApiRequest } from "next";

export function getJwtToken(req: NextApiRequest): string | null {
  const authorizationHeader =
    req.headers["Authorization"] ?? req.headers["authorization"];
  if (!authorizationHeader) return null;

  return (authorizationHeader as string).split("Bearer ")[1];
}
