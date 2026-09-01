import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Droplet,
  Truck,
  IndianRupee,
  BarChart2,
  Download,
  Send,
  Check,
  X,
  MapPin,
  Eye,
  Award,
  ArrowUpRight,
  UserPlus,
  FileSpreadsheet,
  Printer,
  Sparkles,
  Building2,
  Bell,
  XCircle,
  Briefcase,
  UserCheck,
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import {
  Complaint,
  WaterScheduleItem,
  GarbageScheduleItem,
  KolhapurArea,
  Employee,
  CertificateRequest,
  Bill,
} from '../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    switchUserRole,
    isAdminAuthenticated,
    adminLogout,
    complaints,
    updateComplaintStatus,
    assignComplaintToEmployee,
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    adminStats,
    waterScheduleItems,
    addWaterScheduleItem,
    editWaterScheduleItem,
    deleteWaterScheduleItem,
    garbageScheduleItems,
    addGarbageScheduleItem,
    editGarbageScheduleItem,
    deleteGarbageScheduleItem,
    sendAreaAlert,
    certificates,
    approveCertificate,
    rejectCertificate,
    bills,
    updateBillStatus,
    notifications,
  } = useApp();

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'complaints' | 'employees' | 'water' | 'garbage' | 'certificates' | 'bills' | 'analytics' | 'alerts' | 'reports'
  >('overview');

  // Complaint Filters & Search
  const [complaintSearch, setComplaintSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Complaint Action Modals
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Complaint['status']>('In Progress');
  const [statusNote, setStatusNote] = useState('');
  const [beforePhoto, setBeforePhoto] = useState('');
  const [afterPhoto, setAfterPhoto] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignEmpId, setAssignEmpId] = useState('');
  const [assignRemark, setAssignRemark] = useState('');

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Employee Modal State
  const [showEmpModal, setShowEmpModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
  const [empName, setEmpName] = useState('');
  const [empDept, setEmpDept] = useState('Sanitation & Solid Waste');
  const [empMobile, setEmpMobile] = useState('');
  const [empRole, setEmpRole] = useState('Field Officer');
  const [empArea, setEmpArea] = useState<KolhapurArea>('Kasba Bawada Main Road');
  const [empStatus, setEmpStatus] = useState<'Active' | 'On Field' | 'On Leave'>('Active');

  // Water Form Modal State
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [editingWaterId, setEditingWaterId] = useState<string | null>(null);
  const [wArea, setWArea] = useState<KolhapurArea>('Kasba Bawada Main Road');
  const [wTime, setWTime] = useState('6:00 AM–8:00 AM');
  const [wDays, setWDays] = useState('Mon, Wed, Fri');
  const [wStatus, setWStatus] = useState<'Active' | 'Delayed' | 'Maintenance'>('Active');

  // Garbage Form Modal State
  const [showGarbageModal, setShowGarbageModal] = useState(false);
  const [editingGarbageId, setEditingGarbageId] = useState<string | null>(null);
  const [gArea, setGArea] = useState<KolhapurArea>('Kasba Bawada Main Road');
  const [gTime, setGTime] = useState('8:00 AM');
  const [gVehicle, setGVehicle] = useState('G001');
  const [gStatus, setGStatus] = useState<'Scheduled' | 'On Route' | 'Completed' | 'Delayed'>('Scheduled');

  // Area Alert State
  const [alertArea, setAlertArea] = useState<KolhapurArea | 'All Areas'>('Kasba Bawada Main Road');
  const [alertType, setAlertType] = useState<'emergency' | 'announcement' | 'maintenance' | 'water' | 'garbage'>('emergency');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Export Toast
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Verification that user is admin
  if (user.role !== 'admin' || !isAdminAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
          <Shield size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Access Required</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Please log in with valid Admin Credentials to access the Kolhapur Municipal Admin Dashboard.
          </p>
        </div>
        <Link
          to="/admin/login"
          className="px-6 py-3 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-sm rounded-2xl shadow-lg transition-all inline-flex items-center gap-2"
        >
          <Shield size={18} /> Open Admin Login Page
        </Link>
      </div>
    );
  }

  // Filtered Complaints Logic
  const filteredComplaints = complaints.filter((c) => {
    const searchMatch =
      c.id.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.referenceNo.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(complaintSearch.toLowerCase());

    const areaMatch = areaFilter === 'all' || c.location.toLowerCase().includes(areaFilter.toLowerCase());
    const categoryMatch = categoryFilter === 'all' || c.category === categoryFilter;
    const priorityMatch = priorityFilter === 'all' || (c.priority || 'Normal') === priorityFilter;
    const statusMatch = statusFilter === 'all' || c.status === statusFilter;

    return searchMatch && areaMatch && categoryMatch && priorityMatch && statusMatch;
  });

  // Action Handlers
  const handleOpenStatusModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setNewStatus(c.status);
    setStatusNote(c.adminRemark || '');
    setBeforePhoto(c.beforePhotoUrl || c.photoUrl || '');
    setAfterPhoto(c.afterPhotoUrl || '');
    setShowStatusModal(true);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(selectedComplaint.id, newStatus, statusNote, {
      beforePhotoUrl: beforePhoto,
      afterPhotoUrl: afterPhoto,
    });

    setShowStatusModal(false);
    setSelectedComplaint(null);
  };

  const handleOpenAssignModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setAssignEmpId(c.assignedEmployeeId || (employees[0]?.id || ''));
    setAssignRemark('');
    setShowAssignModal(true);
  };

  const handleSaveAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !assignEmpId) return;

    const emp = employees.find((e) => e.id === assignEmpId);
    if (emp) {
      assignComplaintToEmployee(selectedComplaint.id, emp.id, emp.name, assignRemark);
    }

    setShowAssignModal(false);
    setSelectedComplaint(null);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !empMobile.trim()) return;

    if (editingEmp) {
      editEmployee(editingEmp.id, {
        name: empName,
        department: empDept,
        mobile: empMobile,
        role: empRole,
        assignedArea: empArea,
        status: empStatus,
      });
    } else {
      addEmployee({
        name: empName,
        department: empDept,
        mobile: empMobile,
        role: empRole,
        assignedArea: empArea,
        status: empStatus,
      });
    }

    setShowEmpModal(false);
    setEditingEmp(null);
  };

  const handleOpenAddEmp = () => {
    setEditingEmp(null);
    setEmpName('');
    setEmpDept('Sanitation & Solid Waste');
    setEmpMobile('');
    setEmpRole('Field Inspector');
    setEmpArea('Kasba Bawada Main Road');
    setEmpStatus('Active');
    setShowEmpModal(true);
  };

  const handleOpenEditEmp = (emp: Employee) => {
    setEditingEmp(emp);
    setEmpName(emp.name);
    setEmpDept(emp.department);
    setEmpMobile(emp.mobile);
    setEmpRole(emp.role);
    setEmpArea(emp.assignedArea as KolhapurArea);
    setEmpStatus(emp.status);
    setShowEmpModal(true);
  };

  const handleSendAreaAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMsg.trim()) return;

    sendAreaAlert({
      title: alertTitle,
      message: alertMsg,
      area: alertArea,
      type: alertType,
      priority: alertType === 'emergency' ? 'High Priority' : 'Normal',
    });

    setAlertTitle('');
    setAlertMsg('');
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 3500);
  };

  const handleSaveWaterSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWaterId) {
      editWaterScheduleItem(editingWaterId, {
        area: wArea,
        time: wTime,
        days: wDays,
        status: wStatus,
      });
    } else {
      addWaterScheduleItem({
        area: wArea,
        time: wTime,
        days: wDays,
        status: wStatus,
      });
    }
    setShowWaterModal(false);
    setEditingWaterId(null);
  };

  const handleSaveGarbageSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGarbageId) {
      editGarbageScheduleItem(editingGarbageId, {
        area: gArea,
        time: gTime,
        vehicle: gVehicle,
        status: gStatus,
      });
    } else {
      addGarbageScheduleItem({
        area: gArea,
        time: gTime,
        vehicle: gVehicle,
        status: gStatus,
      });
    }
    setShowGarbageModal(false);
    setEditingGarbageId(null);
  };

  const triggerExport = (format: 'PDF' | 'Excel') => {
    setExportNotice(`Exporting Municipal Archive Report to ${format}... Download started.`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Status Badge Colors
  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-300';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-300';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border-purple-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#003d9b] via-[#0052cc] to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              Kolhapur Municipal Corporation • Admin Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold">
              Live Control Room
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Kasba Bawada Ward Command Center
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Officer Console: Manage grievances, assign field crews, broadcast area water/garbage notices, approve certificates & monitor revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => triggerExport('PDF')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-2xl border border-white/20 flex items-center gap-1.5 transition-all"
          >
            <Printer size={15} /> Export PDF
          </button>
          <button
            onClick={() => triggerExport('Excel')}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet size={15} /> Export Excel
          </button>
          <button
            onClick={() => {
              adminLogout();
              navigate('/admin/login');
            }}
            className="px-3.5 py-2 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-1.5 transition-all border border-rose-400/30"
            title="Log out of Admin session"
          >
            <LogOut size={15} /> Exit Admin
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={18} /> {exportNotice}
          </span>
          <button onClick={() => setExportNotice(null)} className="text-emerald-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'complaints', label: `Complaints (${complaints.length})`, icon: AlertTriangle },
          { id: 'employees', label: `Employees (${employees.length})`, icon: Users },
          { id: 'water', label: 'Water Supply', icon: Droplet },
          { id: 'garbage', label: 'Garbage Logistics', icon: Truck },
          { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
          { id: 'bills', label: 'Tax & Bills', icon: IndianRupee },
          { id: 'analytics', label: 'Analytics & Charts', icon: BarChart2 },
          { id: 'alerts', label: 'Broadcast Alert', icon: Bell },
          { id: 'reports', label: 'Reports', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#003d9b] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 10 Core Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Citizens</span>
                <Users size={18} className="text-[#003d9b]" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {adminStats.totalCitizens.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold">+140 this month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Complaints</span>
                <AlertTriangle size={18} className="text-amber-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{complaints.length}</p>
              <p className="text-[11px] text-slate-500">Registered across wards</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Pending Complaints</span>
                <Clock size={18} className="text-amber-600" />
              </div>
              <p className="text-2xl font-black text-amber-600">
                {complaints.filter((c) => c.status === 'Pending').length}
              </p>
              <p className="text-[11px] text-amber-600 font-semibold">Awaiting assignment</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>In Progress</span>
                <Briefcase size={18} className="text-purple-600" />
              </div>
              <p className="text-2xl font-black text-purple-600">
                {complaints.filter((c) => c.status === 'In Progress' || c.status === 'Assigned').length}
              </p>
              <p className="text-[11px] text-purple-600 font-semibold">Work under execution</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Resolved</span>
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600">
                {complaints.filter((c) => c.status === 'Resolved').length}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold">SLA SLA 94.2%</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Total Employees</span>
                <UserCheck size={18} className="text-[#003d9b]" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{employees.length}</p>
              <p className="text-[11px] text-slate-500">Active ward field staff</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Water Grid Slots</span>
                <Droplet size={18} className="text-blue-500" />
              </div>
              <p className="text-2xl font-black text-blue-600">{waterScheduleItems.length}</p>
              <p className="text-[11px] text-blue-500 font-semibold">Pumping Active</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Garbage Logistics</span>
                <Truck size={18} className="text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{garbageScheduleItems.length} Routes</p>
              <p className="text-[11px] text-emerald-600 font-semibold">GPS Tracked</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Revenue Collection</span>
                <IndianRupee size={18} className="text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600">
                ₹{adminStats.totalRevenueRupees.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold">Online tax & water bills</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Notifications</span>
                <Bell size={18} className="text-[#003d9b]" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{notifications.length}</p>
              <p className="text-[11px] text-slate-500">Live area alerts sent</p>
            </div>
          </div>

          {/* Recent Grievance Queue & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-500" /> Priority Complaints Pending Dispatch
                </h2>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="text-xs font-bold text-[#003d9b] hover:underline flex items-center gap-1"
                >
                  View All Table <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-3">
                {complaints.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#003d9b] bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-md">
                          {item.id}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{item.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">{item.description}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {item.location} • Submitted {item.submittedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleOpenAssignModal(item)}
                        className="px-3 py-1.5 bg-blue-50 text-[#003d9b] dark:bg-slate-800 dark:text-blue-300 rounded-xl text-xs font-bold border border-blue-200 dark:border-slate-700 hover:bg-blue-100 transition-all"
                      >
                        Assign Crew
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal(item)}
                        className="px-3 py-1.5 bg-[#003d9b] text-white rounded-xl text-xs font-bold hover:bg-[#0052cc] transition-all"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Broadcast Widget */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell size={20} className="text-[#003d9b]" /> Instant Citizen Broadcast
              </h2>
              <p className="text-xs text-slate-500">
                Send push notifications directly to Kasba Bawada residents' phones.
              </p>

              <form onSubmit={handleSendAreaAlert} className="space-y-3">
                <select
                  value={alertArea}
                  onChange={(e) => setAlertArea(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                >
                  <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                  <option value="Shivaji Nagar">Shivaji Nagar</option>
                  <option value="Market Area">Market Area</option>
                  <option value="Rajarampuri">Rajarampuri</option>
                  <option value="Bus Stand Area">Bus Stand Area</option>
                  <option value="All Areas">All Areas</option>
                </select>

                <input
                  type="text"
                  placeholder="Alert Title (e.g., Heavy Rain Warning)"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none"
                />

                <textarea
                  rows={3}
                  placeholder="Alert Message description..."
                  value={alertMsg}
                  onChange={(e) => setAlertMsg(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Broadcast Alert
                </button>

                {alertSuccess && (
                  <p className="text-xs text-emerald-600 font-bold text-center">Alert broadcasted to citizen app!</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPLAINT MANAGEMENT TABLE */}
      {activeTab === 'complaints' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={22} className="text-amber-500" /> Municipal Grievance Master Table
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Search, filter, assign officers, upload before/after work proof & update live citizen statuses.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl">
                Showing {filteredComplaints.length} of {complaints.length} tickets
              </span>
            </div>
          </div>

          {/* Search & Filters Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID, Citizen, Category..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
            >
              <option value="all">All Wards / Areas</option>
              <option value="Kasba Bawada">Kasba Bawada</option>
              <option value="Shivaji Nagar">Shivaji Nagar</option>
              <option value="Market Area">Market Area</option>
              <option value="Rajarampuri">Rajarampuri</option>
              <option value="Bus Stand">Bus Stand Area</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Garbage Not Collected">Garbage Collection</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Water Supply Delay">Water Supply</option>
              <option value="Street Light Fault">Street Light</option>
              <option value="Road Damage">Road Repair</option>
              <option value="Drainage Blockage">Drainage Overflow</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              onClick={() => {
                setComplaintSearch('');
                setAreaFilter('all');
                setCategoryFilter('all');
                setPriorityFilter('all');
                setStatusFilter('all');
              }}
              className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-300 transition-all"
            >
              Reset Filters
            </button>
          </div>

          {/* Master Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Image / ID</th>
                  <th className="p-3.5">AI Detected Category</th>
                  <th className="p-3.5">Priority & Dept</th>
                  <th className="p-3.5">Location & Ward</th>
                  <th className="p-3.5">Assigned Employee</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Submitted</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500">
                      No complaints match the search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                      {/* Image & ID */}
                      <td className="p-3.5 space-y-1">
                        <div className="flex items-center gap-2">
                          {c.photoUrl ? (
                            <img src={c.photoUrl} alt="Complaint" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <div>
                            <div className="font-mono font-bold text-[#003d9b] dark:text-blue-400">{c.id}</div>
                            <span className="text-[10px] text-slate-400 block">{c.ward}</span>
                          </div>
                        </div>
                      </td>

                      {/* AI Detected Category */}
                      <td className="p-3.5 space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{c.aiAnalysis?.category || c.category}</span>
                        </div>
                        {c.aiAnalysis ? (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold border border-indigo-200 dark:border-indigo-800">
                            <Sparkles size={11} className="text-indigo-600 animate-pulse" />
                            <span>AI Confidence: {c.aiAnalysis.confidence}%</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400">Manual Entry</span>
                        )}
                      </td>

                      {/* Priority & Dept */}
                      <td className="p-3.5 space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          c.priority === 'Emergency' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                          c.priority === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {c.priority || 'Medium'} Priority
                        </span>
                        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                          {c.department || c.aiAnalysis?.department || 'General Admin'}
                        </div>
                      </td>

                      {/* Location & Ward */}
                      <td className="p-3.5 space-y-1">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          <MapPin size={12} className="text-[#003d9b]" /> {c.location}
                        </div>
                        {c.coordinates && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            GPS: {c.coordinates.lat.toFixed(4)}, {c.coordinates.lng.toFixed(4)}
                          </span>
                        )}
                      </td>

                      {/* Assigned Employee */}
                      <td className="p-3.5">
                        {c.assignedTo ? (
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                            <UserCheck size={14} className="text-emerald-600" /> {c.assignedTo}
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(c.status)}`}>
                          {c.status}
                        </span>
                        {c.adminRemark && (
                          <p className="text-[10px] text-slate-500 mt-1 italic line-clamp-1">
                            "{c.adminRemark}"
                          </p>
                        )}
                      </td>

                      {/* Submitted Date */}
                      <td className="p-3.5 text-slate-500 text-[11px]">{c.submittedAt}</td>

                      {/* Actions */}
                      <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenAssignModal(c)}
                          title="Assign Officer"
                          className="px-2.5 py-1.5 bg-blue-50 text-[#003d9b] dark:bg-slate-700 dark:text-blue-300 font-bold rounded-lg hover:bg-blue-100 cursor-pointer"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => {
                            setSelectedComplaint(c);
                            setShowHistoryModal(true);
                          }}
                          title="View History Timeline"
                          className="px-2.5 py-1.5 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold rounded-lg hover:bg-slate-200 cursor-pointer"
                        >
                          Log
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EMPLOYEE MANAGEMENT */}
      {activeTab === 'employees' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={22} className="text-[#003d9b]" /> Municipal Staff & Field Inspector Registry
              </h2>
              <p className="text-xs text-slate-500">
                Manage field crew, assign ticket workloads, track mobile contact info, and status.
              </p>
            </div>

            <button
              onClick={handleOpenAddEmp}
              className="px-4 py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
            >
              <UserPlus size={16} /> Add Employee
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-[#003d9b] dark:text-blue-300 font-black text-sm flex items-center justify-center">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{emp.name}</h3>
                      <p className="text-[11px] text-slate-500 font-mono">{emp.id} • {emp.role}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : emp.status === 'On Field'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <p><span className="font-semibold text-slate-400">Department:</span> {emp.department}</p>
                  <p><span className="font-semibold text-slate-400">Assigned Area:</span> {emp.assignedArea}</p>
                  <p><span className="font-semibold text-slate-400">Mobile:</span> +91 {emp.mobile}</p>
                  <p><span className="font-semibold text-slate-400">Active Workload:</span> <span className="font-bold text-[#003d9b]">{emp.activeComplaints} tickets</span></p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleOpenEditEmp(emp)}
                    className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="p-2 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-xl hover:bg-rose-100 text-xs font-bold"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WATER SUPPLY MANAGEMENT */}
      {activeTab === 'water' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet size={22} className="text-blue-500" /> Water Supply Grid Schedules & Pumping Slots
              </h2>
              <p className="text-xs text-slate-500">
                Configure area-wise timing windows. Updating a slot automatically dispatches push notifications to residents.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingWaterId(null);
                setWArea('Kasba Bawada Main Road');
                setWTime('6:00 AM–8:00 AM');
                setWDays('Mon, Wed, Fri');
                setWStatus('Active');
                setShowWaterModal(true);
              }}
              className="px-4 py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={16} /> Add Water Schedule
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Area Ward</th>
                  <th className="p-3.5">Supply Window Time</th>
                  <th className="p-3.5">Days</th>
                  <th className="p-3.5">Grid Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {waterScheduleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.area}</td>
                    <td className="p-3.5 font-semibold text-[#003d9b] dark:text-blue-400">{item.time}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{item.days}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                        {item.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingWaterId(item.id);
                          setWArea(item.area as KolhapurArea);
                          setWTime(item.time);
                          setWDays(item.days);
                          setWStatus(item.status || 'Active');
                          setShowWaterModal(true);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteWaterScheduleItem(item.id)}
                        className="px-2.5 py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-lg font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: GARBAGE COLLECTION MANAGEMENT */}
      {activeTab === 'garbage' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck size={22} className="text-emerald-600" /> Garbage Vehicle Logistics & Route Schedules
              </h2>
              <p className="text-xs text-slate-500">
                Manage truck vehicle dispatch timings for Kasba Bawada and surrounding sectors.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingGarbageId(null);
                setGArea('Kasba Bawada Main Road');
                setGTime('8:00 AM');
                setGVehicle('G001');
                setGStatus('Scheduled');
                setShowGarbageModal(true);
              }}
              className="px-4 py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus size={16} /> Add Truck Route
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Area Ward</th>
                  <th className="p-3.5">Assigned Vehicle</th>
                  <th className="p-3.5">Expected Arrival Time</th>
                  <th className="p-3.5">Route Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {garbageScheduleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{item.area}</td>
                    <td className="p-3.5 font-mono font-bold text-[#003d9b] dark:text-blue-400">
                      Vehicle {item.vehicle}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">{item.time}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {item.status || 'Scheduled'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingGarbageId(item.id);
                          setGArea(item.area as KolhapurArea);
                          setGTime(item.time);
                          setGVehicle(item.vehicle);
                          setGStatus(item.status || 'Scheduled');
                          setShowGarbageModal(true);
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteGarbageScheduleItem(item.id)}
                        className="px-2.5 py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-lg font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: CERTIFICATES APPROVAL */}
      {activeTab === 'certificates' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award size={22} className="text-[#003d9b]" /> Civil Certificate Registrar Desk
            </h2>
            <p className="text-xs text-slate-500">
              Verify citizen birth, death, residence, income, and marriage applications for official seal issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-[#003d9b]">{cert.referenceNo}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{cert.type}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Applicant: <span className="font-bold">{cert.applicantName}</span></p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cert.status === 'Approved' || cert.status === 'Issued'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : cert.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">Applied Date: {cert.appliedDate}</p>
                {cert.remarks && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    Remarks: "{cert.remarks}"
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => rejectCertificate(cert.id, 'Document verification failed. Please upload valid Aadhaar/Address proof.')}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 rounded-xl text-xs font-bold hover:bg-rose-100"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => approveCertificate(cert.id, 'Verified against Kolhapur Municipal Ward Registry records.')}
                    className="px-3.5 py-1.5 bg-[#003d9b] text-white rounded-xl text-xs font-bold hover:bg-[#0052cc] shadow-md"
                  >
                    Approve & Issue Seal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: BILL MANAGEMENT */}
      {activeTab === 'bills' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IndianRupee size={22} className="text-emerald-600" /> Revenue Ledger & Bill Payment Monitoring
            </h2>
            <p className="text-xs text-slate-500">
              Track paid and outstanding Property Tax, Water Tax, and Sanitation Cess in Indian Rupees (₹).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Bill ID / Account</th>
                  <th className="p-3.5">Bill Category</th>
                  <th className="p-3.5">Amount (₹)</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Receipt / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {bills.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40">
                    <td className="p-3.5 space-y-0.5">
                      <div className="font-mono font-bold text-[#003d9b]">{b.id}</div>
                      <div className="text-slate-500 text-[11px]">{b.accountNo}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{b.type}</td>
                    <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                      ₹{b.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{b.dueDate}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {b.status === 'Paid' ? (
                        <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                          {b.receiptNo || 'RECEIPT OK'}
                        </span>
                      ) : (
                        <button
                          onClick={() => updateBillStatus(b.id, 'Paid')}
                          className="px-3 py-1 bg-[#003d9b] text-white font-bold rounded-lg hover:bg-[#0052cc]"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: ANALYTICS & CHARTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* AI Complaint Detection Intelligence Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-700/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 text-indigo-200 flex items-center justify-center border border-indigo-400/30">
                  <Sparkles size={24} className="text-amber-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold flex items-center gap-2">
                    AI Complaint Vision & Classification Analytics
                  </h2>
                  <p className="text-xs text-indigo-200">
                    Real-time AI model accuracy, auto-routing performance & category detection metrics
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 self-start sm:self-center">
                Model Status: Optimal (96.4% Confidence)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-indigo-200 text-xs font-semibold block">Average AI Confidence</span>
                <p className="text-2xl font-black text-amber-300">96.4%</p>
                <p className="text-[10px] text-emerald-300 font-bold">+2.1% model gain</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-indigo-200 text-xs font-semibold block">Auto-Fill Acceptance</span>
                <p className="text-2xl font-black text-white">94.8%</p>
                <p className="text-[10px] text-indigo-200">Citizens accepted AI suggestion</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-indigo-200 text-xs font-semibold block">High Priority Detection</span>
                <p className="text-2xl font-black text-rose-300">
                  {complaints.filter((c) => c.priority === 'High' || c.priority === 'Emergency').length} Active
                </p>
                <p className="text-[10px] text-rose-200">Auto-routed for urgent dispatch</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-indigo-200 text-xs font-semibold block">Avg Resolution SLA</span>
                <p className="text-2xl font-black text-emerald-300">24.8 Hrs</p>
                <p className="text-[10px] text-emerald-300 font-bold">-6 hrs faster with AI routing</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 size={22} className="text-[#003d9b]" /> Municipal Complaint Categories & SLA Analytics
            </h2>

            {/* Complaint Categories Breakdown & Resolution Time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Breakdown Chart */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Complaint Categories Breakdown</span>
                  <TrendingUp size={16} className="text-emerald-600" />
                </h3>

                <div className="space-y-3 text-xs">
                  {[
                    { cat: 'Garbage Overflow', count: 32, pct: 85, color: 'bg-emerald-500' },
                    { cat: 'Water Leakage', count: 24, pct: 65, color: 'bg-blue-500' },
                    { cat: 'Road Potholes', count: 18, pct: 48, color: 'bg-amber-500' },
                    { cat: 'Drainage Blockage', count: 14, pct: 38, color: 'bg-purple-500' },
                    { cat: 'Street Light Fault', count: 10, pct: 28, color: 'bg-yellow-500' },
                    { cat: 'Broken Footpath', count: 6, pct: 18, color: 'bg-stone-500' },
                  ].map((row) => (
                    <div key={row.cat} className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                        <span>{row.cat}</span>
                        <span className="font-bold">{row.count} complaints</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Resolution Time SLA */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Department Resolution Time Statistics</span>
                  <Clock size={16} className="text-[#003d9b]" />
                </h3>

                <div className="space-y-3 text-xs">
                  {[
                    { dept: 'Sanitation Department', avgHrs: '18.5 Hours', status: 'Optimal', color: 'text-emerald-600' },
                    { dept: 'Water Supply Division', avgHrs: '12.0 Hours', status: 'Fastest', color: 'text-blue-600' },
                    { dept: 'Roads & Civil Works', avgHrs: '36.2 Hours', status: 'Normal', color: 'text-amber-600' },
                    { dept: 'Drainage Department', avgHrs: '24.0 Hours', status: 'On Track', color: 'text-purple-600' },
                    { dept: 'Electrical Wing', avgHrs: '14.5 Hours', status: 'Optimal', color: 'text-yellow-600' },
                  ].map((dept, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">{dept.dept}</span>
                        <span className="text-[10px] text-slate-400">Avg resolution time</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 dark:text-white block">{dept.avgHrs}</span>
                        <span className={`text-[10px] font-extrabold ${dept.color}`}>{dept.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Visual Bar Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Area Wise Complaint Chart */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Area-Wise Complaints Distribution</span>
                  <TrendingUp size={16} className="text-emerald-600" />
                </h3>

                <div className="space-y-3 text-xs">
                  {[
                    { area: 'Kasba Bawada Main Road', count: 14, pct: 80, color: 'bg-blue-600' },
                    { area: 'Shivaji Nagar', count: 8, pct: 50, color: 'bg-purple-600' },
                    { area: 'Market Area', count: 6, pct: 40, color: 'bg-emerald-600' },
                    { area: 'Rajarampuri', count: 4, pct: 25, color: 'bg-amber-600' },
                    { area: 'Bus Stand Area', count: 3, pct: 20, color: 'bg-rose-600' },
                  ].map((row) => (
                    <div key={row.area} className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                        <span>{row.area}</span>
                        <span>{row.count} tickets</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Revenue Trend */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Monthly Online Revenue Collection (₹)</span>
                  <IndianRupee size={16} className="text-emerald-600" />
                </h3>

                <div className="flex items-end gap-3 h-40 pt-4 px-2 border-b border-slate-200 dark:border-slate-700">
                  {[
                    { month: 'Mar', amount: '₹1.2L', height: '40%' },
                    { month: 'Apr', amount: '₹1.8L', height: '60%' },
                    { month: 'May', amount: '₹2.1L', height: '75%' },
                    { month: 'Jun', amount: '₹2.6L', height: '88%' },
                    { month: 'Jul', amount: '₹3.4L', height: '100%' },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-200">{bar.amount}</span>
                      <div
                        className="w-full bg-[#003d9b] dark:bg-blue-500 rounded-t-lg transition-all"
                        style={{ height: bar.height }}
                      />
                      <span className="text-[11px] font-bold text-slate-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: BROADCAST ALERT */}
      {activeTab === 'alerts' && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-3xl bg-blue-100 dark:bg-blue-900/50 text-[#003d9b] mx-auto flex items-center justify-center">
              <Bell size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Emergency & Public Announcement Desk</h2>
            <p className="text-xs text-slate-500">
              Dispatch high-priority push notifications for floods, heavy rain, water delays, or festival notices.
            </p>
          </div>

          <form onSubmit={handleSendAreaAlert} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Area Ward</label>
              <select
                value={alertArea}
                onChange={(e) => setAlertArea(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none"
              >
                <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                <option value="Shivaji Nagar">Shivaji Nagar</option>
                <option value="Market Area">Market Area</option>
                <option value="Rajarampuri">Rajarampuri</option>
                <option value="Bus Stand Area">Bus Stand Area</option>
                <option value="All Areas">All Areas</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category Tag</label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none"
              >
                <option value="emergency">Emergency Alert (Heavy Rain / Flood / Power Cut)</option>
                <option value="water">Water Supply Notice</option>
                <option value="garbage">Garbage Route Announcement</option>
                <option value="maintenance">Road & Public Works Advisory</option>
                <option value="announcement">Festival / General Announcement</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Notice Title</label>
              <input
                type="text"
                placeholder="e.g. Red Alert: Heavy Rainfall Expected in Panchganga Basin"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Detailed Message</label>
              <textarea
                rows={4}
                placeholder="Provide clear instructions for residents..."
                value={alertMsg}
                onChange={(e) => setAlertMsg(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send size={18} /> Broadcast Notification Now
            </button>
          </form>
        </div>
      )}

      {/* TAB 10: REPORTS EXPORT */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText size={22} className="text-[#003d9b]" /> Municipal Governance Audit & PDF/Excel Exporter
            </h2>
            <p className="text-xs text-slate-500">
              Generate formatted executive summary sheets for Maharashtra State Urban Development records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#003d9b] flex items-center justify-center font-bold">
                  <Printer size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Grievance Audit PDF</h3>
                  <p className="text-xs text-slate-500">Includes ticket history, photo proofs, and officer SLA resolution times.</p>
                </div>
              </div>
              <button
                onClick={() => triggerExport('PDF')}
                className="w-full py-2.5 bg-[#003d9b] text-white font-bold text-xs rounded-xl hover:bg-[#0052cc]"
              >
                Download PDF Report
              </button>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Revenue & Certificate Excel Ledger</h3>
                  <p className="text-xs text-slate-500">Full tax receipt records, account numbers, and certificate issuance log.</p>
                </div>
              </div>
              <button
                onClick={() => triggerExport('Excel')}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
              >
                Download Excel CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* STATUS & BEFORE/AFTER PHOTO MODAL */}
      {showStatusModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Update Status • Ticket {selectedComplaint.id}
              </h3>
              <button onClick={() => setShowStatusModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Complaint Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-bold outline-none"
                >
                  <option value="Pending">Pending (Received)</option>
                  <option value="Assigned">Assigned (Field Staff Notified)</option>
                  <option value="In Progress">In Progress (Work Underway)</option>
                  <option value="Resolved">Resolved (Completed Successfully)</option>
                  <option value="Rejected">Rejected (Not Feasible / Invalid)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Officer Remark</label>
                <input
                  type="text"
                  placeholder="e.g., Pipe replacement completed by Water Crew #2."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Before Work Photo URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={beforePhoto}
                  onChange={(e) => setBeforePhoto(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">After Work Photo URL (Proof for Citizen)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={afterPhoto}
                  onChange={(e) => setAfterPhoto(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
                />
              </div>

              <p className="text-[11px] text-blue-600 font-bold bg-blue-50 dark:bg-slate-900 p-2.5 rounded-xl">
                Note: Updating this status will automatically send the mandatory citizen notification to their notification center.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
                >
                  Save Status & Notify Citizen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGN EMPLOYEE MODAL */}
      {showAssignModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Assign Crew • Ticket {selectedComplaint.id}
              </h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAssign} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Officer / Field Inspector</label>
                <select
                  value={assignEmpId}
                  onChange={(e) => setAssignEmpId(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-bold outline-none"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.role} - {e.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assignment Instructions</label>
                <input
                  type="text"
                  placeholder="e.g., Inspect site by 11:00 AM."
                  value={assignRemark}
                  onChange={(e) => setAssignRemark(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMPLAINT HISTORY LOG MODAL */}
      {showHistoryModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Activity History • Ticket {selectedComplaint.id}
              </h3>
              <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {selectedComplaint.activityLog.map((log, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>{log.title}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{log.description}</p>
                  <p className="text-[10px] font-semibold text-[#003d9b]">By: {log.actor}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* EMPLOYEE ADD/EDIT MODAL */}
      {showEmpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingEmp ? 'Edit Employee Record' : 'Add New Municipal Employee'}
              </h3>
              <button onClick={() => setShowEmpModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="space-y-3">
              <input
                type="text"
                placeholder="Full Employee Name"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <input
                type="text"
                placeholder="Mobile Number (+91)"
                value={empMobile}
                onChange={(e) => setEmpMobile(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <select
                value={empDept}
                onChange={(e) => setEmpDept(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Sanitation & Solid Waste">Sanitation & Solid Waste</option>
                <option value="Water Supply Department">Water Supply Department</option>
                <option value="Electrical Maintenance">Electrical Maintenance</option>
                <option value="Roads & Civil Infrastructure">Roads & Civil Infrastructure</option>
                <option value="Drainage & Sewage Board">Drainage & Sewage Board</option>
              </select>

              <input
                type="text"
                placeholder="Role Title (e.g. Inspector)"
                value={empRole}
                onChange={(e) => setEmpRole(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <select
                value={empArea}
                onChange={(e) => setEmpArea(e.target.value as KolhapurArea)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                <option value="Shivaji Nagar">Shivaji Nagar</option>
                <option value="Market Area">Market Area</option>
                <option value="Rajarampuri">Rajarampuri</option>
                <option value="Bus Stand Area">Bus Stand Area</option>
              </select>

              <select
                value={empStatus}
                onChange={(e) => setEmpStatus(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Active">Active</option>
                <option value="On Field">On Field</option>
                <option value="On Leave">On Leave</option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmpModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WATER SCHEDULE MODAL */}
      {showWaterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingWaterId ? 'Edit Water Schedule Slot' : 'Add Water Schedule Slot'}
              </h3>
              <button onClick={() => setShowWaterModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveWaterSchedule} className="space-y-3">
              <select
                value={wArea}
                onChange={(e) => setWArea(e.target.value as KolhapurArea)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                <option value="Shivaji Nagar">Shivaji Nagar</option>
                <option value="Market Area">Market Area</option>
                <option value="Rajarampuri">Rajarampuri</option>
                <option value="Bus Stand Area">Bus Stand Area</option>
              </select>

              <input
                type="text"
                placeholder="Time Window (e.g., 6:00 AM–8:00 AM)"
                value={wTime}
                onChange={(e) => setWTime(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <input
                type="text"
                placeholder="Days (e.g., Mon, Wed, Fri)"
                value={wDays}
                onChange={(e) => setWDays(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <select
                value={wStatus}
                onChange={(e) => setWStatus(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Active">Active</option>
                <option value="Delayed">Delayed</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWaterModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
                >
                  Save Water Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GARBAGE SCHEDULE MODAL */}
      {showGarbageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingGarbageId ? 'Edit Garbage Truck Route' : 'Add Garbage Truck Route'}
              </h3>
              <button onClick={() => setShowGarbageModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveGarbageSchedule} className="space-y-3">
              <select
                value={gArea}
                onChange={(e) => setGArea(e.target.value as KolhapurArea)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                <option value="Shivaji Nagar">Shivaji Nagar</option>
                <option value="Market Area">Market Area</option>
                <option value="Rajarampuri">Rajarampuri</option>
                <option value="Bus Stand Area">Bus Stand Area</option>
              </select>

              <input
                type="text"
                placeholder="Vehicle ID (e.g. G001)"
                value={gVehicle}
                onChange={(e) => setGVehicle(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <input
                type="text"
                placeholder="Arrival Time (e.g. 8:00 AM)"
                value={gTime}
                onChange={(e) => setGTime(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs outline-none"
              />

              <select
                value={gStatus}
                onChange={(e) => setGStatus(e.target.value as any)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="On Route">On Route</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGarbageModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
                >
                  Save Route Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
