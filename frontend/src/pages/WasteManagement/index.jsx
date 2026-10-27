// ─── Waste Management Page ─────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Plus, Trash2, Lightbulb, Search } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal, ConfirmDialog } from '../../components/ui/Modal';
import { PageLoader, EmptyState } from '../../components/ui/Feedback';
import {
  getWasteRecords, addWasteRecord, deleteWasteRecord,
  getWasteTrend, getWasteByReason, getWasteRecommendations
} from '../../services/wasteService';

const REASONS = ['Over-preparation', 'Low demand', 'Spoilage', 'Expired', 'Quality issue'];
const EMPTY_FORM = { item: '', category: 'Lunch', quantity: '', unit: 'portions', reason: 'Over-preparation', cost: '' };
const PIE_COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6'];

export function WasteManagement() {
  const [records, setRecords] = useState([]);
  const [trend, setTrend] = useState([]);
  const [byReason, setByReason] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, record: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([getWasteRecords(), getWasteTrend(), getWasteByReason(), getWasteRecommendations()]).then(
      ([r, t, br, rec]) => { setRecords(r); setTrend(t); setByReason(br); setRecs(rec); setLoading(false); }
    );
  }, []);

  const filtered = records.filter((r) =>
    r.item.toLowerCase().includes(search.toLowerCase()) || r.reason.toLowerCase().includes(search.toLowerCase())
  );

  function set(k) { return (e) => setForm((prev) => ({ ...prev, [k]: e.target.value })); }

  async function handleAdd() {
    if (!form.item || !form.quantity) return;
    setSaving(true);
    const r = await addWasteRecord({ ...form, quantity: Number(form.quantity), cost: Number(form.cost) || 0 });
    setRecords((prev) => [r, ...prev]);
    setSaving(false);
    setAddModal(false);
    setForm(EMPTY_FORM);
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteWasteRecord(deleteModal.record.id);
    setRecords((prev) => prev.filter((r) => r.id !== deleteModal.record.id));
    setDeleting(false);
    setDeleteModal({ open: false, record: null });
  }

  if (loading) return <PageLoader />;

  const totalCost = records.reduce((a, r) => a + r.cost, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Waste Management</h1>
          <p className="text-sm text-slate-500">{records.length} records · ₹{totalCost} estimated waste cost</p>
        </div>
        <Button variant="primary" onClick={() => setAddModal(true)}>
          <Plus className="h-4 w-4" /> Log Waste
        </Button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <h2 className="font-semibold text-slate-800 mb-4">Waste Cost Trend (7 days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v) => [`₹${v}`, 'Waste Cost']} />
              <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} fill="url(#wasteGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Waste by Reason</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byReason} dataKey="value" nameKey="reason" cx="50%" cy="50%" outerRadius={70}>
                {byReason.map((entry, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {byReason.map((r, i) => (
              <div key={r.reason} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-slate-600 flex-1">{r.reason}</span>
                <span className="font-medium text-slate-800">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card border-l-4 border-l-brand-500">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-brand-500" /> Reduction Recommendations
        </h2>
        <ul className="space-y-2">
          {recs.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-0.5 text-brand-500 font-bold">•</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input className="input pl-9" placeholder="Search waste records…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No records found" description="Log waste records or adjust your search." />
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Est. Cost</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="font-medium text-slate-800">{r.item}</td>
                    <td><Badge variant="blue">{r.category}</Badge></td>
                    <td className="text-slate-600">{r.quantity} {r.unit}</td>
                    <td><Badge variant={r.reason === 'Over-preparation' ? 'red' : r.reason === 'Spoilage' ? 'purple' : 'yellow'}>{r.reason}</Badge></td>
                    <td className="font-semibold text-red-600">₹{r.cost}</td>
                    <td className="text-slate-400 text-xs">{r.date}</td>
                    <td>
                      <Button variant="ghost" size="sm" className="hover:text-red-500 hover:bg-red-50" onClick={() => setDeleteModal({ open: true, record: r })}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Log Waste Record">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input id="w-item" label="Food Item" placeholder="Veg Thali" value={form.item} onChange={set('item')} />
            </div>
            <Select id="w-cat" label="Category" value={form.category} onChange={set('category')}>
              {['Breakfast','Lunch','Snacks','Dinner','Beverages','Desserts','Grains','Vegetables','Dairy'].map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select id="w-reason" label="Reason" value={form.reason} onChange={set('reason')}>
              {REASONS.map((r) => <option key={r}>{r}</option>)}
            </Select>
            <Input id="w-qty" label="Quantity" type="number" min="0" placeholder="5" value={form.quantity} onChange={set('quantity')} />
            <Input id="w-unit" label="Unit" placeholder="portions" value={form.unit} onChange={set('unit')} />
            <div className="col-span-2">
              <Input id="w-cost" label="Estimated Cost (₹)" type="number" min="0" placeholder="250" value={form.cost} onChange={set('cost')} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAdd} loading={saving}>Log Waste</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, record: null })}
        onConfirm={handleDelete}
        title="Delete Waste Record"
        message={`Remove waste record for "${deleteModal.record?.item}"?`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
