import express from 'express';
import { submitRepair, getAllRepairs } from '../controllers/formController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', submitRepair);
router.get('/repairs', authMiddleware, getAllRepairs); // Protected route

export default router;