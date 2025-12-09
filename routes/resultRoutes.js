import express from "express";
import { getAllResults, getUserResults, saveResult } from "../controllers/resultController.js";

const router = express.Router();

// ✅ For admin or superadmin
router.get("/", getAllResults);

// ✅ For specific user
router.get("/:userId", getUserResults);

// ✅ For saving new result
router.post("/", saveResult);

export default router;
