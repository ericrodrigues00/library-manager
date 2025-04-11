import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import screens
import Login from './screens/login';
import Register from './screens/register';
import ForgotPassword from './screens/forgot-password';
import Dashboard from './screens/dashboard';
import Search from './screens/search';
import MaterialDetails from './screens/material-details';
import MyLoans from './screens/my-loans';
import MyReservations from './screens/my-reservations';
import LoanHistory from './screens/loan-history';
import Notifications from './screens/notifications';
import AdminDashboard from './screens/admin-dashboard';
import Reports from './screens/reports';
import AccountSettings from './screens/account-settings';
import LibraryManagement from './screens/library-management';

// Import styles
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher', 'student', 'staff']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/library-management"
              element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <LibraryManagement />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/material/:id"
              element={
                <ProtectedRoute>
                  <MaterialDetails />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/my-loans"
              element={
                <ProtectedRoute>
                  <MyLoans />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/my-reservations"
              element={
                <ProtectedRoute>
                  <MyReservations />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/loan-history"
              element={
                <ProtectedRoute>
                  <LoanHistory />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/account-settings"
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
