export type UserRole = 'citizen' | 'admin' | 'employee';

export type LanguageCode = 'en' | 'mr' | 'hi';

export type KolhapurArea = 
  | 'Kasba Bawada Main Road'
  | 'Shivaji Nagar'
  | 'Market Area'
  | 'Rajarampuri'
  | 'Bus Stand Area';

export interface Citizen {
  id: string; // e.g. C001
  name: string;
  area: string;
  mobile: string;
  email?: string;
  address?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  ward: string;
  address: string;
  aadhaarVerified: boolean;
  avatarUrl: string;
  state: string; // e.g. 'Maharashtra'
  city: string; // e.g. 'Kolhapur'
  area: string; // e.g. 'Kasba Bawada Main Road'
  employeeId?: string;
  department?: string;
}

export interface WaterScheduleItem {
  id: string;
  area: KolhapurArea | string;
  time: string; // e.g. '6:00 AM–8:00 AM'
  days: string; // e.g. 'Mon, Wed, Fri'
  status?: 'Active' | 'Delayed' | 'Maintenance' | 'Scheduled';
}

export interface GarbageScheduleItem {
  id: string;
  area: KolhapurArea | string;
  time: string; // e.g. '8:00 AM'
  vehicle: string; // e.g. 'G001'
  status?: 'On Route' | 'Completed' | 'Delayed' | 'Scheduled';
}

export interface WaterSchedule {
  area: string;
  currentState: 'Flowing' | 'Off' | 'Maintenance';
  lastUpdated: string;
  nextDay: string;
  supplyWindow: string;
  pressureBar: number;
  durationPercent: number;
  minutesRemaining: number;
  systemHealth: string;
  days: string;
  upcoming: Array<{
    day: string;
    window: string;
    status: string;
  }>;
}

export interface GarbageTruckSchedule {
  area: string;
  nextDay: string;
  nextTime: string;
  truckNumber: string;
  distanceKm: number;
  etaMinutes: number;
  status: 'Arriving Soon' | 'On Route' | 'Completed' | 'Delayed';
  wasteTypes: string[];
  alertMessage?: string;
  lat: number;
  lng: number;
}

export interface Employee {
  id: string; // e.g. EMP001
  name: string;
  department: string;
  mobile: string;
  role: string;
  assignedArea: string;
  activeComplaints: number;
  status: 'Active' | 'On Field' | 'On Leave';
  rating?: number;
  completedCount?: number;
  gpsLocation?: { lat: number; lng: number };
}

export interface AiAnalysisResult {
  category: string;
  confidence: number; // e.g. 96
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  department: string;
  estimatedResolutionTime: string;
  suggestedDescription?: string;
  detectedObjects?: string[];
  severityLevel?: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  timestamp?: string;
}

export interface Complaint {
  id: string; // CMP001, CMP002, etc.
  referenceNo: string;
  category: string;
  description: string;
  location: string;
  ward: string;
  coordinates?: { lat: number; lng: number };
  photoUrl?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  aiAnalysis?: AiAnalysisResult;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Resolved' | 'Rejected' | 'Submitted' | 'Under Review';
  workProgressStage?: 'Assigned' | 'Work Accepted' | 'Work Started' | 'In Progress' | 'Completed' | 'Rejected';
  priority?: 'Low' | 'Medium' | 'High' | 'Emergency';
  department: string;
  assignedTo?: string;
  assignedEmployeeId?: string;
  adminRemark?: string;
  employeeRemark?: string;
  employeeGpsLocation?: { lat: number; lng: number; timestamp?: string };
  citizenRating?: number;
  citizenFeedback?: string;
  estimatedResolutionTime?: string;
  submittedAt: string;
  updatedAt: string;
  activityLog: Array<{
    title: string;
    description: string;
    timestamp: string;
    actor: string;
  }>;
  comments: Array<{
    id: string;
    author: string;
    role: string;
    text: string;
    timestamp: string;
    photoUrl?: string;
  }>;
}

export interface Bill {
  id: string;
  type: 'Property Tax' | 'Water Bill' | 'Sanitation Fee' | 'Street Light Tax' | 'Waste Management' | 'Electricity';
  accountNo: string;
  period: string;
  amount: number; // In Indian Rupees ₹
  dueDate: string;
  status: 'Due' | 'Pending' | 'Paid' | 'Overdue';
  paidDate?: string;
  receiptNo?: string;
  paymentMethod?: string;
}

export interface CertificateRequest {
  id: string;
  type:
    | 'Birth Certificate'
    | 'Death Certificate'
    | 'Marriage Certificate'
    | 'Income Certificate'
    | 'Residence Certificate'
    | 'Senior Citizen Certificate'
    | 'Trade License';
  applicantName: string;
  referenceNo: string;
  appliedDate: string;
  status: 'Pending Verification' | 'Processing' | 'Approved' | 'Issued' | 'Rejected';
  downloadUrl?: string;
  remarks?: string;
}

export interface NotificationItem {
  id: string;
  type: 'emergency' | 'water' | 'garbage' | 'announcement' | 'system' | 'maintenance';
  title: string;
  message: string;
  area: string; // e.g. 'Kasba Bawada Main Road' or 'All Areas'
  timestamp: string;
  date: string; // e.g. '23 Jul 2026'
  time: string; // e.g. '06:00 AM'
  timeAgo: string;
  priority: 'High Priority' | 'Normal' | 'Info';
  read: boolean;
  categoryTag?: string;
  imageUrl?: string;
}

export interface AdminStats {
  totalCitizens: number;
  totalComplaints: number;
  pendingComplaints: number;
  assignedComplaints: number;
  inProgressComplaints: number;
  resolvedToday: number;
  rejectedComplaints: number;
  totalEmployees: number;
  activeTrucks: number;
  totalRevenueRupees: number;
  waterPumpingActive: boolean;
}


