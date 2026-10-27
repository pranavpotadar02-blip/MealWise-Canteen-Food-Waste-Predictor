// ─── AppRoutes.jsx ─────────────────────────────────────────────────────────────
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import { AdminLayout } from '../components/layout/AdminLayout';
import { StudentLayout } from '../components/layout/StudentLayout';

// Common
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { NotFound } from '../components/common/NotFound';

// Public pages
import { Home } from '../pages/Home';
import { AdminLogin } from '../pages/AdminLogin';
import { StudentLogin } from '../pages/StudentLogin';
import { StudentRegister } from '../pages/StudentRegister';

// Admin pages
import { AdminDashboard } from '../pages/AdminDashboard';
import { FoodManagement } from '../pages/FoodManagement';
import { Inventory } from '../pages/Inventory';
import { Sales } from '../pages/Sales';
import { Predictions } from '../pages/Predictions';
import { WasteManagement } from '../pages/WasteManagement';
import { Analytics } from '../pages/Analytics';
import { AskAI } from '../pages/AskAI';

// Student pages
import { StudentDashboard } from '../pages/StudentDashboard';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function RedirectIfAuthenticated({ children, targetRole }) {
  const { isAuthenticated, isAdmin, isStudent } = useAuth();
  if (isAuthenticated) {
    if (targetRole === 'admin' && isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (targetRole === 'student' && isStudent) {
      return <Navigate to="/student/dashboard" replace />;
    }
  }
  return children;
}

// ─── Routes ───────────────────────────────────────────────────────────────────
export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<RedirectIfAuthenticated targetRole="admin"><AdminLogin /></RedirectIfAuthenticated>} />
      <Route path="/student/login" element={<RedirectIfAuthenticated targetRole="student"><StudentLogin /></RedirectIfAuthenticated>} />
      <Route path="/student/register" element={<RedirectIfAuthenticated targetRole="student"><StudentRegister /></RedirectIfAuthenticated>} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']} redirectPath="/admin/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard"   element={<AdminDashboard />} />
        <Route path="food"        element={<FoodManagement />} />
        <Route path="inventory"   element={<Inventory />} />
        <Route path="sales"       element={<Sales />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="waste"       element={<WasteManagement />} />
        <Route path="analytics"   element={<Analytics />} />
        <Route path="ask-ai"      element={<AskAI />} />
      </Route>

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']} redirectPath="/student/login">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
