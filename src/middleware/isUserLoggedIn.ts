import { NextFunction, Request, Response } from "express";

export function isUserLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session?.isLoggedIn) {
    return next();
  }
  return res.status(401).send();
}
