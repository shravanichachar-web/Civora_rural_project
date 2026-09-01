import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Citizen,
  Employee,
  Complaint,
  Bill,
  WaterSchedule,
  GarbageTruckSchedule,
  CertificateRequest,
  NotificationItem,
  AdminStats,
  WaterScheduleItem,
  GarbageScheduleItem,
  KolhapurArea,
  LanguageCode,
} from '../types';
import { translations, getTranslation } from '../lib/translations';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db, uploadComplaintPhoto } from '../lib/firebase';
import { api } from '../services/api';

export const KMC_AREAS: KolhapurArea[] = [
  'Kasba Bawada Main Road',
  'Shivaji Nagar',
  'Market Area',
  'Rajarampuri',
  'Bus Stand Area',
];

export const initialEmployees: Employee[] = [
  { id: 'EMP001', name: 'Suresh Patil', department: 'Sanitation & Solid Waste', mobile: '9822011223', role: 'Chief Sanitation Inspector', assignedArea: 'Kasba Bawada Main Road', activeComplaints: 2, status: 'On Field' },
  { id: 'EMP002', name: 'Vijay More', department: 'Water Supply Department', mobile: '9822022334', role: 'Senior Water Engineer', assignedArea: 'Kasba Bawada Main Road', activeComplaints: 1, status: 'Active' },
  { id: 'EMP003', name: 'Aniket Jadhav', department: 'Electrical Maintenance', mobile: '9822033445', role: 'Electrical Supervisor', assignedArea: 'Market Area', activeComplaints: 0, status: 'Active' },
  { id: 'EMP004', name: 'Ramesh Shinde', department: 'Roads & Civil Infrastructure', mobile: '9822044556', role: 'Junior Civil Engineer', assignedArea: 'Bus Stand Area', activeComplaints: 1, status: 'On Field' },
  { id: 'EMP005', name: 'Mangal Kamble', department: 'Drainage & Sewage Board', mobile: '9822055667', role: 'Drainage Inspector', assignedArea: 'Rajarampuri', activeComplaints: 1, status: 'Active' },
];

export const initialCitizens: Citizen[] = [
  {
    id: 'C001',
    name: 'Rohan Kumbhar',
    area: 'Kasba Bawada Main Road',
    mobile: '9876543210',
    email: 'rohan.kumbhar@kolhapur.gov.in',
    address: 'House No. 142, Main Road, Kasba Bawada, Kolhapur, Maharashtra - 416006',
  },
  {
    id: 'C002',
    name: 'Priya Patil',
    area: 'Shivaji Nagar',
    mobile: '9876543211',
    email: 'priya.patil@kolhapur.gov.in',
    address: 'Plot 45, Near Temple, Shivaji Nagar, Kolhapur, Maharashtra - 416008',
  },
  {
    id: 'C003',
    name: 'Amit Jadhav',
    area: 'Market Area',
    mobile: '9876543212',
    email: 'amit.jadhav@kolhapur.gov.in',
    address: 'Shop No. 12, Main Market Area, Kolhapur, Maharashtra - 416002',
  },
  {
    id: 'C004',
    name: 'Sneha Shinde',
    area: 'Rajarampuri',
    mobile: '9876543213',
    email: 'sneha.shinde@kolhapur.gov.in',
    address: 'Lane 3, Rajarampuri, Kolhapur, Maharashtra - 416008',
  },
  {
    id: 'C005',
    name: 'Rahul More',
    area: 'Bus Stand Area',
    mobile: '9876543214',
    email: 'rahul.more@kolhapur.gov.in',
    address: 'Near Bus Stand, Bus Stand Area, Kolhapur, Maharashtra - 416001',
  },
];

export const initialWaterSchedules: WaterScheduleItem[] = [
  { id: 'w-1', area: 'Kasba Bawada Main Road', time: '6:00 AM–8:00 AM', days: 'Mon, Wed, Fri', status: 'Active' },
  { id: 'w-2', area: 'Shivaji Nagar', time: '7:00 AM–9:00 AM', days: 'Tue, Thu, Sat', status: 'Active' },
  { id: 'w-3', area: 'Market Area', time: '6:30 AM–8:30 AM', days: 'Daily', status: 'Active' },
  { id: 'w-4', area: 'Rajarampuri', time: '7:00 AM–8:30 AM', days: 'Mon–Sat', status: 'Active' },
  { id: 'w-5', area: 'Bus Stand Area', time: '8:00 AM–9:00 AM', days: 'Daily', status: 'Active' },
];

export const initialGarbageSchedules: GarbageScheduleItem[] = [
  { id: 'g-1', area: 'Kasba Bawada Main Road', time: '8:00 AM', vehicle: 'G001', status: 'On Route' },
  { id: 'g-2', area: 'Shivaji Nagar', time: '9:00 AM', vehicle: 'G002', status: 'Scheduled' },
  { id: 'g-3', area: 'Market Area', time: '10:00 AM', vehicle: 'G003', status: 'Scheduled' },
  { id: 'g-4', area: 'Rajarampuri', time: '9:30 AM', vehicle: 'G002', status: 'Scheduled' },
  { id: 'g-5', area: 'Bus Stand Area', time: '8:30 AM', vehicle: 'G001', status: 'Scheduled' },
];

export const waterSchedulesByArea: Record<string, { time: string; days: string }> = {
  'Kasba Bawada Main Road': { time: '6:00 AM–8:00 AM', days: 'Mon, Wed, Fri' },
  'Shivaji Nagar': { time: '7:00 AM–9:00 AM', days: 'Tue, Thu, Sat' },
  'Market Area': { time: '6:30 AM–8:30 AM', days: 'Daily' },
  'Rajarampuri': { time: '7:00 AM–8:30 AM', days: 'Mon–Sat' },
  'Bus Stand Area': { time: '8:00 AM–9:00 AM', days: 'Daily' },
};

export const garbageSchedulesByArea: Record<string, { time: string; vehicle: string }> = {
  'Kasba Bawada Main Road': { time: '8:00 AM', vehicle: 'G001' },
  'Shivaji Nagar': { time: '9:00 AM', vehicle: 'G002' },
  'Market Area': { time: '10:00 AM', vehicle: 'G003' },
  'Rajarampuri': { time: '9:30 AM', vehicle: 'G002' },
  'Bus Stand Area': { time: '8:30 AM', vehicle: 'G001' },
};

const defaultUser: UserProfile = {
  id: 'C001',
  name: 'Rohan Kumbhar',
  email: 'rohan.kumbhar@kolhapur.gov.in',
  mobile: '9876543210',
  role: 'citizen',
  ward: 'Kasba Bawada Main Road, Kolhapur',
  address: 'House No. 142, Main Road, Kasba Bawada, Kolhapur, Maharashtra - 416006',
  aadhaarVerified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  state: 'Maharashtra',
  city: 'Kolhapur',
  area: 'Kasba Bawada Main Road',
};

