import { NextApiResponse } from "next";
import { GetToDoListsResponse } from "../../src/core/todo-lists/getToDoLists";
import { RequestWithAdapters } from "../../src/types";
import { getJwtToken } from "../../src/utils/getJwtToken";

export default async function handler(
  req: RequestWithAdapters,
  res: NextApiResponse<GetToDoListsResponse>
) {
  if (req.method === "GET") {
    const jwtToken = getJwtToken(req);
    if (!jwtToken) return res.status(403).json({ toDoLists: [] });

    let email: string;
    try {
      email = await req.adapters.authenticationManager.userEmailFromJwt(
        jwtToken
      );
    } catch (err) {
      return res.status(403).json({ toDoLists: [] });
    }

    const user = await req.adapters.userManager.getUserByEmail(email);
    if (!user) {
      return res.status(403).json({ toDoLists: [] });
    }

    const toDoLists = await req.adapters.toDoListManager.list(user);
    return res.status(200).json({ toDoLists });
  }

  throw new Error(
    `Unsupported method for api/todo-list: ${req.method} - expected POST`
  );
}
