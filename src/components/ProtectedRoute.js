import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'librarian':
        return <Navigate to="/library-management" />;
      default:
        return <Navigate to="/dashboard" />;
    }
  }

  return children;
}

export default ProtectedRoute; 