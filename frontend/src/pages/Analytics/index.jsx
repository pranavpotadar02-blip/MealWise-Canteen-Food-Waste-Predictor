// ─── Analytics Page ────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, DollarSign, Trash2, Package } from 'lucide-react';
import { StatCard } from '../../components/ui/Card';
import { dailySales, salesByCategory } from '../../mock-data/sales';
import { wasteTrend, wasteByReason } from '../../mock-data/waste';
import { weeklyPrediction } from '../../mock-data/predictions';

const PIE_COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export function Analytics() {
  const [range, setRange] = useState('7d');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Analytics</h1>
          <p className="text-sm text-slate-500">Comprehensive performance overview</p>
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {['7d', '14d', '30d'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                range === r ? 'bg-brand-600 text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '14d' ? '14 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="₹1,01,800" icon={DollarSign} iconColor="text-green-600" iconBg="bg-green-50" trend="up" trendValue="+18%" subtitle="vs last week" />
        <StatCard title="Total Orders" value="1,519" icon={TrendingUp} iconColor="text-brand-600" iconBg="bg-brand-50" trend="up" trendValue="+12%" subtitle="this period" />
        <StatCard title="Waste Cost" value="₹6,950" icon={Trash2} iconColor="text-red-500" iconBg="bg-red-50" trend="down" trendValue="-12%" subtitle="vs last week" />
        <StatCard title="Inventory Alerts" value="4" icon={Package} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Revenue & Orders */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailySales}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Orders per Day</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailySales} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category + Waste */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={salesByCategory} dataKey="revenue" nameKey="category" cx="50%" cy="50%" outerRadius={75} innerRadius={35}>
                {salesByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {salesByCategory.map((c, i) => (
              <div key={c.category} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-slate-600 flex-1">{c.category}</span>
                <span className="font-medium">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Waste Cost Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={wasteTrend}>
              <defs>
                <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`₹${v}`, 'Waste']} />
              <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} fill="url(#wGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Demand vs Prediction</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyPrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top items table */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4">Top Performing Items</h2>
        <div className="table-wrapper border-0 shadow-none">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Item</th>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, item: 'Masala Dosa',     cat: 'Breakfast', sold: 450, revenue: 20250, share: 20 },
                { rank: 2, item: 'Veg Thali',        cat: 'Lunch',     sold: 380, revenue: 30400, share: 30 },
                { rank: 3, item: 'Samosa',           cat: 'Snacks',    sold: 750, revenue: 11250, share: 11 },
                { rank: 4, item: 'Chicken Biryani',  cat: 'Lunch',     sold: 220, revenue: 26400, share: 26 },
                { rank: 5, item: 'Mango Lassi',      cat: 'Beverages', sold: 310, revenue: 12400, share: 12 },
              ].map((row) => (
                <tr key={row.rank}>
                  <td className="font-bold text-slate-400">#{row.rank}</td>
                  <td className="font-medium text-slate-800">{row.item}</td>
                  <td><span className="badge badge-blue">{row.cat}</span></td>
                  <td>{row.sold}</td>
                  <td className="font-semibold text-slate-800">₹{row.revenue.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                        <div className="h-full bg-brand-500 rounded-full" style={{ width: `${row.share}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{row.share}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
