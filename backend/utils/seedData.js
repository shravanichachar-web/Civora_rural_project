import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Complaint } from '../models/Complaint.js';
import { WaterSchedule } from '../models/WaterSchedule.js';
import { GarbageSchedule } from '../models/GarbageSchedule.js';
import { Bill } from '../models/Bill.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civora');
    console.log('[Seed] Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany();
    await Complaint.deleteMany();
    await WaterSchedule.deleteMany();
    await GarbageSchedule.deleteMany();
    await Bill.deleteMany();
    await Notification.deleteMany();

    console.log('[Seed] Cleared existing data...');

    // Seed Users (Admin, Staff, Citizen)
    const adminUser = await User.create({
      name: 'KMC Admin Office',
      email: 'admin@kolhapur.gov.in',
      phone: '9822000000',
      password: 'adminpassword123',
      role: 'admin',
      address: 'Kolhapur Municipal Corporation Head Office, Kolhapur',
    });

    const staffUser = await User.create({
      name: 'Suresh Patil (Inspector)',
      email: 'staff@kolhapur.gov.in',
      phone: '9822011223',
      password: 'staffpassword123',
      role: 'staff',
      address: 'Ward 4 Sanitation Office, Kasba Bawada, Kolhapur',
    });

    const citizenUser = await User.create({
      name: 'Rohan Kumbhar',
      email: 'citizen@kolhapur.gov.in',
      phone: '9876543210',
      password: 'citizenpassword123',
      role: 'citizen',
      address: 'House No. 142, Main Road, Kasba Bawada, Kolhapur',
    });

    console.log('[Seed] Users seeded successfully!');

    // Seed Water Schedules
    await WaterSchedule.insertMany([
      { area: 'Kasba Bawada Main Road', startTime: '06:00 AM', endTime: '08:00 AM', status: 'Active', announcement: 'Normal water pressure maintained' },
      { area: 'Shivaji Nagar', startTime: '07:00 AM', endTime: '09:00 AM', status: 'Active', announcement: 'Water pipeline maintenance scheduled for Thursday' },
      { area: 'Market Area', startTime: '06:30 AM', endTime: '08:30 AM', status: 'Active', announcement: 'Regular daily supply' },
      { area: 'Rajarampuri', startTime: '07:00 AM', endTime: '08:30 AM', status: 'Active', announcement: 'Mon-Sat morning supply' },
      { area: 'Bus Stand Area', startTime: '08:00 AM', endTime: '09:00 AM', status: 'Active', announcement: 'Daily water supply' },
    ]);
    console.log('[Seed] Water schedules seeded successfully!');

    // Seed Garbage Schedules
    await GarbageSchedule.insertMany([
      { area: 'Kasba Bawada Main Road', collectionTime: '08:00 AM', vehicleNumber: 'G001', driverName: 'Ramesh Pawar', status: 'On Route' },
      { area: 'Shivaji Nagar', collectionTime: '09:00 AM', vehicleNumber: 'G002', driverName: 'Prakash Kamble', status: 'Scheduled' },
      { area: 'Market Area', collectionTime: '10:00 AM', vehicleNumber: 'G003', driverName: 'Vinayak Shinde', status: 'Scheduled' },
      { area: 'Rajarampuri', collectionTime: '09:30 AM', vehicleNumber: 'G002', driverName: 'Prakash Kamble', status: 'Scheduled' },
      { area: 'Bus Stand Area', collectionTime: '08:30 AM', vehicleNumber: 'G001', driverName: 'Ramesh Pawar', status: 'Scheduled' },
    ]);
    console.log('[Seed] Garbage schedules seeded successfully!');

    // Seed Complaints
    await Complaint.create({
      userId: citizenUser._id,
      title: 'Garbage Not Collected for 2 Days',
      description: 'Waste bin has not been emptied for 2 days on Main Road. High accumulation causing foul odor.',
      category: 'Garbage Not Collected',
      location: 'Main Road, Kasba Bawada, Kolhapur',
      latitude: 16.7105,
      longitude: 74.2415,
      status: 'Pending',
      priority: 'High',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    });

    await Complaint.create({
      userId: citizenUser._id,
      title: 'Street Light Defective',
      description: 'Street light near House No 45 is flickering continuously.',
      category: 'Street Lighting',
      location: 'Shivaji Nagar, Kolhapur',
      latitude: 16.7025,
      longitude: 74.2388,
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: staffUser._id,
      adminRemark: 'Assigned to Suresh Patil for inspection',
    });
    console.log('[Seed] Complaints seeded successfully!');

    // Seed Bills
    await Bill.insertMany([
      {
        userId: citizenUser._id,
        billType: 'Property Tax',
        propertyNumber: 'PT-KMC-2026-4421',
        amount: 2450,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        paymentStatus: 'Due',
      },
      {
        userId: citizenUser._id,
        billType: 'Water Bill',
        propertyNumber: 'WB-KMC-2026-8812',
        amount: 480,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        paymentStatus: 'Due',
      },
    ]);
    console.log('[Seed] Bills seeded successfully!');

    // Seed Notifications
    await Notification.insertMany([
      {
        userId: citizenUser._id,
        title: 'Water Supply Alert',
        message: 'Water pipeline maintenance scheduled for Kasba Bawada area tomorrow 2 PM - 4 PM.',
        type: 'water',
      },
      {
        userId: null,
        title: 'Clean City Initiative 2026',
        message: 'Join Kolhapur Municipal Corporation drive for segregated waste collection.',
        type: 'announcement',
      },
    ]);
    console.log('[Seed] Notifications seeded successfully!');

    console.log('\n========================================');
    console.log(' SEEDING COMPLETED SUCCESSFULLY! ');
    console.log('========================================');
    console.log('Admin Login: admin@kolhapur.gov.in / adminpassword123');
    console.log('Staff Login: staff@kolhapur.gov.in / staffpassword123');
    console.log('Citizen Login: citizen@kolhapur.gov.in / citizenpassword123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
