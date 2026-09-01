import express from 'express';
import { getMyBills, getBillById } from '../controllers/billController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMyBills);
router.get('/:id', protect, getBillById);

export default router;
