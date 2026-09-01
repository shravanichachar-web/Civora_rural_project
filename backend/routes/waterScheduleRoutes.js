import express from 'express';
import { getWaterSchedules } from '../controllers/waterScheduleController.js';

const router = express.Router();

router.get('/', getWaterSchedules);

export default router;
