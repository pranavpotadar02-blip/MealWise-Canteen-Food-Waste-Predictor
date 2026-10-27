// ─── Admin Sidebar ──────────────────────────────────────────────────────────────
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, Package, BarChart2,
  TrendingUp, Trash2, PieChart, MessageSquareText, LogOut, X, ChefHat
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Dashboard',        to: '/admin/dashboard',    icon: LayoutDashboard },
  { label: 'Food Management',  to: '/admin/food',         icon: UtensilsCrossed },
  { label: 'Inventory',        to: '/admin/inventory',    icon: Package },
  { label: 'Sales',            to: '/admin/sales',        icon: BarChart2 },
  { label: 'Predictions',      to: '/admin/predictions',  icon: TrendingUp },
  { label: 'Waste Management', to: '/admin/waste',        icon: Trash2 },
  { label: 'Analytics',        to: '/admin/analytics',    icon: PieChart },
  { label: 'Ask AI',           to: '/admin/ask-ai',       icon: MessageSquareText },
];

export function AdminSidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <ChefHat className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm tracking-tight">MealWise</span>
            <p className="text-2xs text-sidebar-text">Admin Portal</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-sidebar-text hover:text-white p-1 rounded">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white flex-shrink-0">
            {user?.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-2xs text-sidebar-text truncate">{user?.canteen}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-left text-red-400 hover:bg-red-900/20 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
