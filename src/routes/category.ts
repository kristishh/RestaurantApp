import express from "express";
import { categoryController } from "../controller";
import { isUserAdmin, isUserLoggedIn } from "../middleware";

const router = express.Router();

router.post(
  "/category",
  isUserLoggedIn,
  isUserAdmin,
  categoryController.categoryCreate
);
router.get(
  "/category",
  isUserLoggedIn,
  isUserLoggedIn,
  categoryController.categoryRead
);
router.put(
  "/category",
  isUserLoggedIn,
  isUserAdmin,
  categoryController.categoryUpdate
);
router.delete(
  "/category/:id",
  isUserLoggedIn,
  isUserAdmin,
  categoryController.categoryDelete
);
export { router as categoryRouter };