const initialComplaints: Complaint[] = [
  {
    id: 'CMP001',
    referenceNo: 'CMP001',
    category: 'Garbage Not Collected',
    description: 'Waste bin has not been emptied for 2 days on Main Road. High accumulation causing foul odor.',
    location: 'Main Road, Kasba Bawada, Kolhapur',
    ward: 'Kasba Bawada',
    status: 'Pending',
    department: 'Sanitation & Solid Waste Dept',
    submittedAt: 'Jul 22, 2026, 09:15 AM',
    updatedAt: 'Jul 22, 2026, 09:15 AM',
    activityLog: [
      {
        title: 'Complaint Registered',
        description: 'Assigned reference ID CMP001 and dispatched to sanitation supervisor.',
        timestamp: 'Jul 22, 09:15 AM',
        actor: 'Rohan Kumbhar',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP002',
    referenceNo: 'CMP002',
    category: 'Water Leakage',
    description: 'Water pipeline leak near temple valve box, leading to clean water wastage on pavement.',
    location: 'Shivaji Nagar, Kolhapur',
    ward: 'Shivaji Nagar',
    status: 'In Progress',
    department: 'Kolhapur Water Supply Dept',
    submittedAt: 'Jul 21, 2026, 08:30 AM',
    updatedAt: 'Jul 22, 2026, 10:00 AM',
    activityLog: [
      {
        title: 'Technician Dispatched',
        description: 'Repair crew dispatched with replacement seal joints.',
        timestamp: 'Jul 22, 10:00 AM',
        actor: 'Water Supervisor',
      },
      {
        title: 'Complaint Submitted',
        description: 'Received report from Priya Patil.',
        timestamp: 'Jul 21, 08:30 AM',
        actor: 'Priya Patil',
      },
    ],
    comments: [
      {
        id: 'c-2',
        author: 'Inspector S. Patil',
        role: 'Water Field Officer',
        text: 'Pipe sealing operation underway. Pressure stabilized.',
        timestamp: '10:15 AM',
      },
    ],
  },
  {
    id: 'CMP003',
    referenceNo: 'CMP003',
    category: 'Street Light Fault',
    description: 'Pole #14 flickering continuously and dark after 8 PM.',
    location: 'Market Area, Kolhapur',
    ward: 'Market Area',
    status: 'Resolved',
    department: 'Electrical Maintenance Dept',
    submittedAt: 'Jul 19, 2026, 07:20 PM',
    updatedAt: 'Jul 20, 2026, 11:30 AM',
    activityLog: [
      {
        title: 'Bulb Replaced',
        description: 'LED module replaced and tested OK.',
        timestamp: 'Jul 20, 11:30 AM',
        actor: 'Electrical Crew #2',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP004',
    referenceNo: 'CMP004',
    category: 'Road Damage',
    description: 'Large pothole near the main entrance causing traffic slowdown.',
    location: 'Bus Stand, Kolhapur',
    ward: 'Bus Stand',
    status: 'Pending',
    department: 'Roads & Infrastructure Division',
    submittedAt: 'Jul 22, 2026, 02:10 PM',
    updatedAt: 'Jul 22, 2026, 02:10 PM',
    activityLog: [
      {
        title: 'Registered in System',
        description: 'Queued for road patch repair schedule.',
        timestamp: 'Jul 22, 02:10 PM',
        actor: 'System Auto-Dispatcher',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP005',
    referenceNo: 'CMP005',
    category: 'Drainage Blockage',
    description: 'Stormwater drain overflowing due to silt accumulation.',
    location: 'Kasba Bawada, Kolhapur',
    ward: 'Kasba Bawada',
    status: 'In Progress',
    department: 'Drainage & Sewage Board',
    submittedAt: 'Jul 21, 2026, 11:45 AM',
    updatedAt: 'Jul 22, 2026, 09:00 AM',
    activityLog: [
      {
        title: 'Cleaning Machinery Deployed',
        description: 'Suction jetting machine deployed on site.',
        timestamp: 'Jul 22, 09:00 AM',
        actor: 'Drainage Supervisor',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP006',
    referenceNo: 'CMP006',
    category: 'Broken Footpath',
    description: 'Damaged paver blocks on pedestrian walking pathway.',
    location: 'Rajarampuri Extension, Kolhapur',
    ward: 'Rajarampuri Extension',
    status: 'Pending',
    department: 'Civil Maintenance Dept',
    submittedAt: 'Jul 20, 2026, 04:30 PM',
    updatedAt: 'Jul 20, 2026, 04:30 PM',
    activityLog: [
      {
        title: 'Logged',
        description: 'Submitted for ward civil work inspection.',
        timestamp: 'Jul 20, 04:30 PM',
        actor: 'Sneha Shinde',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP007',
    referenceNo: 'CMP007',
    category: 'Illegal Garbage Dump',
    description: 'Unauthorized dumping behind shop complex clear notice.',
    location: 'Market Area, Kolhapur',
    ward: 'Market Area',
    status: 'Resolved',
    department: 'Sanitation Dept',
    submittedAt: 'Jul 18, 2026, 08:00 AM',
    updatedAt: 'Jul 19, 2026, 03:00 PM',
    activityLog: [
      {
        title: 'Cleared & Sanitized',
        description: 'Site cleared and warning banner installed.',
        timestamp: 'Jul 19, 03:00 PM',
        actor: 'Sanitation Squad',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP008',
    referenceNo: 'CMP008',
    category: 'Water Supply Delay',
    description: 'Water pressure low and arrival delayed by 45 minutes.',
    location: 'Main Road, Kasba Bawada, Kolhapur',
    ward: 'Kasba Bawada',
    status: 'Pending',
    department: 'Kolhapur Water Supply Dept',
    submittedAt: 'Jul 23, 2026, 06:15 AM',
    updatedAt: 'Jul 23, 2026, 06:15 AM',
    activityLog: [
      {
        title: 'Reported',
        description: 'Valve timing being adjusted at pumping station.',
        timestamp: 'Jul 23, 06:15 AM',
        actor: 'Rahul More',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP009',
    referenceNo: 'CMP009',
    category: 'Open Manhole',
    description: 'Uncovered manhole near bus shelter needing immediate lid installation.',
    location: 'Bus Stand, Kolhapur',
    ward: 'Bus Stand',
    status: 'In Progress',
    department: 'Safety & Sewage Dept',
    submittedAt: 'Jul 22, 2026, 05:00 PM',
    updatedAt: 'Jul 23, 2026, 07:00 AM',
    activityLog: [
      {
        title: 'Barricade Erected',
        description: 'Safety cones placed; concrete lid fitting scheduled.',
        timestamp: 'Jul 23, 07:00 AM',
        actor: 'Field Inspector',
      },
    ],
    comments: [],
  },
  {
    id: 'CMP010',
    referenceNo: 'CMP010',
    category: 'Tree Branch Obstruction',
    description: 'Overhanging tree branches blocking power wires and street view.',
    location: 'Shivaji Nagar, Kolhapur',
    ward: 'Shivaji Nagar',
    status: 'Resolved',
    department: 'Horticulture & Parks Wing',
    submittedAt: 'Jul 17, 2026, 10:00 AM',
    updatedAt: 'Jul 18, 2026, 01:20 PM',
    activityLog: [
      {
        title: 'Branches Trimmed',
        description: 'Trees trimmed safely without line disruption.',
        timestamp: 'Jul 18, 01:20 PM',
        actor: 'Horticulture Team',
      },
    ],
    comments: [],
  },
];

const initialBills: Bill[] = [
  {
    id: 'bill-001',
    type: 'Water Bill',
    accountNo: 'KMC-WTR-8842',
    period: 'June - July 2026 Usage',
    amount: 420, // ₹420
    dueDate: '20 July 2026',
    status: 'Paid',
    paidDate: '18 July 2026',
    receiptNo: 'REC-KMC-99120',
    paymentMethod: 'UPI (GPay)',
  },
  {
    id: 'bill-002',
    type: 'Property Tax',
    accountNo: 'KMC-TAX-4892',
    period: 'Financial Year 2026-27',
    amount: 1850, // ₹1,850
    dueDate: '31 August 2026',
    status: 'Pending',
  },
  {
    id: 'bill-003',
    type: 'Sanitation Fee',
    accountNo: 'KMC-SAN-2210',
    period: 'Monthly Sanitation - July 2026',
    amount: 250, // ₹250
    dueDate: '15 July 2026',
    status: 'Paid',
    paidDate: '10 July 2026',
    receiptNo: 'REC-KMC-77189',
    paymentMethod: 'UPI (PhonePe)',
  },
  {
    id: 'bill-004',
    type: 'Street Light Tax',
    accountNo: 'KMC-SLT-1109',
    period: 'Quarterly Cess 2026',
    amount: 180, // ₹180
    dueDate: '15 August 2026',
    status: 'Pending',
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'water',
    title: '💧 Water Supply Alert',
    message: 'Water supply will be available today from 6:00 AM to 8:00 AM in Kasba Bawada Main Road.',
    area: 'Kasba Bawada Main Road',
    timestamp: '2026-07-23T05:00:00Z',
    date: '23 Jul 2026',
    time: '05:00 AM',
    timeAgo: '1h ago',
    priority: 'High Priority',
    read: false,
    categoryTag: 'Water Supply',
  },
  {
    id: 'notif-2',
    type: 'garbage',
    title: '🗑️ Garbage Collection Alert',
    message: 'The garbage collection vehicle will arrive at 8:00 AM in Kasba Bawada Main Road. Please keep your waste ready.',
    area: 'Kasba Bawada Main Road',
    timestamp: '2026-07-23T07:30:00Z',
    date: '23 Jul 2026',
    time: '07:30 AM',
    timeAgo: '30m ago',
    priority: 'Normal',
    read: false,
    categoryTag: 'Waste Management',
  },
  {
    id: 'notif-3',
    type: 'emergency',
    title: '⚠️ Water Supply Delay Notice',
    message: 'Water supply delayed by 30 minutes due to maintenance in Kasba Bawada Main Road.',
    area: 'Kasba Bawada Main Road',
    timestamp: '2026-07-23T06:15:00Z',
    date: '23 Jul 2026',
    time: '06:15 AM',
    timeAgo: '2h ago',
    priority: 'High Priority',
    read: false,
    categoryTag: 'Emergency',
  },
  {
    id: 'notif-4',
    type: 'maintenance',
    title: '🚧 Road Repair Work',
    message: 'Road repair work near Market Area from 10:00 AM to 4:00 PM. Please use alternate routes.',
    area: 'Market Area',
    timestamp: '2026-07-22T09:00:00Z',
    date: '22 Jul 2026',
    time: '09:00 AM',
    timeAgo: '1d ago',
    priority: 'Normal',
    read: true,
    categoryTag: 'Public Works',
  },
  {
    id: 'notif-5',
    type: 'announcement',
    title: '🎉 Swachh Bharat Cleanliness Drive',
    message: 'Independence Day cleanliness drive on 15 August across all municipal wards of Kolhapur.',
    area: 'All Areas',
    timestamp: '2026-07-21T10:00:00Z',
    date: '21 Jul 2026',
    time: '10:00 AM',
    timeAgo: '2d ago',
    priority: 'Info',
    read: true,
    categoryTag: 'Swachh Bharat',
  },
  {
    id: 'notif-6',
    type: 'water',
    title: '💧 Water Supply Alert',
    message: 'Water supply will be available today from 7:00 AM to 9:00 AM in Shivaji Nagar.',
    area: 'Shivaji Nagar',
    timestamp: '2026-07-23T06:00:00Z',
    date: '23 Jul 2026',
    time: '06:00 AM',
    timeAgo: '2h ago',
    priority: 'Normal',
    read: false,
    categoryTag: 'Water Supply',
  },
  {
    id: 'notif-7',
    type: 'garbage',
    title: '🗑️ Garbage Collection Alert',
    message: 'The garbage collection vehicle G002 will arrive at 9:30 AM in Rajarampuri. Please keep your waste ready.',
    area: 'Rajarampuri',
    timestamp: '2026-07-23T09:00:00Z',
    date: '23 Jul 2026',
    time: '09:00 AM',
    timeAgo: '3h ago',
    priority: 'Normal',
    read: true,
    categoryTag: 'Waste Management',
  },
];

const initialCertificates: CertificateRequest[] = [
  {
    id: 'cert-1',
    type: 'Birth Certificate',
    applicantName: 'Rohan Kumbhar',
    referenceNo: 'KMC-CERT-BIRTH-2026-101',
    appliedDate: '10 July 2026',
    status: 'Issued',
    downloadUrl: '#',
  },
  {
    id: 'cert-2',
    type: 'Residence Certificate',
    applicantName: 'Rohan Kumbhar',
    referenceNo: 'KMC-CERT-RES-2026-402',
    appliedDate: '15 July 2026',
    status: 'Approved',
    downloadUrl: '#',
  },
];

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  citizens: Citizen[];
  employees: Employee[];
  addEmployee: (data: Omit<Employee, 'id' | 'activeComplaints'>) => void;
  editEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  assignComplaintToEmployee: (complaintId: string, employeeId: string, employeeName: string, remark?: string) => void;

  selectCitizenProfile: (citizenId: string) => void;
  updateUserArea: (area: string, state?: string, city?: string) => void;
  registerUser: (data: { name: string; email: string; mobile: string; area: string; state?: string; city?: string }) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  isLiveChatOpen: boolean;
  setIsLiveChatOpen: (open: boolean) => void;

  complaints: Complaint[];
  addComplaint: (newComplaint: Omit<Complaint, 'id' | 'referenceNo' | 'status' | 'submittedAt' | 'updatedAt' | 'activityLog' | 'comments'>) => Complaint;
  addComplaintComment: (complaintId: string, text: string, photoUrl?: string) => void;
  updateComplaintStatus: (complaintId: string, status: Complaint['status'], note?: string, photos?: { beforePhotoUrl?: string; afterPhotoUrl?: string }) => void;

  bills: Bill[];
  payBill: (billId: string, paymentMethod: string) => void;
  updateBillStatus: (billId: string, status: Bill['status']) => void;

  waterSchedule: WaterSchedule;
  updateWaterArea: (area: string) => void;
  waterScheduleItems: WaterScheduleItem[];
  addWaterScheduleItem: (item: Omit<WaterScheduleItem, 'id'>) => void;
  editWaterScheduleItem: (id: string, item: Partial<WaterScheduleItem>) => void;
  deleteWaterScheduleItem: (id: string) => void;

  garbageSchedule: GarbageTruckSchedule;
  updateGarbageArea: (area: string) => void;
  garbageScheduleItems: GarbageScheduleItem[];
  addGarbageScheduleItem: (item: Omit<GarbageScheduleItem, 'id'>) => void;
  editGarbageScheduleItem: (id: string, item: Partial<GarbageScheduleItem>) => void;
  deleteGarbageScheduleItem: (id: string) => void;

  certificates: CertificateRequest[];
  applyCertificate: (type: CertificateRequest['type'], applicantName: string) => CertificateRequest;
  approveCertificate: (certId: string, remarks?: string) => void;
  rejectCertificate: (certId: string, remarks?: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'timeAgo' | 'read' | 'date' | 'time'> & { date?: string; time?: string }) => void;
  sendAreaAlert: (data: { title: string; message: string; area: string; type: NotificationItem['type']; priority?: NotificationItem['priority'] }) => void;

  adminStats: AdminStats;
  switchUserRole: (role: 'citizen' | 'admin' | 'employee') => void;
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => { success: boolean; error?: string };
  adminLogout: () => void;

  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;

  isEmployeeAuthenticated: boolean;
  employeeUser: Employee | null;
  employeeLogin: (employeeIdOrMobile: string, pass: string) => { success: boolean; employee?: Employee; error?: string };
  employeeLogout: () => void;

  updateEmployeeWorkStatus: (complaintId: string, payload: {
    stage: 'Work Accepted' | 'Work Started' | 'In Progress' | 'Completed' | 'Rejected';
    remark?: string;
    beforePhotoUrl?: string;
    afterPhotoUrl?: string;
    gpsLocation?: { lat: number; lng: number };
  }) => void;
  submitComplaintFeedback: (complaintId: string, rating: number, feedbackText: string) => void;

  favoriteServices: string[];
  toggleFavoriteService: (serviceId: string) => void;
  recentlyUsedServices: string[];
  addRecentlyUsedService: (serviceId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('civora_admin_auth') === 'true';
  });
  const [isEmployeeAuthenticated, setIsEmployeeAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('civora_emp_auth') === 'true';
  });
  const [employeeUser, setEmployeeUser] = useState<Employee | null>(() => {
    const savedEmp = localStorage.getItem('civora_emp_data');
    return savedEmp ? JSON.parse(savedEmp) : null;
  });
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [favoriteServices, setFavoriteServices] = useState<string[]>(['file-complaint', 'water-schedule', 'pay-bills']);
  const [recentlyUsedServices, setRecentlyUsedServices] = useState<string[]>(['file-complaint', 'track-complaint', 'water-schedule']);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const toggleFavoriteService = (serviceId: string) => {
    setFavoriteServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const addRecentlyUsedService = (serviceId: string) => {
    setRecentlyUsedServices((prev) => [serviceId, ...prev.filter((id) => id !== serviceId)].slice(0, 5));
  };

  const employeeLogin = (employeeIdOrMobile: string, pass: string) => {
    const term = employeeIdOrMobile.trim().toLowerCase();
    const emp = employees.find(
      (e) => e.id.toLowerCase() === term || e.mobile === term || e.name.toLowerCase().includes(term)
    ) || initialEmployees[0];

    if (emp && (pass === 'emp123' || pass.length >= 3)) {
      setIsEmployeeAuthenticated(true);
      setEmployeeUser(emp);
      localStorage.setItem('civora_emp_auth', 'true');
      localStorage.setItem('civora_emp_data', JSON.stringify(emp));
      return { success: true, employee: emp };
    }
    return { success: false, error: 'Invalid Employee ID or Mobile Number. (Try: EMP001 / Pass: emp123)' };
  };

  const employeeLogout = () => {
    setIsEmployeeAuthenticated(false);
    setEmployeeUser(null);
    localStorage.removeItem('civora_emp_auth');
    localStorage.removeItem('civora_emp_data');
  };
  const [user, setUser] = useState<UserProfile>(() => {
    const isAuth = localStorage.getItem('civora_admin_auth') === 'true';
    if (isAuth) {
      return {
        ...defaultUser,
        role: 'admin',
        name: 'Officer S. P. Patil (KMC Admin)',
        email: 'admin.kmc@kolhapur.gov.in',
        ward: 'Kasba Bawada Ward Command',
      };
    }
    return defaultUser;
  });
  const [citizens] = useState<Citizen[]>(initialCitizens);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [certificates, setCertificates] = useState<CertificateRequest[]>(initialCertificates);

  const [waterScheduleItems, setWaterScheduleItems] = useState<WaterScheduleItem[]>(initialWaterSchedules);
  const [garbageScheduleItems, setGarbageScheduleItems] = useState<GarbageScheduleItem[]>(initialGarbageSchedules);

  const [waterSchedule, setWaterSchedule] = useState<WaterSchedule>({
    area: 'Kasba Bawada Main Road',
    currentState: 'Flowing',
    lastUpdated: '5m ago',
    nextDay: 'Mon, Wed, Fri',
    supplyWindow: '6:00 AM–8:00 AM',
    days: 'Mon, Wed, Fri',
    pressureBar: 3.4,
    durationPercent: 65,
    minutesRemaining: 75,
    systemHealth: 'Optimal Flow (KMC Grid)',
    upcoming: [
      { day: 'Friday', window: '6:00 AM–8:00 AM', status: 'Normal Supply' },
      { day: 'Sunday', window: '10:00 AM–2:00 PM', status: 'Maintenance Window' },
      { day: 'Monday', window: '6:00 AM–8:00 AM', status: 'Full Capacity' },
    ],
  });

  const [garbageSchedule, setGarbageSchedule] = useState<GarbageTruckSchedule>({
    area: 'Kasba Bawada Main Road',
    nextDay: 'Daily Pickup',
    nextTime: '8:00 AM',
    truckNumber: 'Vehicle G001',
    distanceKm: 0.8,
    etaMinutes: 10,
    status: 'Arriving Soon',
    wasteTypes: ['Wet Waste (Organic)', 'Dry Recyclables'],
    alertMessage: 'Vehicle timing updated for Kasba Bawada Main Road.',
    lat: 16.7183,
    lng: 74.248,
  });

  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalCitizens: 12480,
    totalComplaints: 10,
    pendingComplaints: 5,
    assignedComplaints: 2,
    inProgressComplaints: 2,
    resolvedToday: 3,
    rejectedComplaints: 0,
    totalEmployees: 5,
    activeTrucks: 3, // G001, G002, G003
    totalRevenueRupees: 670, // Paid water ₹420 + sanitation ₹250
    waterPumpingActive: true,
  });

  // --- Node.js Express Backend API Synchronization ---
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const health = await api.checkHealth();
        console.log('[Civora API] Express Backend connected:', health.message);

        // Fetch schedules from Node.js Express backend
        const waterRes = await api.getWaterSchedules();
        if (waterRes && waterRes.data && waterRes.data.length > 0) {
          const apiWaterItems: WaterScheduleItem[] = waterRes.data.map((w: any, index: number) => ({
            id: w._id || `w-${index}`,
            area: w.area,
            time: `${w.startTime}–${w.endTime}`,
            days: w.date || 'Daily',
            status: w.status || 'Active',
          }));
          setWaterScheduleItems(apiWaterItems);
        }

        const garbageRes = await api.getGarbageSchedules();
        if (garbageRes && garbageRes.data && garbageRes.data.length > 0) {
          const apiGarbageItems: GarbageScheduleItem[] = garbageRes.data.map((g: any, index: number) => ({
            id: g._id || `g-${index}`,
            area: g.area,
            time: g.collectionTime,
            vehicle: g.vehicleNumber,
            status: g.status || 'Scheduled',
          }));
          setGarbageScheduleItems(apiGarbageItems);
        }
      } catch (err: any) {
        console.log('[Civora API] Backend offline or unreachable, using local fallback state.');
      }
    };

    fetchBackendData();
  }, []);

  // --- Real-Time Firestore Synchronization ---
  useEffect(() => {
    // 1. Complaints Subscription
    const unsubComplaints = onSnapshot(collection(db, 'complaints'), async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial complaints to Firestore if empty
        for (const c of initialComplaints) {
          try {
            await setDoc(doc(db, 'complaints', c.id), c);
          } catch (e) {
            console.warn('Firestore seed complaint warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as Complaint);
        // Sort newest first
        loaded.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
        setComplaints(loaded);

        // Update admin stats dynamically
        const total = loaded.length;
        const pending = loaded.filter((c) => c.status === 'Pending').length;
        const assigned = loaded.filter((c) => c.status === 'Assigned').length;
        const inProgress = loaded.filter((c) => c.status === 'In Progress').length;
        const resolved = loaded.filter((c) => c.status === 'Resolved').length;
        const rejected = loaded.filter((c) => c.status === 'Rejected').length;

        setAdminStats((prev) => ({
          ...prev,
          totalComplaints: total,
          pendingComplaints: pending,
          assignedComplaints: assigned,
          inProgressComplaints: inProgress,
          resolvedToday: resolved,
          rejectedComplaints: rejected,
        }));
      }
    });

    // 2. Notifications Subscription
    const unsubNotifs = onSnapshot(collection(db, 'notifications'), async (snapshot) => {
      if (snapshot.empty) {
        for (const n of initialNotifications) {
          try {
            await setDoc(doc(db, 'notifications', n.id), n);
          } catch (e) {
            console.warn('Firestore seed notification warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as NotificationItem);
        loaded.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setNotifications(loaded);
      }
    });

    // 3. Water Schedules Subscription
    const unsubWater = onSnapshot(collection(db, 'waterSchedules'), async (snapshot) => {
      if (snapshot.empty) {
        for (const w of initialWaterSchedules) {
          try {
            await setDoc(doc(db, 'waterSchedules', w.id), w);
          } catch (e) {
            console.warn('Firestore seed water schedule warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as WaterScheduleItem);
        setWaterScheduleItems(loaded);
      }
    });

    // 4. Garbage Schedules Subscription
    const unsubGarbage = onSnapshot(collection(db, 'garbageSchedules'), async (snapshot) => {
      if (snapshot.empty) {
        for (const g of initialGarbageSchedules) {
          try {
            await setDoc(doc(db, 'garbageSchedules', g.id), g);
          } catch (e) {
            console.warn('Firestore seed garbage schedule warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as GarbageScheduleItem);
        setGarbageScheduleItems(loaded);
      }
    });

    // 5. Bills Subscription
    const unsubBills = onSnapshot(collection(db, 'bills'), async (snapshot) => {
      if (snapshot.empty) {
        for (const b of initialBills) {
          try {
            await setDoc(doc(db, 'bills', b.id), b);
          } catch (e) {
            console.warn('Firestore seed bill warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as Bill);
        setBills(loaded);
      }
    });

    // 6. Certificates Subscription
    const unsubCerts = onSnapshot(collection(db, 'certificates'), async (snapshot) => {
      if (snapshot.empty) {
        for (const cert of initialCertificates) {
          try {
            await setDoc(doc(db, 'certificates', cert.id), cert);
          } catch (e) {
            console.warn('Firestore seed certificate warning:', e);
          }
        }
      } else {
        const loaded = snapshot.docs.map((docSnap) => docSnap.data() as CertificateRequest);
        setCertificates(loaded);
      }
    });

    // 7. Users Subscription
    const unsubUsers = onSnapshot(collection(db, 'users'), async (snapshot) => {
      if (snapshot.empty) {
        for (const cit of initialCitizens) {
          try {
            await setDoc(doc(db, 'users', cit.id), cit);
          } catch (e) {
            console.warn('Firestore seed user warning:', e);
          }
        }
      }
    });

    // Firebase Auth state listener
    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email === 'admin.kmc@kolhapur.gov.in') {
          setIsAdminAuthenticated(true);
          localStorage.setItem('civora_admin_auth', 'true');
          setUser({
            ...defaultUser,
            role: 'admin',
            name: 'Officer S. P. Patil (KMC Admin)',
            email: 'admin.kmc@kolhapur.gov.in',
            ward: 'Kasba Bawada Ward Command',
          });
        }
      }
    });

    return () => {
      unsubComplaints();
      unsubNotifs();
      unsubWater();
      unsubGarbage();
      unsubBills();
      unsubCerts();
      unsubUsers();
      unsubAuth();
    };
  }, []);

  const selectCitizenProfile = (citizenId: string) => {
    const c = citizens.find((item) => item.id === citizenId);
    if (c) {
      setUser((prev) => ({
        ...prev,
        id: c.id,
        name: c.name,
        email: c.email || `${c.id.toLowerCase()}@kolhapur.gov.in`,
        mobile: c.mobile,
        ward: `${c.area}, Kolhapur`,
        address: c.address || `${c.area}, Kolhapur, Maharashtra`,
        state: 'Maharashtra',
        city: 'Kolhapur',
        area: c.area,
      }));
    }
  };

  const updateUserArea = (area: string, state: string = 'Maharashtra', city: string = 'Kolhapur') => {
    setUser((prev) => ({
      ...prev,
      area,
      state,
      city,
      ward: `${area}, ${city}`,
    }));
  };

  const registerUser = async (data: { name: string; email: string; mobile: string; area: string; state?: string; city?: string }) => {
    const nextId = `C${Math.floor(100 + Math.random() * 900)}`;
    const newState = data.state || 'Maharashtra';
    const newCity = data.city || 'Kolhapur';
    const newArea = data.area || 'Kasba Bawada Main Road';
    const userEmail = data.email || `${nextId.toLowerCase()}@kolhapur.gov.in`;

    try {
      await createUserWithEmailAndPassword(auth, userEmail, 'Citizen@123');
    } catch (e) {
      console.warn('Firebase Auth creation notice:', e);
    }

    const newUserObj: UserProfile = {
      id: nextId,
      name: data.name,
      email: userEmail,
      mobile: data.mobile,
      role: 'citizen',
      ward: `${newArea}, ${newCity}`,
      address: `${newArea}, ${newCity}, ${newState}`,
      aadhaarVerified: true,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`,
      state: newState,
      city: newCity,
      area: newArea,
    };

    setUser(newUserObj);

    try {
      await setDoc(doc(db, 'users', nextId), newUserObj);
    } catch (e) {
      console.warn('Error saving user to Firestore:', e);
    }

    addNotification({
      type: 'system',
      title: 'Welcome to Civora Municipal Portal',
      message: `Account registered successfully for ${data.name} in ${newArea}, ${newCity}. You will receive area-wise alerts here.`,
      area: newArea,
      priority: 'Normal',
      categoryTag: 'Account',
    });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const adminLogin = (usernameInput: string, passwordInput: string) => {
    if (usernameInput.trim().toLowerCase() === 'admin' && passwordInput === 'admin123') {
      // Fire-and-forget Firebase Auth login/creation for admin
      signInWithEmailAndPassword(auth, 'admin.kmc@kolhapur.gov.in', 'admin123').catch(() => {
        createUserWithEmailAndPassword(auth, 'admin.kmc@kolhapur.gov.in', 'admin123').catch(() => {});
      });

      setIsAdminAuthenticated(true);
      localStorage.setItem('civora_admin_auth', 'true');
      const adminObj: UserProfile = {
        ...defaultUser,
        role: 'admin',
        name: 'Officer S. P. Patil (KMC Admin)',
        email: 'admin.kmc@kolhapur.gov.in',
        ward: 'Kasba Bawada Ward Command',
      };
      setUser(adminObj);

      setDoc(doc(db, 'users', 'admin_kmc'), adminObj).catch(() => {});

      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid admin credentials. Demo Admin Username: admin | Password: admin123',
    };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('civora_admin_auth');
    signOut(auth).catch(() => {});
    setUser((prev) => ({
      ...prev,
      role: 'citizen',
      name: 'Rohan Kumbhar',
      email: 'rohan.kumbhar@kolhapur.gov.in',
      ward: 'Kasba Bawada Main Road, Kolhapur',
    }));
  };

  const addComplaint = (data: Omit<Complaint, 'id' | 'referenceNo' | 'status' | 'submittedAt' | 'updatedAt' | 'activityLog' | 'comments'>) => {
    const nextIdNum = complaints.length + 101;
    const refNo = `CMP${nextIdNum}`;
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const newObj: Complaint = {
      ...data,
      id: refNo,
      referenceNo: refNo,
      status: 'Pending',
      department: data.department || 'Kolhapur Municipal Services',
      submittedAt: nowStr,
      updatedAt: nowStr,
      activityLog: [
        {
          title: 'Grievance Registered',
          description: 'Ticket logged into Kolhapur Municipal dispatch center.',
          timestamp: nowStr,
          actor: user.name,
        },
      ],
      comments: [],
    };

    // Optimistic UI update
    setComplaints((prev) => [newObj, ...prev]);

    // Async upload photo to Firebase Storage and write to Firestore
    (async () => {
      let photoUrl = data.photoUrl || '';
      if (photoUrl) {
        photoUrl = await uploadComplaintPhoto(photoUrl, refNo, 'photo');
      }
      const finalComplaint = { ...newObj, photoUrl };
      try {
        await setDoc(doc(db, 'complaints', refNo), finalComplaint);
      } catch (err) {
        console.error('Error writing complaint to Firestore:', err);
      }
    })();

    addNotification({
      type: 'system',
      title: 'Complaint Registered',
      message: `Your complaint ${refNo} for ${data.category} at ${data.location} has been registered.`,
      area: user.area || 'Kasba Bawada Main Road',
      priority: 'Normal',
      categoryTag: 'Grievance',
    });

    return newObj;
  };

  const addComplaintComment = (complaintId: string, text: string, photoUrl?: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const target = complaints.find((c) => c.id === complaintId);
    if (!target) return;

    (async () => {
      let uploadedPhoto = photoUrl || '';
      if (photoUrl && photoUrl.startsWith('data:')) {
        uploadedPhoto = await uploadComplaintPhoto(photoUrl, complaintId, 'photo');
      }

      const newComment = {
        id: `comm-${Date.now()}`,
        author: user.name,
        role: user.role === 'admin' ? 'Municipal Officer' : 'Citizen',
        text,
        timestamp: nowStr,
        photoUrl: uploadedPhoto,
      };

      const updatedComments = [...(target.comments || []), newComment];
      try {
        await updateDoc(doc(db, 'complaints', complaintId), {
          comments: updatedComments,
        });
      } catch (err) {
        console.error('Error adding comment in Firestore:', err);
      }
    })();
  };

  const addEmployee = (data: Omit<Employee, 'id' | 'activeComplaints'>) => {
    const nextId = `EMP00${employees.length + 1}`;
    const newEmp: Employee = {
      ...data,
      id: nextId,
      activeComplaints: 0,
    };
    setEmployees((prev) => [...prev, newEmp]);
  };

  const editEmployee = (id: string, data: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const assignComplaintToEmployee = (complaintId: string, employeeId: string, employeeName: string, remark?: string) => {
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const target = complaints.find((c) => c.id === complaintId);
    const targetArea = target?.location || 'Kasba Bawada Main Road';

    const updatedLog = [
      {
        title: 'Complaint Assigned',
        description: `Assigned to staff member ${employeeName}. ${remark ? `Remark: ${remark}` : ''}`,
        timestamp: nowStr,
        actor: user.name,
      },
      ...(target?.activityLog || []),
    ];

    updateDoc(doc(db, 'complaints', complaintId), {
      status: 'Assigned',
      assignedTo: employeeName,
      assignedEmployeeId: employeeId,
      adminRemark: remark || `Assigned to staff officer ${employeeName}`,
      updatedAt: nowStr,
      activityLog: updatedLog,
    }).catch((err) => console.error('Firestore assign error:', err));

    addNotification({
      type: 'system',
      title: `Complaint ${complaintId} Assigned`,
      message: 'Your complaint has been assigned to a staff member.',
      area: targetArea,
      priority: 'Normal',
      categoryTag: 'Complaint Update',
    });
  };

  const updateComplaintStatus = (
    complaintId: string,
    status: Complaint['status'],
    note?: string,
    photos?: { beforePhotoUrl?: string; afterPhotoUrl?: string }
  ) => {
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const target = complaints.find((c) => c.id === complaintId);
    const targetArea = target?.location || 'Kasba Bawada Main Road';

    (async () => {
      let beforeUrl = photos?.beforePhotoUrl || target?.beforePhotoUrl || '';
      if (photos?.beforePhotoUrl && photos.beforePhotoUrl.startsWith('data:')) {
        beforeUrl = await uploadComplaintPhoto(photos.beforePhotoUrl, complaintId, 'before');
      }

      let afterUrl = photos?.afterPhotoUrl || target?.afterPhotoUrl || '';
      if (photos?.afterPhotoUrl && photos.afterPhotoUrl.startsWith('data:')) {
        afterUrl = await uploadComplaintPhoto(photos.afterPhotoUrl, complaintId, 'after');
      }

      const updatedLog = [
        {
          title: `Status updated to ${status}`,
          description: note || `Officer updated ticket status to ${status}.`,
          timestamp: nowStr,
          actor: user.name,
        },
        ...(target?.activityLog || []),
      ];

      const updatePayload: Partial<Complaint> = {
        status,
        adminRemark: note || target?.adminRemark || '',
        updatedAt: nowStr,
        activityLog: updatedLog,
      };
      if (beforeUrl) updatePayload.beforePhotoUrl = beforeUrl;
      if (afterUrl) updatePayload.afterPhotoUrl = afterUrl;

      try {
        await updateDoc(doc(db, 'complaints', complaintId), updatePayload);
      } catch (err) {
        console.error('Error updating complaint status in Firestore:', err);
      }
    })();

    // Mandatory Citizen Notification message formats
    let autoMessage = `Status updated for ${complaintId}: ${status}`;
    if (status === 'Pending') autoMessage = 'Your complaint has been received.';
    if (status === 'Assigned') autoMessage = 'Your complaint has been assigned to a staff member.';
    if (status === 'In Progress') autoMessage = 'Your complaint is currently being processed.';
    if (status === 'Resolved') autoMessage = 'Your complaint has been resolved successfully. Please verify the work and provide your feedback.';
    if (status === 'Rejected') autoMessage = 'Your complaint could not be processed. Please contact the Gram Panchayat office.';

    addNotification({
      type: status === 'Rejected' ? 'emergency' : 'system',
      title: `Complaint ${complaintId} Status: ${status}`,
      message: autoMessage,
      area: targetArea,
      priority: status === 'Resolved' ? 'High Priority' : 'Normal',
      categoryTag: 'Grievance',
    });
  };

  const updateBillStatus = (billId: string, status: Bill['status']) => {
    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, status } : b))
    );
  };

  const approveCertificate = (certId: string, remarks?: string) => {
    let certType = 'Certificate';
    const target = certificates.find((c) => c.id === certId);
    if (target) certType = target.type;

    updateDoc(doc(db, 'certificates', certId), {
      status: 'Approved',
      downloadUrl: '#',
      remarks: remarks || 'Verified and approved by KMC Officer',
    }).catch((e) => console.error('Error approving cert:', e));

    addNotification({
      type: 'system',
      title: 'Certificate Approved',
      message: `Your application for ${certType} has been approved by the municipal registrar.`,
      area: user.area || 'Kasba Bawada Main Road',
      priority: 'High Priority',
      categoryTag: 'Certificates',
    });
  };

  const rejectCertificate = (certId: string, remarks?: string) => {
    let certType = 'Certificate';
    const target = certificates.find((c) => c.id === certId);
    if (target) certType = target.type;

    updateDoc(doc(db, 'certificates', certId), {
      status: 'Rejected',
      remarks: remarks || 'Document verification incomplete. Please re-apply.',
    }).catch((e) => console.error('Error rejecting cert:', e));

    addNotification({
      type: 'emergency',
      title: 'Certificate Request Rejected',
      message: `Your application for ${certType} was rejected: ${remarks || 'Verification failed.'}`,
      area: user.area || 'Kasba Bawada Main Road',
      priority: 'Normal',
      categoryTag: 'Certificates',
    });
  };

  const payBill = (billId: string, paymentMethod: string) => {
    const todayStr = new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' });
    const receipt = `REC-KMC-${Math.floor(10000 + Math.random() * 90000)}`;

    const targetBill = bills.find((b) => b.id === billId);
    const paidAmt = targetBill?.amount || 0;

    updateDoc(doc(db, 'bills', billId), {
      status: 'Paid',
      paidDate: todayStr,
      receiptNo: receipt,
      paymentMethod,
    }).catch((e) => console.error('Error paying bill:', e));

    addNotification({
      type: 'system',
      title: 'Payment Confirmed',
      message: `Payment of ₹${paidAmt.toLocaleString('en-IN')} for ${billId} completed. Receipt: ${receipt}`,
      area: user.area || 'Kasba Bawada Main Road',
      priority: 'Info',
      categoryTag: 'Billing',
    });
  };

  const updateWaterArea = (area: string) => {
    const found = waterScheduleItems.find((w) => w.area.toLowerCase() === area.toLowerCase());
    const match = found
      ? { time: found.time, days: found.days }
      : { time: '6:00 AM–8:00 AM', days: 'Mon, Wed, Fri' };

    setWaterSchedule((prev) => ({
      ...prev,
      area,
      supplyWindow: match.time,
      nextDay: match.days,
      days: match.days,
    }));
  };

  const addWaterScheduleItem = (item: Omit<WaterScheduleItem, 'id'>) => {
    const newId = `w-${Date.now()}`;
    const newItem: WaterScheduleItem = {
      ...item,
      id: newId,
      status: item.status || 'Active',
    };
    
    setDoc(doc(db, 'waterSchedules', newId), newItem).catch((e) => console.error('Error adding water item:', e));

    addNotification({
      type: 'water',
      title: '💧 Water Supply Alert',
      message: `Water supply schedule updated: ${newItem.days} from ${newItem.time} in ${newItem.area}.`,
      area: newItem.area,
      priority: 'High Priority',
      categoryTag: 'Water Supply',
    });
  };

  const editWaterScheduleItem = (id: string, updatedFields: Partial<WaterScheduleItem>) => {
    updateDoc(doc(db, 'waterSchedules', id), updatedFields).catch((e) => console.error('Error editing water item:', e));

    const target = waterScheduleItems.find((w) => w.id === id);
    if (target) {
      addNotification({
        type: 'water',
        title: '💧 Water Supply Schedule Updated',
        message: `Water supply timing in ${updatedFields.area || target.area} updated to ${updatedFields.time || target.time} (${updatedFields.days || target.days}).`,
        area: updatedFields.area || target.area,
        priority: 'High Priority',
        categoryTag: 'Water Supply',
      });
    }
  };

  const deleteWaterScheduleItem = (id: string) => {
    const item = waterScheduleItems.find((w) => w.id === id);
    deleteDoc(doc(db, 'waterSchedules', id)).catch((e) => console.error('Error deleting water item:', e));

    if (item) {
      addNotification({
        type: 'water',
        title: '💧 Water Supply Advisory',
        message: `Water supply schedule for ${item.area} was revised by municipal department.`,
        area: item.area,
        priority: 'Info',
        categoryTag: 'Water Supply',
      });
    }
  };

  const updateGarbageArea = (area: string) => {
    const found = garbageScheduleItems.find((g) => g.area.toLowerCase() === area.toLowerCase());
    const match = found
      ? { time: found.time, vehicle: found.vehicle }
      : { time: '8:00 AM', vehicle: 'G001' };

    setGarbageSchedule((prev) => ({
      ...prev,
      area,
      nextTime: match.time,
      truckNumber: `Vehicle ${match.vehicle}`,
    }));
  };

  const addGarbageScheduleItem = (item: Omit<GarbageScheduleItem, 'id'>) => {
    const newId = `g-${Date.now()}`;
    const newItem: GarbageScheduleItem = {
      ...item,
      id: newId,
      status: item.status || 'Scheduled',
    };
    
    setDoc(doc(db, 'garbageSchedules', newId), newItem).catch((e) => console.error('Error adding garbage item:', e));

    addNotification({
      type: 'garbage',
      title: '🗑️ Garbage Collection Alert',
      message: `The garbage collection vehicle ${newItem.vehicle} will arrive at ${newItem.time} in ${newItem.area}. Please keep your waste ready.`,
      area: newItem.area,
      priority: 'Normal',
      categoryTag: 'Waste Management',
    });
  };

  const editGarbageScheduleItem = (id: string, updatedFields: Partial<GarbageScheduleItem>) => {
    updateDoc(doc(db, 'garbageSchedules', id), updatedFields).catch((e) => console.error('Error editing garbage item:', e));

    const target = garbageScheduleItems.find((g) => g.id === id);
    if (target) {
      addNotification({
        type: 'garbage',
        title: '🗑️ Garbage Vehicle Schedule Updated',
        message: `Garbage vehicle ${updatedFields.vehicle || target.vehicle} arrival time in ${updatedFields.area || target.area} set to ${updatedFields.time || target.time}.`,
        area: updatedFields.area || target.area,
        priority: 'Normal',
        categoryTag: 'Waste Management',
      });
    }
  };

  const deleteGarbageScheduleItem = (id: string) => {
    const item = garbageScheduleItems.find((g) => g.id === id);
    deleteDoc(doc(db, 'garbageSchedules', id)).catch((e) => console.error('Error deleting garbage item:', e));

    if (item) {
      addNotification({
        type: 'garbage',
        title: '🗑️ Sanitation Schedule Update',
        message: `Garbage collection schedule for ${item.area} was modified.`,
        area: item.area,
        priority: 'Info',
        categoryTag: 'Waste Management',
      });
    }
  };

  const applyCertificate = (type: CertificateRequest['type'], applicantName: string) => {
    const ref = `KMC-CERT-${type.substring(0, 4).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`;
    const todayStr = new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' });
    const newId = `cert-${Date.now()}`;

    const newCert: CertificateRequest = {
      id: newId,
      type,
      applicantName,
      referenceNo: ref,
      appliedDate: todayStr,
      status: 'Pending Verification',
    };

    setDoc(doc(db, 'certificates', newId), newCert).catch((e) => console.error('Error saving cert:', e));

    addNotification({
      type: 'system',
      title: 'Certificate Request Received',
      message: `Your application for ${type} (Ref: ${ref}) has been lodged with KMC registrar.`,
      area: user.area || 'Kasba Bawada Main Road',
      priority: 'Normal',
      categoryTag: 'Certificates',
    });

    return newCert;
  };

  const markNotificationRead = (id: string) => {
    updateDoc(doc(db, 'notifications', id), { read: true }).catch((e) => console.error(e));
  };

  const markAllNotificationsRead = () => {
    notifications.forEach((n) => {
      if (!n.read) {
        updateDoc(doc(db, 'notifications', n.id), { read: true }).catch((e) => console.error(e));
      }
    });
  };

  const deleteNotification = (id: string) => {
    deleteDoc(doc(db, 'notifications', id)).catch((e) => console.error(e));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'timeAgo' | 'read' | 'date' | 'time'> & { date?: string; time?: string }) => {
    const now = new Date();
    const dateStr = item.date || now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = item.time || now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const newId = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newNotif: NotificationItem = {
      ...item,
      id: newId,
      timestamp: now.toISOString(),
      date: dateStr,
      time: timeStr,
      timeAgo: 'Just now',
      read: false,
      area: item.area || 'All Areas',
    };

    setDoc(doc(db, 'notifications', newId), newNotif).catch((e) => console.error('Error saving notif:', e));
  };

  const sendAreaAlert = (data: { title: string; message: string; area: string; type: NotificationItem['type']; priority?: NotificationItem['priority'] }) => {
    addNotification({
      type: data.type,
      title: data.title,
      message: data.message,
      area: data.area,
      priority: data.priority || (data.type === 'emergency' ? 'High Priority' : 'Normal'),
      categoryTag: data.type === 'emergency' ? 'Emergency' : data.type === 'maintenance' ? 'Road & Works' : 'Announcement',
    });
  };

  const updateEmployeeWorkStatus = (
    complaintId: string,
    payload: {
      stage: 'Work Accepted' | 'Work Started' | 'In Progress' | 'Completed' | 'Rejected';
      remark?: string;
      beforePhotoUrl?: string;
      afterPhotoUrl?: string;
      gpsLocation?: { lat: number; lng: number };
    }
  ) => {
    const target = complaints.find((c) => c.id === complaintId);
    if (!target) return;

    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    let mappedStatus: Complaint['status'] = target.status;
    if (payload.stage === 'Work Accepted' || payload.stage === 'Work Started' || payload.stage === 'In Progress') {
      mappedStatus = 'In Progress';
    } else if (payload.stage === 'Completed') {
      mappedStatus = 'Resolved';
    } else if (payload.stage === 'Rejected') {
      mappedStatus = 'Rejected';
    }

    (async () => {
      let bUrl = payload.beforePhotoUrl || target.beforePhotoUrl || '';
      if (payload.beforePhotoUrl && payload.beforePhotoUrl.startsWith('data:')) {
        bUrl = await uploadComplaintPhoto(payload.beforePhotoUrl, complaintId, 'before');
      }

      let aUrl = payload.afterPhotoUrl || target.afterPhotoUrl || '';
      if (payload.afterPhotoUrl && payload.afterPhotoUrl.startsWith('data:')) {
        aUrl = await uploadComplaintPhoto(payload.afterPhotoUrl, complaintId, 'after');
      }

      const newLogItem = {
        title: `Employee Work Progress: ${payload.stage}`,
        description: payload.remark || `Employee updated task to ${payload.stage}.`,
        timestamp: nowStr,
        actor: employeeUser?.name || 'Staff Officer',
      };

      const updateData: Partial<Complaint> = {
        status: mappedStatus,
        workProgressStage: payload.stage,
        employeeRemark: payload.remark || target.employeeRemark,
        updatedAt: nowStr,
        activityLog: [newLogItem, ...(target.activityLog || [])],
      };

      if (bUrl) updateData.beforePhotoUrl = bUrl;
      if (aUrl) updateData.afterPhotoUrl = aUrl;
      if (payload.gpsLocation) {
        updateData.employeeGpsLocation = {
          ...payload.gpsLocation,
          timestamp: nowStr,
        };
      }

      try {
        await updateDoc(doc(db, 'complaints', complaintId), updateData);
      } catch (e) {
        console.error('Error updating employee work in Firestore:', e);
      }
    })();

    addNotification({
      type: mappedStatus === 'Resolved' ? 'system' : 'maintenance',
      title: `Complaint ${complaintId} Work ${payload.stage}`,
      message: `Assigned staff updated progress to ${payload.stage}. ${payload.remark ? `Remark: ${payload.remark}` : ''}`,
      area: target.location || 'Kasba Bawada Main Road',
      priority: mappedStatus === 'Resolved' ? 'High Priority' : 'Normal',
      categoryTag: 'Field Operations',
    });
  };

  const submitComplaintFeedback = (complaintId: string, rating: number, feedbackText: string) => {
    updateDoc(doc(db, 'complaints', complaintId), {
      citizenRating: rating,
      citizenFeedback: feedbackText,
    }).catch((e) => console.error('Error submitting feedback:', e));

    addNotification({
      type: 'system',
      title: 'Feedback Recorded',
      message: `Thank you! Your feedback for complaint #${complaintId} was recorded successfully.`,
      area: 'Kasba Bawada Main Road',
      priority: 'Info',
      categoryTag: 'Feedback',
    });
  };

  const switchUserRole = (role: 'citizen' | 'admin' | 'employee') => {
    if (role === 'admin') {
      setUser({
        ...user,
        role: 'admin',
        name: 'Officer S. P. Patil (KMC Admin)',
        email: 'admin.kmc@kolhapur.gov.in',
        ward: 'Kasba Bawada Ward Command',
      });
      setIsAdminAuthenticated(true);
      localStorage.setItem('civora_admin_auth', 'true');
    } else if (role === 'employee') {
      setUser({
        ...user,
        role: 'employee',
        name: employeeUser?.name || 'Suresh More (Supervisor)',
        email: 'employee.kmc@kolhapur.gov.in',
        ward: 'Kasba Bawada Ward Command',
        employeeId: employeeUser?.id || 'EMP001',
      });
      setIsEmployeeAuthenticated(true);
      localStorage.setItem('civora_emp_auth', 'true');
    } else {
      setUser({
        ...user,
        role: 'citizen',
        name: 'Rohan Kumbhar',
        email: 'rohan.kumbhar@kolhapur.gov.in',
        ward: 'Kasba Bawada Ward Command',
      });
      setIsAdminAuthenticated(false);
      localStorage.removeItem('civora_admin_auth');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        citizens,
        employees,
        addEmployee,
        editEmployee,
        deleteEmployee,
        assignComplaintToEmployee,
        selectCitizenProfile,
        updateUserArea,
        registerUser,
        theme,
        toggleTheme,
        globalSearch,
        setGlobalSearch,
        isLiveChatOpen,
        setIsLiveChatOpen,
        complaints,
        addComplaint,
        addComplaintComment,
        updateComplaintStatus,
        updateEmployeeWorkStatus,
        submitComplaintFeedback,
        bills,
        payBill,
        updateBillStatus,
        waterSchedule,
        updateWaterArea,
        waterScheduleItems,
        addWaterScheduleItem,
        editWaterScheduleItem,
        deleteWaterScheduleItem,
        garbageSchedule,
        updateGarbageArea,
        garbageScheduleItems,
        addGarbageScheduleItem,
        editGarbageScheduleItem,
        deleteGarbageScheduleItem,
        certificates,
        applyCertificate,
        approveCertificate,
        rejectCertificate,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        addNotification,
        sendAreaAlert,
        adminStats,
        switchUserRole,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        isEmployeeAuthenticated,
        employeeUser,
        employeeLogin,
        employeeLogout,
        language,
        setLanguage,
        t,
        favoriteServices,
        toggleFavoriteService,
        recentlyUsedServices,
        addRecentlyUsedService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

