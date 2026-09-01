import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAdminAuthenticated, user } = useApp();

  if (!isAdminAuthenticated || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
