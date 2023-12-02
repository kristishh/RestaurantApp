import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/users";

export const userCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const role: string = req.body.role;

  let message = "";

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmail = emailRegex.test(email) && email.length <= 255;
  if (isValidEmail) {
    try {
      const existingUserWithThisEmail = await User.findOne({
        where: { email: email },
        raw: false,
      });
      if (existingUserWithThisEmail) {
        message = "Email address is already in use";
      }
    } catch (error) {
      return res.status(500).send({});
    }
  } else if (!isValidEmail) {
    message = "Email is required and must not exceed 255 characters";
  } else if (!name || name.length < 100) {
    message = "Name is required and must not exceed 100 characters";
  } else if (!role) {
    message = "A role must be selected";
  } else if (role !== "Admin" && role !== "Waiter") {
    message = "The provided 'role' is not valid!";
  } else if (password.length < 8) {
    message = "Password must be at least 8 characters";
  }

  if (message) {
    return res.status(400).send({ message });
  }

  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await User.create({
      fullName: name,
      email: email,
      password: hashedPassword,
      role: role,
      isLoggedIn: false,
    });

    return res.send();
  } catch (error) {
    res.status(500);
    return res.send({
      message: "...",
    });
  }
};
