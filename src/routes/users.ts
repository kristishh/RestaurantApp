import express from "express";
import { userController } from "../controller";
import { isUserAdmin, isUserLoggedIn } from "../middleware";
const router = express.Router();

router.post("/users", isUserLoggedIn, isUserAdmin, userController.userCreate);
router.get("/users", isUserLoggedIn, isUserAdmin, userController.userReadAll);
router.put(
  "/users/:userId",
  isUserLoggedIn,
  isUserAdmin,
  userController.userUpdate
);
router.delete(
  "/users/:userId",
  isUserLoggedIn,
  isUserAdmin,
  userController.userDelete
);

export { router as userRouter };
