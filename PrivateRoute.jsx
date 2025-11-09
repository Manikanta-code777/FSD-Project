// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  // Check for Authorization (AuthZ): "What are you allowed to do?"
  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    // Redirect users without the correct role (e.g., a student trying to access admin route)
    return <Navigate to="/" replace />; // Or to an "Unauthorized" page
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;