import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthWrapperProps {
  role: 'admin' | 'owner';
  allowedRoles: ('admin' | 'owner')[];
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ role, allowedRoles, children }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AuthWrapper;
