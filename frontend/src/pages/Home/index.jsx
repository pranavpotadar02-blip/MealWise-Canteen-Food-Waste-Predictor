// ─── Home Page ─────────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';
import {
  ChefHat, TrendingUp, Package, Trash2, BarChart2,
  ArrowRight, CheckCircle, Star, Users, Utensils
} from 'lucide-react';

const FEATURES = [
  {
    icon: Package,
    title: 'Smart Inventory',
    desc: 'Track stock levels in real time. Get alerts before items run out so your kitchen never misses a beat.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: TrendingUp,
    title: 'Demand Forecasting',
    desc: 'AI-powered predictions help you prepare the right quantity of food, reducing guesswork and costs.',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
  },
  {
    icon: Trash2,
    title: 'Waste Reduction',
    desc: 'Monitor food waste trends, identify causes, and act on data-driven recommendations.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: BarChart2,
    title: 'Rich Analytics',
    desc: 'Beautiful dashboards showing sales, inventory health, waste metrics, and more — at a glance.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

const STATS = [
  { value: '40%', label: 'Average waste reduction' },
  { value: '3x',  label: 'Faster inventory audits' },
  { value: '95%', label: 'Prediction accuracy' },
  { value: '₹0',  label: 'Setup cost for demo' },
];

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg">MealWise</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/student/login" className="btn-ghost text-sm hidden sm:inline-flex">
                Student Login
              </Link>
              <Link to="/admin/login" className="btn-primary text-sm">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 px-4 py-24 sm:py-32 text-white">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-700/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-700 bg-brand-900/60 px-4 py-1.5 text-sm text-brand-300">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-slow" />
            AI-Powered Canteen Intelligence
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Run a Smarter{' '}
            <span className="text-brand-400">Canteen</span>,<br />
            Waste Less, Earn More
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            MealWise gives canteen administrators real-time inventory control, AI-driven demand
            forecasting, and actionable waste analytics — all in one beautiful dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/admin/login" className="btn-primary btn-lg w-full sm:w-auto group">
              Admin Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/student/login" className="btn w-full sm:w-auto border border-white/20 bg-white/10 text-white hover:bg-white/20 px-6 py-3 text-base">
              Student View
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-brand-600">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything you need to manage your canteen
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            From food management to AI-powered demand predictions — MealWise has it all.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="card hover:shadow-card-md transition-shadow">
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Role cards ─────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
            Built for everyone in the canteen
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin */}
            <div className="card border-2 border-brand-100 hover:border-brand-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Admin Portal</p>
                  <p className="text-xs text-slate-400">For canteen managers</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {['Manage food items & menu', 'Track inventory & low stock', 'View sales & transactions', 'AI demand predictions', 'Waste analytics & tips', 'Ask AI assistant'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-brand-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/admin/login" className="btn-primary w-full justify-center">
                Go to Admin Login
              </Link>
            </div>

            {/* Student */}
            <div className="card border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Student Portal</p>
                  <p className="text-xs text-slate-400">For college students</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {["Today's menu", 'Browse available food items', 'Check prices & availability', 'View categories', 'Canteen announcements', 'Simple, clean interface'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/student/login" className="btn w-full justify-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm shadow-sm rounded-lg font-medium inline-flex items-center gap-2">
                Go to Student Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white px-4 py-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
              <ChefHat className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-slate-700 text-sm">MealWise</span>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 MealWise. Frontend demo — no real data is stored.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span>Built with React + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
