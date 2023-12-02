import { Request, Response } from "express";
import { User } from "../../models/users";
import { pagination } from "../../util/pagination";

export const userReadAll = async (req: Request, res: Response) => {
  const pageAsNumber = Number(req.query.page);
  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  const paginatedUsers = await pagination(
    User,
    page,
    ["fullName", "email"],
    []
  );
  console.log(paginatedUsers);
  if (paginatedUsers) {
    return res.send(paginatedUsers);
  }
  return res.status(500).send("...");
};
