import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";

import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only
router.post("/create", authMiddleware, adminOnly, createUser);
router.get("/", authMiddleware, adminOnly, getUsers);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);
router.put("/:id", authMiddleware, adminOnly, updateUser);

export default router;
