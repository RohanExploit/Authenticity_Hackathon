import express from "express";
import { login } from "../controllers/authController.js";
import { createCustomer, createCase } from "../controllers/caseController.js";

const router = express.Router();

router.post("/login", login);
router.post("/customer", createCustomer);
router.post("/case", createCase);

export default router;
