import express from "express";
import Performance from "../models/Performance.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all performance reports
router.get("/", protect, async (req, res) => {
  const reports = await Performance.find().populate("staff", "name email");
  res.json(reports);
});

// Add performance data
router.post("/", protect, async (req, res) => {
  const performance = await Performance.create(req.body);
  res.json(performance);
});

export default router;
