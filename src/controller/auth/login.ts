import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/users";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (!email) {
    res.status(400);
    return res.send({
      message: "Email address is required",
    });
  }

  if (!isEmailValid(email)) {
    res.status(400);
    return res.send({
      message: "Invalid email address",
    });
  }

  if (!password) {
    res.status(400);
    return res.send({
      message: "Password is required",
    });
  }

  try {
    const foundUser = await User.findOne({ where: { email: email } });

    if (foundUser) {
      const match = await bcryptjs.compare(
        password,
        foundUser.getDataValue("password")
      );

      if (match) {
        return await userLogIn(req, res, foundUser);
      }
    }

    throw new Error();
  } catch {
    res.status(400);
    return res.send({
      message:
        "A user with the provided email address and password was not found",
    });
  }
};

async function userLogIn(req: Request, res: Response, user: User) {
  req.session.userId = user.getDataValue("userId");
  req.session.isLoggedIn = true;
  user.setDataValue("isLoggedIn", true);

  await user.save();
  return res.send({
    userRole: user.getDataValue("role"),
  });
}

function isEmailValid(email: string): boolean {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
