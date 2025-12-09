import express from "express";
import {
  createTest,
  updateTestStatus,
  getAllTests,
  getLiveTests,
  getPastTests,
  submitResult
} from "../controllers/testController.js";

const router = express.Router();

// admin
router.post("/create", createTest);
router.patch("/:id/status", updateTestStatus);
router.get("/all/:clientId", getAllTests);

// staff
router.get("/live/:clientId", getLiveTests);
router.get("/past/:staffId", getPastTests);
router.post("/submit", submitResult);

export default router;
