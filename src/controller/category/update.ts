import { Request, Response } from "express";
import { Category } from "../../models";

export const categoryUpdate = async (req: Request, res: Response) => {
  const categoryName: string = req.body.name;
  const parentName: string = req.body.parent;

  if (!categoryName || categoryName.length > 100) {
    return res
      .status(400)
      .send({ message: "Name is required and must not exceed 100 characters" });
  }

  try {
    const existingCategory = await Category.findOne({
      where: { name: categoryName },
    });
    const existingParent = await Category.findOne({
      where: { name: parentName },
    });
    if (existingCategory && existingParent) {
      existingCategory.set({ parent: existingParent.getDataValue("id") });
      await existingCategory.save();
    } else {
      Category.create({
        name: categoryName,
        parent: existingParent?.getDataValue("id"),
      });
    }

    return res.send({ message: "Category updated successfully" });

    // if (existingParent) {
    //   Category.create({
    //     name: categoryName,
    //     parent: existingParent.getDataValue("id"),
    //   });
    // }
  } catch {
    return res.status(500).send("...");
  }
};
