import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all staff
router.get("/", protect, async (req, res) => {
  const staff = await User.find({ role: "staff" });
  res.json(staff);
});

// Add staff
router.post("/", protect, async (req, res) => {
  const { name, email, password } = req.body;
  const newStaff = await User.create({ name, email, password, role: "staff" });
  res.json(newStaff);
});

// Update staff
router.put("/:id", protect, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete staff
router.delete("/:id", protect, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Staff deleted" });
});

export default router;
