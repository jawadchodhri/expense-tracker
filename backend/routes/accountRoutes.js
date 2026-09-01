import express from "express";

import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from "../controllers/accountController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getAccounts);

router.post("/", protectRoute, createAccount);

router.patch("/:accountId", protectRoute, updateAccount);

router.delete("/:accountId", protectRoute, deleteAccount);

export default router;