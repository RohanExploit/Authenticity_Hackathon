import express from "express";
import { getSuggestion, assignCase } from "../controllers/assignmentController.js";

const router = express.Router();
router.post("/suggest-collector", getSuggestion);
router.post("/assign-case", assignCase);

export default router;
