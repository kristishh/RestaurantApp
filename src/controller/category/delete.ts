import e, { NextFunction, Request, Response } from "express";
import { Category } from "../../models";

export const categoryDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.id;
  // const category =

  try {
    const children = await Category.findAll({
      where: { parent: categoryId },
    });

    if (children.length > 0) {
      children.forEach(async (child) => {
        child.set({ parent: null });
        await child.save();
      });
      // children[0].set({ parent: null });
      await children[0].save();
    }
    await Category.destroy({
      where: { id: categoryId },
    });

    return res.send({ message: "Category has been deleted!" });
  } catch {
    return res.status(500).send("...");
  }
};
