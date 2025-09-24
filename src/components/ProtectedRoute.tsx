import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('ayur-token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('ayur-token');
  
  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}
