import { NextApiResponse } from "next";
import { GetToDoListsResponse } from "../../src/core/todo-lists/getToDoLists";
import { RequestWithAdapters } from "../../src/types";

export default async function handler(
  req: RequestWithAdapters,
  res: NextApiResponse<GetToDoListsResponse>
) {
  if (req.method === "GET") {
    return res.status(200).json({ toDoLists: [{ id: "1234", name: "plop" }] });
  }

  throw new Error(
    `Unsupported method for api/todo-list: ${req.method} - expected POST`
  );
}
