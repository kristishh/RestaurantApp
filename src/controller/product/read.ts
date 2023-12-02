import { Request, Response } from "express";
import { Products } from "../../models";
import { pagination } from "../../util/pagination";

export const productReadAll = async (req: Request, res: Response) => {
  const pageAsNumber = Number(req.query.page);
  const filterName: any = req.query.name;
  const filterCategory: any = req.query.category;

  let filters = {
    name: filterName,
    categoryId: filterCategory,
  };

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  try {
    const paginatedProducts = await pagination(
      Products,
      page,
      ["name", "categoryId", "price"],
      filters
    );
    if (paginatedProducts) {
      return res.send(paginatedProducts);
    }
  } catch {
    return res.status(500).send("...");
  }
};
