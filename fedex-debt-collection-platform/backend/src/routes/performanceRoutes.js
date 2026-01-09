import express from "express";
import { getPerformance } from "../controllers/performanceController.js";

const router = express.Router();
router.get("/performance", getPerformance);
export default router;
