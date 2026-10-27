// ─── Student Register Page ─────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChefHat, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { registerStudent } from '../../services/authService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function StudentRegister() {
  const [form, setForm] = useState({ name: '', rollNumber: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.rollNumber.trim()) errs.rollNumber = 'Roll number is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { user } = await registerStudent(form);
      setSuccess(true);
      setTimeout(() => {
        login(user);
        navigate('/student/dashboard');
      }, 1500);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 px-4">
        <div className="text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
            <CheckCircle className="h-8 w-8 text-brand-600" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">Registration Successful!</h2>
          <p className="mt-2 text-sm text-slate-500">Redirecting to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 px-4 py-12">
      <Link to="/" className="flex items-center gap-2.5 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
          <ChefHat className="h-5 w-5 text-white" />
        </div>
        <span className="font-display font-bold text-slate-900 text-xl">MealWise</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-card-lg border border-surface-border p-8">
        <h1 className="font-display text-xl font-bold text-slate-900 mb-1">Create Student Account</h1>
        <p className="text-sm text-slate-400 mb-6">Demo registration only — no real account is created.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="reg-name"   label="Full Name"    placeholder="Arjun Mehta"        value={form.name}            onChange={set('name')}            error={errors.name} />
          <Input id="reg-roll"   label="Roll Number"  placeholder="CS2024042"           value={form.rollNumber}       onChange={set('rollNumber')}      error={errors.rollNumber} />
          <Input id="reg-email"  label="College Email" placeholder="name@college.edu"   value={form.email}           onChange={set('email')}           error={errors.email} type="email" />

          <div className="w-full">
            <label className="label" htmlFor="reg-pw">Password</label>
            <div className="relative">
              <input
                id="reg-pw"
                type={showPw ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set('password')}
                className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <Input
            id="reg-confirm"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            error={errors.confirmPassword}
          />

          {errors.form && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{errors.form}</div>
          )}

          <Button type="submit" variant="primary" className="w-full justify-center" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/student/login" className="font-medium text-brand-600 hover:text-brand-700">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
