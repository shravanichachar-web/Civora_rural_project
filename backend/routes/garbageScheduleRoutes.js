import express from 'express';
import { getGarbageSchedules } from '../controllers/garbageScheduleController.js';

const router = express.Router();

router.get('/', getGarbageSchedules);

export default router;
