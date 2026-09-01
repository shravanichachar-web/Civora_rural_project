import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { staff } from '../middleware/staffMiddleware.js';

import {
  getDashboardStats,
  getRecentComplaints,
  getCategoryStats,
  getStatusStats,
} from '../controllers/adminController.js';

import {
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignStaffToComplaint,
  deleteComplaint,
} from '../controllers/complaintController.js';

import {
  createWaterSchedule,
  updateWaterSchedule,
  deleteWaterSchedule,
} from '../controllers/waterScheduleController.js';

import {
  createGarbageSchedule,
  updateGarbageSchedule,
  deleteGarbageSchedule,
} from '../controllers/garbageScheduleController.js';

import { createBill, updateBill } from '../controllers/billController.js';
import { createNotification } from '../controllers/notificationController.js';

const router = express.Router();

// Apply auth protection & staff/admin check to all admin routes
router.use(protect);

// Dashboard stats (staff & admin)
router.get('/dashboard/stats', staff, getDashboardStats);
router.get('/dashboard/recent-complaints', staff, getRecentComplaints);
router.get('/dashboard/category-stats', staff, getCategoryStats);
router.get('/dashboard/status-stats', staff, getStatusStats);

// Complaints Management (staff & admin)
router.get('/complaints', staff, getAllComplaints);
router.get('/complaints/:id', staff, getComplaintById);
router.put('/complaints/:id/status', staff, updateComplaintStatus);
router.put('/complaints/:id/assign', admin, assignStaffToComplaint);
router.delete('/complaints/:id', admin, deleteComplaint);

// Water Schedule Management (admin)
router.post('/water-schedule', admin, createWaterSchedule);
router.put('/water-schedule/:id', admin, updateWaterSchedule);
router.delete('/water-schedule/:id', admin, deleteWaterSchedule);

// Garbage Schedule Management (admin)
router.post('/garbage-schedule', admin, createGarbageSchedule);
router.put('/garbage-schedule/:id', admin, updateGarbageSchedule);
router.delete('/garbage-schedule/:id', admin, deleteGarbageSchedule);

// Bill Management (admin)
router.post('/bills', admin, createBill);
router.put('/bills/:id', admin, updateBill);

// Notification Broadcasting (admin)
router.post('/notifications', admin, createNotification);

export default router;
