import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RoleGuard = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
     return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Assuming roles claim is stored as 'role' in JWT
  if (user.role !== requiredRole) {
     return <Navigate to="/dashboard" replace />; // Redirect to default user page
  }

  return <Outlet />;
};

export default RoleGuard;
