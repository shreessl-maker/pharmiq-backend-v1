import express from "express";
import multer from "multer";
import { createTest, getTestsByClient } from "../controllers/testController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/tests/create
router.post("/create", upload.single("pdf"), createTest);

// GET /api/tests/client/:clientId
router.get("/client/:clientId", getTestsByClient);

export default router;
