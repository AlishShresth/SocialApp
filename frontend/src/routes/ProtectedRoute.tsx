import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthData } from '../types/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = JSON.parse(localStorage.getItem('auth') || '{}') as AuthData;

  return user ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedRoute;