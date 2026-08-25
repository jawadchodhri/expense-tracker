import express from "express";

import {
  createAccount,
  getAccounts,
} from "../controllers/accountController.js";

import {
  protectRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, getAccounts);

router.post("/", protectRoute, createAccount);

export default router;