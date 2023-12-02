import { Request, Response } from "express";
import { Category, Products } from "../../models";

export const producteUpdate = async (req: Request, res: Response) => {
  const productId = req.query.productId;

  const name: string = req.body.product;
  const category: string = req.body.category;
  const description: string = req.body.description;
  const price: string = req.body.price;

  let message = "";

  if (!name || name.length > 100) {
    message = "Name is required and must not exceed 100 characters";
  }
  if (!category) {
    message = "Selecting a category is required";
  }
  if (!description || description.length > 500) {
    message = "The product description must not exceed 500 characters";
  }
  if (!price) {
    message = "Price is required";
  }
  if (message) {
    return res.status(400).send({ message });
  }

  try {
    const specifiedProduct = await Products.findOne({
      where: { id: Number(productId) },
    });
    if (specifiedProduct) {
      specifiedProduct.setDataValue("name", name);
      description !== ""
        ? specifiedProduct.setDataValue("description", description)
        : null;
      specifiedProduct.setDataValue("price", Number(price));
      const isCategoryExisting = await Category.findOne({
        where: { name: category },
      });
      isCategoryExisting
        ? specifiedProduct.setDataValue(
            "categoryId",
            isCategoryExisting.getDataValue("id")
          )
        : null;
      await specifiedProduct.save();
      return res.send({ message: "Product updated successfully" });
    }
  } catch {
    return res.status(500).send("...");
  }
};
