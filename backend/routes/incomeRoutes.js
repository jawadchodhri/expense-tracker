import express from "express";

import {
  createIncome,
  deleteIncome,
  getIncome,
  updateIncome,
} from "../controllers/incomeController.js";

import {
  protectRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protectRoute,
  getIncome,
);

router.post(
  "/",
  protectRoute,
  createIncome,
);

router.patch(
  "/:incomeId",
  protectRoute,
  updateIncome,
);

router.delete(
  "/:incomeId",
  protectRoute,
  deleteIncome,
);

export default router;