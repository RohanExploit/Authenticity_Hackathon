import { Router } from 'express';
import {
    getCustomers,
    createCase,
    updateCaseStatus,
    getCasesForCollector,
} from '../controllers/caseController.js';

const router = Router();

router.get('/customers', getCustomers);
router.post('/cases', createCase);
router.post('/case/status', updateCaseStatus);
router.get('/cases/:collector', getCasesForCollector);

export default router;
