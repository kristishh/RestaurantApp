import { Request, Response } from "express";
import { Category } from "../../models";

export const categoryRead = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      where: {
        parent: null,
      },
      include: [
        {
          model: Category,
          as: "children",
        },
      ],
    });
    return res.send(categories);
  } catch (error) {
    return res.status(500).send("...");
  }
};
