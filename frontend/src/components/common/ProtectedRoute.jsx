// ─── ProtectedRoute.jsx ────────────────────────────────────────────────────────
// Higher-order route component that validates authentication and role permissions.
// Redirects unauthenticated or unauthorized users to the appropriate login page.
// ─────────────────────────────────────────────────────────────────────────────

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../ui/Feedback';

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Child elements to render if authorized
 * @param {Array<string>} [props.allowedRoles] - List of permitted roles e.g. ['admin', 'student']
 * @param {string} [props.redirectPath] - Explicit redirect path if check fails
 */
export function ProtectedRoute({ children, allowedRoles, redirectPath }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    // If attempting to access admin route, send to admin login, otherwise student login
    const fallbackLogin = location.pathname.startsWith('/admin') ? '/admin/login' : '/student/login';
    return <Navigate to={redirectPath || fallbackLogin} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role?.toLowerCase();
    const hasRole = allowedRoles.some((r) => r.toLowerCase() === userRole);

    if (!hasRole) {
      // Canteen administrators are permitted to preview the student dashboard
      if (userRole === 'admin' && allowedRoles.includes('student')) {
        return children;
      }
      // Otherwise route back to their role's home dashboard
      const redirectTarget = userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard';
      return <Navigate to={redirectTarget} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
