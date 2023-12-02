import express from "express";
import { authController } from "../controller";

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
export { router as authRouter };
