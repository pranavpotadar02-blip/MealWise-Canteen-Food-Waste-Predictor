// ─── Admin Login Page ──────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChefHat, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { loginAdmin } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { demoUsers } from '../../mock-data/users';

export function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { user } = await loginAdmin(form);
      login(user);
      navigate('/admin/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setForm({ email: demoUsers.admin.email, password: demoUsers.admin.password });
    setErrors({});
    setApiError('');
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-950 to-brand-800 p-10 text-white">
        <Link to="/" className="flex items-center gap-2.5 w-fit">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl">MealWise</span>
        </Link>

        <div>
          <ShieldCheck className="h-12 w-12 text-brand-300 mb-4" />
          <h2 className="font-display text-3xl font-bold mb-3">Admin Portal</h2>
          <p className="text-brand-200 leading-relaxed max-w-sm">
            Manage your canteen with powerful tools for food management, inventory tracking,
            demand predictions, and waste analytics.
          </p>
        </div>

        <p className="text-brand-400 text-sm">© 2026 MealWise</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 bg-white">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-10 lg:hidden">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="max-w-sm w-full mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-slate-900">Admin Sign In</h1>
            <p className="mt-1 text-sm text-slate-500">Enter your credentials to access the admin dashboard.</p>
          </div>

          {/* Demo banner */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold text-amber-700 mb-2">⚡ Demo Credentials</p>
            <p className="text-xs text-amber-600 mb-3">
              Email: <code className="font-mono">{demoUsers.admin.email}</code><br />
              Password: <code className="font-mono">{demoUsers.admin.password}</code>
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="text-xs font-medium text-amber-700 underline hover:text-amber-900"
            >
              Fill demo credentials →
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="admin-email"
              label="Email Address"
              type="email"
              placeholder="admin@mealwise.demo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              autoComplete="email"
            />

            <div className="w-full">
              <label className="label" htmlFor="admin-password">Password</label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {apiError && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {apiError}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full justify-center mt-2" loading={loading}>
              Sign In to Dashboard
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Not an admin?{' '}
            <Link to="/student/login" className="font-medium text-brand-600 hover:text-brand-700">
              Student login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
