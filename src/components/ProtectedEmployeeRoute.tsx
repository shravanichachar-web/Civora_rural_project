import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProtectedEmployeeRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isEmployeeAuthenticated } = useApp();

  if (!isEmployeeAuthenticated) {
    return <Navigate to="/employee/login" replace />;
  }

  return <>{children}</>;
};
