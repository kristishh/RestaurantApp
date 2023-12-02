import { Request, Response } from "express";
import { Category, Products } from "../../models";

export const productCreate = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const description: string = req.body.description;
  const category: string = req.body.category;
  const price: number = req.body.price;

  let message = "";

  if (!name || name.length > 100) {
    message = "Name is required and must not exceed 100 characters";
  }
  if (description.length > 500) {
    message = "The product description must not exceed 500 characters";
  }
  if (!price) {
    message = "Price is required";
  }
  try {
    const foundCategory = await Category.findOne({
      where: { name: category },
      attributes: ["id"],
    });

    if (!foundCategory) {
      message = "Selecting a category is required";
    }
    if (message) {
      return res.status(400).send({ message });
    }
    const newProduct = await Products.findOne({
      where: {
        description: description,
        price: Number(price),
        categoryId: foundCategory?.getDataValue("id"),
      },
    });
    if (!newProduct) {
      Products.create({
        name: name,
        description: description,
        price: Number(price),
        categoryId: foundCategory?.getDataValue("id"),
      });
    }
    return res.send({ message: "Product added successfully" });
  } catch {
    return res.status(500).send("...");
  }
};
