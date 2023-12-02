import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/users";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUser = await User.findByPk(req.session.userId);
    if (foundUser) {
      foundUser.setDataValue("isLoggedIn", false);
      await foundUser.save();
      req.session.destroy(function (err) {});
      return res.send({});
    }
    res.status(400);
    return res.send({
      message: `Cannot find User with ID ${req.session.userId}!`,
    });
  } catch (e) {
    res.status(500);
    return res.send({ message: "Failed to log out the User!" });
  }
};
