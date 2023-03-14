import { NextApiResponse } from "next";
import { IdentifyUserError } from "../../src/adapters/User/IUserManager";
import { CreateToDoListResponse } from "../../src/core/todo-lists/create";
import { RequestWithAdapters } from "../../src/types";

export default async function handler(
  req: RequestWithAdapters,
  res: NextApiResponse<CreateToDoListResponse>
) {
  if (req.method === "POST") {
    return res.status(200).json({ toDoList: { id: "1234", name: "plop" } });
  }

  throw new Error(
    `Unsupported method for api/todo-list: ${req.method} - expected POST`
  );
}
