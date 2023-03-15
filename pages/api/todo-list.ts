import { NextApiResponse } from "next";
import {
  createToDoList,
  CreateToDoListResponse,
} from "../../src/core/todo-lists/create";
import { RequestWithAdapters } from "../../src/types";
import { getJwtToken } from "../../src/utils/getJwtToken";

export default async function handler(
  req: RequestWithAdapters,
  res: NextApiResponse<CreateToDoListResponse>
) {
  if (req.method === "POST") {
    const jwtToken = getJwtToken(req);
    if (!jwtToken) return res.status(403).json({ toDoList: null });

    let email: string;
    try {
      email = await req.adapters.authenticationManager.userEmailFromJwt(
        jwtToken
      );
    } catch (err) {
      return res.status(403).json({ toDoList: null });
    }

    const user = await req.adapters.userManager.getUserByEmail(email);
    if (!user) {
      return res.status(403).json({ toDoList: null });
    }

    const { name } = req.body;
    const created = await createToDoList(user, name, req.adapters);
    return res.status(201).json(created);
  }

  throw new Error(
    `Unsupported method for api/todo-list: ${req.method} - expected POST`
  );
}
