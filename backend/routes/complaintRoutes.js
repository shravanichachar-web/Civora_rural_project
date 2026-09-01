import express from 'express';
import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
} from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/:id', protect, getComplaintById);

export default router;
