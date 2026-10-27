// ─── Footer.jsx ───────────────────────────────────────────────────────────────
// Shared page footer component with branding, campus info, and quick navigation.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom';
import { ChefHat, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-white text-slate-600 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ChefHat className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-800 text-base">MealWise</span>
            <span className="text-xs text-slate-400 ml-2">Smart Canteen Intelligence</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <Link to="/student/login" className="hover:text-brand-600 transition-colors">Student View</Link>
            <Link to="/admin/login" className="hover:text-brand-600 transition-colors">Admin Portal</Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>© {currentYear} MealWise. Designed for smart college dining.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
