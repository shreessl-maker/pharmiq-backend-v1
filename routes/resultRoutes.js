import express from "express";
import { getAllResults, getUserResults, saveResult } from "../controllers/resultController.js";

const router = express.Router();

router.get("/", getAllResults);               // For admin/superadmin
router.get("/:userId", getUserResults);       // For specific user
router.post("/", saveResult);                 // Save a result

export default router;
