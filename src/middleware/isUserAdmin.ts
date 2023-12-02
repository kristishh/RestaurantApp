import { NextFunction, Request, Response } from "express";
import { User } from "../models/users";

export async function isUserAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isAdmin = await User.findOne({
      where: { userId: req.session?.userId },
    });
    if (isAdmin) {
      return next();
    }
    return res.status(403).send();
  } catch {
    return res.status(500).send();
  }
}
