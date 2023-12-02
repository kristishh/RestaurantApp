import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/users';

export const userDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res);

  const userId: string = req.params.userId;
  try {
    await User.destroy({
      where: { userId: userId },
    });
    res.send("USER DELETED !");
  } catch (e) {
    console.log(e);
  }
};
