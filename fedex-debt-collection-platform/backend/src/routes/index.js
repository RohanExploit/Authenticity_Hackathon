import { createCase, updateCaseStatus, getCasesForCollector, getCustomers } from "../controllers/caseController.js";
import { assignCase } from "../controllers/assignmentController.js";
import { getLogs } from "../controllers/communicationLogController.js";
import express from "express";

const router = express.Router();

router.post("/case", createCase);
router.post("/case/status", updateCaseStatus);
router.post("/assign-case", assignCase);
router.get("/cases/:collector", getCasesForCollector);
router.get("/customers", getCustomers);
router.get("/logs", getLogs);

export default router;
