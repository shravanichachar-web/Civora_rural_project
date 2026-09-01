import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import waterScheduleRoutes from './routes/waterScheduleRoutes.js';
import garbageScheduleRoutes from './routes/garbageScheduleRoutes.js';
import billRoutes from './routes/billRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Load Environment Variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint (Phase 1 Requirement)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Civora Backend Server is running smoothly!',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes Mount
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/water-schedule', waterScheduleRoutes);
app.use('/api/garbage-schedule', garbageScheduleRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found on Civora Server`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Civora Backend API Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});
