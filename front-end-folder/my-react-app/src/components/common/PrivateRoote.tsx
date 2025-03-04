// components/common/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  roles?: ('patient' | 'doctor' | 'admin')[];
  redirectTo?: string;
}

const PrivateRoute = ({ roles, redirectTo = '/login' }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;
  
  if (!user) return <Navigate to={redirectTo} replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};