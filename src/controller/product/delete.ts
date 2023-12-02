import { Request, Response } from "express";
import { Products } from "../../models";

export const productDelete = async (req: Request, res: Response) => {
  const productId = req.query.productId;
  try {
    await Products.destroy({
      where: { id: Number(productId) },
    });
    return res.send({ message: "Product has been deleted!" });
  } catch {
    return res.send(500).send("...");
  }
};
