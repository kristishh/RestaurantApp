import express from "express";
import { prooductController } from "../controller";
import { isUserAdmin, isUserLoggedIn } from "../middleware";

const router = express.Router();

router.post(
  "/products",
  isUserLoggedIn,
  isUserAdmin,
  prooductController.productCreate
);
router.get(
  "/products",
  isUserLoggedIn,
  isUserAdmin,
  prooductController.productReadAll
);
router.put(
  "/products",
  isUserLoggedIn,
  isUserAdmin,
  prooductController.producteUpdate
);
router.delete("/products", prooductController.productDelete);
export { router as productRouter };
