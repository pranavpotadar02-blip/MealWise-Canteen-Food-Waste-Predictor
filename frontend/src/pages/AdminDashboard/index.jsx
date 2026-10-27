// ─── Admin Dashboard ───────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  DollarSign, UtensilsCrossed, Package, TrendingUp,
  Trash2, AlertTriangle, Clock, ArrowRight, ShoppingBag,
  CheckCircle, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { StatCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { PageLoader } from '../../components/ui/Feedback';
import {
  getSalesSummary, getDailySales, getStudentOrders,
  updateOrderStatus, getSalesTransactions
} from '../../services/salesService';
import { getLowStockItems } from '../../services/inventoryService';
import { getWasteRecords } from '../../services/wasteService';

export function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [dailySales, setDailySales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [wasteRecords, setWasteRecords] = useState([]);
  const [studentOrders, setStudentOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([
      getSalesSummary(),
      getDailySales(),
      getLowStockItems(),
      getWasteRecords(),
      getStudentOrders(),
      getSalesTransactions(),
    ]).then(([sum, daily, stock, waste, orders, txns]) => {
      setSummary(sum);
      setDailySales(daily);
      setLowStock(stock);
      setWasteRecords(waste.slice(0, 5));
      setStudentOrders(orders);
      setTransactions(txns.slice(0, 6));
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
      console.error('Failed to change status', err);
    }
  };

  if (loading) return <PageLoader />;

  const activeOrders = studentOrders.filter((o) => o.status !== 'Completed');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Overview of today's canteen operations & live order queue</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/student/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <UtensilsCrossed className="h-3.5 w-3.5" />
            Preview Student Portal
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Updated live</span>
          </div>
        </div>
      </div>

      {/* ── Today's Live Student Orders Banner / Queue ──────────────── */}
      <div className="card border-brand-200 bg-gradient-to-br from-white to-brand-50/30">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base text-slate-900">
                  Today's Actual Student Orders
                </h2>
                {activeOrders.length > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                Live tokens placed by students via the Student Portal
              </p>
            </div>
          </div>
          <Link
            to="/admin/sales"
            className="text-xs text-brand-700 hover:text-brand-800 font-semibold flex items-center gap-1"
          >
            Full Sales History <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {studentOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center">
            <p className="text-2xl mb-1">🎫</p>
            <p className="text-sm font-semibold text-slate-700">No student orders placed yet today</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-3">
              When students select food items on the Student Dashboard and confirm, their live tokens and item lists will appear here instantly.
            </p>
            <Link
              to="/student/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-xs"
            >
              Go to Student Dashboard to Place a Test Order →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {studentOrders.slice(0, 6).map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-base text-brand-700">
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
                  <div className="text-xs text-slate-400 mt-0.5">
                    Placed at {ord.createdAt} · {ord.pickupSlot}
                  </div>
                  <div className="mt-2 text-xs text-slate-700 font-medium space-y-0.5">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.quantity}x {it.name}</span>
                        <span className="text-slate-400">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">₹{ord.totalAmount}</span>

                  <div className="flex gap-1.5">
                    {ord.status === 'Preparing in Kitchen' && (
                      <button
                        onClick={() => handleStatusChange(ord.id, 'Ready for Pickup')}
                        className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-2xs font-semibold border border-blue-200 transition-colors"
                      >
                        Mark Ready
                      </button>
                    )}
                    {ord.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(ord.id, 'Completed')}
                        className="px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100 text-2xs font-semibold border border-green-200 transition-colors"
                      >
                        Complete ✓
                      </button>
                    )}
                    {ord.status === 'Completed' && (
                      <span className="text-2xs text-slate-400 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" /> Handed Over
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Today's Total Revenue"
          value={`₹${summary.todayRevenue.toLocaleString()}`}
          subtitle="including live orders"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          trend="up"
          trendValue="+14%"
        />
        <StatCard
          title="Active Live Orders"
          value={activeOrders.length}
          subtitle="tokens awaiting pickup"
          icon={ShoppingBag}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStock.length}
          subtitle="items need reorder"
          icon={Package}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend="down"
          trendValue="action needed"
        />
        <StatCard
          title="Predicted Demand"
          value="~240"
          subtitle="orders tomorrow (est.)"
          icon={TrendingUp}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Weekly sales trend */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-slate-800">Weekly Revenue & Order Volume</h2>
              <p className="text-xs text-slate-400 mt-0.5">Last 7 days performance</p>
            </div>
            <Link to="/admin/analytics" className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              Analytics <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 3, fill: '#16a34a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Waste overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-slate-800">Waste Summary</h2>
              <p className="text-xs text-slate-400 mt-0.5">Today's recorded loss</p>
            </div>
            <Link to="/admin/waste" className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              Details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="text-center py-4">
            <span className="font-display text-3xl font-extrabold text-red-500">₹{totalWasteCost}</span>
            <p className="text-xs text-slate-400 mt-1">Total estimated waste cost</p>
          </div>
          <div className="space-y-2 border-t border-slate-100 pt-3">
            {wasteRecords.slice(0, 3).map((w) => (
              <div key={w.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 truncate max-w-[140px]">{w.item}</span>
                <span className="font-semibold text-slate-800">{w.quantityKg} kg · ₹{w.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent transactions (includes student live orders) */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Recent Transactions & Live Orders</h2>
            <Link to="/admin/sales" className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-800 truncate">{txn.item}</p>
                    {txn.isStudentOrder && (
                      <span className="text-2xs font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                        Live Token
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{txn.id} · {txn.qty} portions</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-slate-900">₹{txn.amount.toLocaleString()}</p>
                  <Badge variant={txn.status === 'completed' ? 'green' : 'yellow'} className="text-2xs">
                    {txn.liveStatus || txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Low Stock Alerts
            </h2>
            <Link to="/admin/inventory" className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {lowStock.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.category} · min: {item.minStock} {item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{item.quantity} {item.unit}</p>
                  <Badge variant="red" className="text-2xs">Low Stock</Badge>
                </div>
              </div>
            ))}
            {lowStock.length === 0 && (
              <p className="text-sm text-slate-400 py-4 text-center">All items well stocked ✓</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
