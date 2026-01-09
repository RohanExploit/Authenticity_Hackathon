import express from "express";
import { getUnrecovered } from "../controllers/reportController.js";

const router = express.Router();
router.get("/unrecovered", getUnrecovered);

export default router;
