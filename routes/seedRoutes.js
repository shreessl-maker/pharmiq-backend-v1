import express from "express";
import { seedDemoData } from "../data/seedController.js";

const router = express.Router();

router.get("/run", seedDemoData);

export default router;
