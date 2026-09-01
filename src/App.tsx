import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LiveChatModal } from './components/LiveChatModal';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WaterSchedulePage } from './pages/WaterSchedulePage';
import { GarbageSchedulePage } from './pages/GarbageSchedulePage';
import { ComplaintRegisterPage } from './pages/ComplaintRegisterPage';
import { ComplaintTrackingPage } from './pages/ComplaintTrackingPage';
import { BillPaymentPage } from './pages/BillPaymentPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ContactHelpPage } from './pages/ContactHelpPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { EmployeeLoginPage } from './pages/EmployeeLoginPage';
import { EmployeeDashboardPage } from './pages/EmployeeDashboardPage';
import { ProtectedEmployeeRoute } from './components/ProtectedEmployeeRoute';
import { LiveMapPage } from './pages/LiveMapPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#f7f9fb] dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
          <Header />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/employee/login" element={<EmployeeLoginPage />} />
              <Route
                path="/employee/dashboard"
                element={
                  <ProtectedEmployeeRoute>
                    <EmployeeDashboardPage />
                  </ProtectedEmployeeRoute>
                }
              />
              <Route path="/map" element={<LiveMapPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/water-schedule" element={<WaterSchedulePage />} />
              <Route path="/garbage-schedule" element={<GarbageSchedulePage />} />
              <Route path="/complaint-register" element={<ComplaintRegisterPage />} />
              <Route path="/complaint-tracking" element={<ComplaintTrackingPage />} />
              <Route path="/bill-payment" element={<BillPaymentPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/help" element={<ContactHelpPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <BottomNav />
          <LiveChatModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
