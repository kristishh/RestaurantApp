import { NextFunction, Request, Response } from "express";
import { User } from "../../models/users";

export const userUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);

  const name: string = req.body.name;
  const email: string = req.body.email;
  const password: string = req.body.password;
  const role: string = req.body.role;

  let nameError: string = "";
  let emailError: string = "";
  let passwordError: string = "";
  let roleError: string = "";
  let isValid: boolean = true;

  const emailReggex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailReggex.test(email) && email.length <= 255) {
    const existingEmail = await User.findAll({
      where: { email: email },
      raw: false,
    });

    if (existingEmail.length !== 0) {
      isValid = false;
      emailError = "Email address is already in use";
    }
  } else {
    isValid = false;
    emailError = "Email is required and must not exceed 255 characters";
  }
  if (name === "" || name.length > 100) {
    isValid = false;
    nameError === "Name is required and must not exceed 100 characters";
  }
  if (role !== "Admin" && role !== "Waiter") {
    isValid = false;
    roleError = "A role must be selected";
  }
  if (password !== "" && password?.length < 8) {
    isValid = false;
    passwordError = "Password must be at least 8 characters";
  }
  if (isValid) {
    if (password == "") {
      // Update user without updating password
    }
    //Update user
  }
  return res.send({
    nameError,
    emailError,
    passwordError,
    roleError,
  });
};
