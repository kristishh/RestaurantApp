import express from 'express';
import { tableController } from '../controller';
import { isUserLoggedIn } from '../middleware';

const router = express.Router();

router.get("/tables", isUserLoggedIn, tableController.readAll);

export { router as tableRouter };
