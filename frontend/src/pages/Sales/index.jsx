// ─── Sales Management Page ─────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  Search, TrendingUp, DollarSign, ShoppingBag, Clock,
  CheckCircle, ArrowUpRight, Receipt, Filter
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { StatCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Feedback';
import {
  getSalesTransactions, getSalesByCategory, getSalesSummary,
  getStudentOrders, updateOrderStatus
} from '../../services/salesService';
import { dailySales } from '../../mock-data/sales';

const PIE_COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export function Sales() {
  const [transactions, setTransactions] = useState([]);
  const [studentOrders, setStudentOrders] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'all'

  const loadData = () => {
    Promise.all([
      getSalesTransactions(),
      getStudentOrders(),
      getSalesByCategory(),
      getSalesSummary(),
    ]).then(([txns, orders, cats, sum]) => {
      setTransactions(txns);
      setStudentOrders(orders);
      setByCategory(cats);
      setSummary(sum);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('mealwise:order_updated', handleUpdate);
    return () => window.removeEventListener('mealwise:order_updated', handleUpdate);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const dates = ['All', ...new Set(transactions.map((t) => t.date))];

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.item.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      (t.student && t.student.toLowerCase().includes(search.toLowerCase()));
    const matchDate = dateFilter === 'All' || t.date === dateFilter;
    return matchSearch && matchDate;
  });

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Sales & Orders Management</h1>
          <p className="text-sm text-slate-500">Live canteen tokens, revenue tracking, and sales history</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`₹${summary.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          trend="up"
          trendValue="+14%"
          subtitle="including live orders"
        />
        <StatCard
          title="Today's Revenue"
          value={`₹${summary.todayRevenue.toLocaleString()}`}
          icon={TrendingUp}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Today's Live Orders"
          value={studentOrders.length}
          icon={ShoppingBag}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          subtitle={`${summary.activeStudentOrdersCount || 0} active tokens`}
        />
        <StatCard
          title="Avg Order Value"
          value={`₹${summary.avgOrderValue}`}
          icon={DollarSign}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <h2 className="font-semibold text-slate-800 mb-4">Daily Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailySales} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={byCategory}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ category, percentage }) => `${category} ${percentage}%`}
                labelLine={false}
              >
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs: Live Orders vs All Transactions */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'live'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Receipt className="h-4 w-4" />
            Today's Live Student Orders ({studentOrders.length})
            {studentOrders.some((o) => o.status !== 'Completed') && (
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="h-4 w-4" />
            All Sales Transactions ({transactions.length})
          </button>
        </div>

        {/* Tab 1: Live Counter Queue */}
        {activeTab === 'live' && (
          <div className="space-y-3">
            {studentOrders.length === 0 ? (
              <div className="card text-center py-12 border-dashed border-slate-200">
                <p className="text-3xl mb-2">🎫</p>
                <h3 className="text-sm font-bold text-slate-800">No live student orders placed yet today</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  When a student browses today's menu on the Student Dashboard and clicks "Confirm Order", their order token and items will appear right here in real time.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {studentOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="card p-4 flex flex-col justify-between border-slate-200 hover:border-brand-300 transition-colors shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-lg text-brand-700 tracking-tight">
                          {ord.token}
                        </span>
                        <Badge
                          variant={
                            ord.status === 'Completed'
                              ? 'green'
                              : ord.status === 'Ready for Pickup'
                              ? 'blue'
                              : 'yellow'
                          }
                        >
                          {ord.status}
                        </Badge>
                      </div>

                      <div className="text-xs text-slate-400">
                        Placed: {ord.createdAt} · Slot: <strong className="text-slate-600">{ord.pickupSlot}</strong>
                      </div>

                      {/* Items */}
                      <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span>{it.quantity}x {it.name}</span>
                            <span className="font-semibold text-slate-900">₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                        {ord.notes && (
                          <div className="pt-1 mt-1 border-t border-slate-200 text-2xs text-amber-700 italic">
                            Note: "{ord.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Payment: {ord.paymentMethod}</span>
                        <span className="font-bold text-slate-900 text-base">₹{ord.totalAmount}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                      <span className="text-2xs text-slate-400">Update Order Status:</span>
                      <div className="flex gap-1.5">
                        {ord.status === 'Preparing in Kitchen' && (
                          <button
                            onClick={() => handleStatusChange(ord.id, 'Ready for Pickup')}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}
                        {ord.status !== 'Completed' && (
                          <button
                            onClick={() => handleStatusChange(ord.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold border border-green-200 transition-colors"
                          >
                            Complete ✓
                          </button>
                        )}
                        {ord.status === 'Completed' && (
                          <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5 text-green-600" /> Handed Over
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Historical Transactions Table */}
        {activeTab === 'all' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  className="input pl-9"
                  placeholder="Search by item, Token #, or transaction ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="input w-full sm:w-44"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                {dates.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Txn / Token</th>
                    <th>Items</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Date / Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((t) => (
                      <tr key={t.id + (t.orderId || '')}>
                        <td className="font-mono text-xs font-bold text-slate-800">
                          {t.id}
                          {t.isStudentOrder && (
                            <span className="ml-1.5 text-2xs px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-sans border border-brand-200">
                              Live
                            </span>
                          )}
                        </td>
                        <td className="font-medium text-slate-800">{t.item}</td>
                        <td>
                          <Badge variant="blue">{t.category}</Badge>
                        </td>
                        <td>{t.qty}</td>
                        <td className="font-semibold text-slate-900">₹{t.amount.toLocaleString()}</td>
                        <td className="text-xs text-slate-400">{t.date} {t.time ? `(${t.time})` : ''}</td>
                        <td>
                          <Badge variant={t.status === 'completed' ? 'green' : 'yellow'}>
                            {t.liveStatus || (t.status === 'completed' ? 'Completed' : 'Pending')}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sales;
