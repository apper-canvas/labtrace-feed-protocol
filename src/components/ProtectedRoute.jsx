import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Protected route component that redirects to login if user is not authenticated
 */
function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise, render the protected content
  return <Outlet />;
}

export default ProtectedRoute;