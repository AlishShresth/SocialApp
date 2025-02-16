import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthData } from '../types/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}') as AuthData;

  return auth.user?.id ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedRoute;