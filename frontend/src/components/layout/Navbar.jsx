// ─── Navbar.jsx ───────────────────────────────────────────────────────────────
// Shared top navigation bar component
// Displays logo, contextual navigation links, user status, and action buttons.
// ─────────────────────────────────────────────────────────────────────────────

import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar({ title = 'MealWise' }) {
  const { user, isAuthenticated, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-500/20">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
                {title}
              </span>
              <span className="hidden sm:inline-block ml-2 text-2xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                AI Canteen
              </span>
            </div>
          </Link>

          {/* Navigation & User actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Role and User identifier */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {user?.name || user?.email}
                  </span>
                  <span className="text-2xs font-medium text-slate-500">
                    {isAdmin ? 'Administrator' : isStudent ? 'Student Member' : 'Guest'}
                  </span>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs">
                  <User className="h-4 w-4" />
                </div>

                <button
                  onClick={handleLogout}
                  className="btn-ghost text-xs text-red-600 hover:bg-red-50 hover:text-red-700 py-1.5 px-2.5"
                  title="Sign out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/student/login" className="btn-ghost text-xs hidden sm:inline-flex">
                  Student Login
                </Link>
                <Link to="/admin/login" className="btn-primary text-xs">
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
