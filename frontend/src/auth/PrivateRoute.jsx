import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
     return <div>Loading...</div>; // Or a proper Loader component
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
