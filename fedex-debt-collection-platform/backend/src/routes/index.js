import express from "express";
import { login } from "../controllers/authController.js";
import { createCustomer, createCase, getAssignedCases, updateCaseStatus } from "../controllers/caseController.js";
import { getLogs } from "../controllers/communicationLogController.js";

const router = express.Router();

router.post("/login", login);
router.post("/customer", createCustomer);
router.post("/case", createCase);
router.post("/case/update", updateCaseStatus);
router.get("/cases/:collectorId", getAssignedCases);
router.get("/logs", getLogs);

export default router;
