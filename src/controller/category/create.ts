import { Request, Response } from "express";
import { Category } from "../../models";

export const categoryCreate = async (req: Request, res: Response) => {
  const categoryName: string = req.body.name;
  const parentId = req.body.parent;

  if (!categoryName || categoryName.length > 100) {
    return res
      .status(400)
      .send({ message: "Name is required and must not exceed 100 characters" });
  }

  try {
    const parentCategory = await Category.findOne({
      where: { id: parentId },
    });

    await Category.create({
      name: categoryName,
      parent: parentCategory?.getDataValue("id"),
    });

    return res.send({ message: "Category added successfully" });
  } catch (e) {
    console.log(e);

    return res.status(500).send("...");
  }
};
