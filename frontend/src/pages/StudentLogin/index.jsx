// ─── Student Login Page ────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChefHat, Utensils, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { loginStudent } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { demoUsers } from '../../mock-data/users';

export function StudentLogin() {
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
      const { user } = await loginStudent(form);
      login(user);
      navigate('/student/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickLogin() {
    setLoading(true);
    setApiError('');
    try {
      const { user } = await loginStudent({
        email: demoUsers.student.email,
        password: demoUsers.student.password,
      });
      login(user);
      navigate('/student/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setForm({ email: demoUsers.student.email, password: demoUsers.student.password });
    setErrors({});
    setApiError('');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 px-4 py-12">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2.5 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
          <ChefHat className="h-5 w-5 text-white" />
        </div>
        <span className="font-display font-bold text-slate-900 text-xl">MealWise</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-card-lg border border-surface-border p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Utensils className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Student Login</h1>
            <p className="text-xs text-slate-400">Access today's menu and canteen info</p>
          </div>
        </div>

        {/* Demo banner with 1-click login */}
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-bold text-amber-800">⚡ Demo Credentials</p>
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={loading}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-colors"
            >
              1-Click Demo Login <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-xs text-amber-700 mb-2">
            Email: <code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded">{demoUsers.student.email}</code><br />
            Password: <code className="font-mono bg-amber-100/80 px-1 py-0.5 rounded">{demoUsers.student.password}</code>
          </p>
          <button type="button" onClick={fillDemo} className="text-xs font-medium text-amber-800 underline hover:text-amber-950">
            Pre-fill form fields →
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="student-email"
            label="College Email"
            type="email"
            placeholder="student@college.edu"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />

          <div className="w-full">
            <label className="label" htmlFor="student-password">Password</label>
            <div className="relative">
              <input
                id="student-password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">
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

          <Button type="submit" variant="primary" className="w-full justify-center mt-1" loading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-5 text-center space-y-2">
          <p className="text-sm text-slate-500">
            New student?{' '}
            <Link to="/student/register" className="font-medium text-brand-600 hover:text-brand-700">
              Register here →
            </Link>
          </p>
          <p className="text-xs text-slate-400">
            Are you an administrator?{' '}
            <Link to="/admin/login" className="text-slate-600 hover:underline">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
