import express from "express";

import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";

import {
  protectRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protectRoute,
  getExpenses,
);

router.post(
  "/",
  protectRoute,
  createExpense,
);

router.patch(
  "/:expenseId",
  protectRoute,
  updateExpense,
);

router.delete(
  "/:expenseId",
  protectRoute,
  deleteExpense,
);

export default router;