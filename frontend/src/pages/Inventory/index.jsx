// ─── Inventory Management Page ─────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { PageLoader, EmptyState } from '../../components/ui/Feedback';
import { getInventory, updateStock } from '../../services/inventoryService';
import { inventoryCategories } from '../../mock-data/inventory';

function stockStatus(item) {
  if (item.quantity <= item.minStock * 0.5) return { label: 'Critical', variant: 'red' };
  if (item.quantity <= item.minStock) return { label: 'Low Stock', variant: 'yellow' };
  return { label: 'In Stock', variant: 'green' };
}

export function Inventory() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal] = useState({ open: false, item: null });
  const [newQty, setNewQty] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = items;
    if (search) list = list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== 'All') list = list.filter((i) => i.category === catFilter);
    if (statusFilter === 'Low') list = list.filter((i) => i.quantity <= i.minStock);
    setFiltered(list);
  }, [items, search, catFilter, statusFilter]);

  async function load() {
    const data = await getInventory();
    setItems(data);
    setLoading(false);
  }

  function openUpdate(item) { setModal({ open: true, item }); setNewQty(String(item.quantity)); }
  function closeModal() { setModal({ open: false, item: null }); }

  async function handleUpdate() {
    if (!newQty || isNaN(Number(newQty)) || Number(newQty) < 0) return;
    setSaving(true);
    const updated = await updateStock(modal.item.id, Number(newQty));
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setSaving(false);
    closeModal();
  }

  if (loading) return <PageLoader />;

  const lowCount = items.filter((i) => i.quantity <= i.minStock).length;
  const critCount = items.filter((i) => i.quantity <= i.minStock * 0.5).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500">{items.length} items · {lowCount} low stock</p>
        </div>
        <Button variant="secondary" onClick={load}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* Alert banner */}
      {lowCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <span>
            <strong>{lowCount} items</strong> are below minimum stock level
            {critCount > 0 && <>, including <strong>{critCount} critical</strong> items that need immediate attention</>}.
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input className="input pl-9" placeholder="Search ingredients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input w-full sm:w-44" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          {inventoryCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input w-full sm:w-36" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Low">Low Stock</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No items found" description="Adjust your search or filters." icon={Package} />
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Min. Stock</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const status = stockStatus(item);
                return (
                  <tr key={item.id}>
                    <td className="font-medium text-slate-800">{item.name}</td>
                    <td><Badge variant="blue">{item.category}</Badge></td>
                    <td>
                      <span className={`font-semibold ${item.quantity <= item.minStock ? 'text-red-600' : 'text-slate-800'}`}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="text-slate-500">{item.minStock} {item.unit}</td>
                    <td><Badge variant={status.variant}>{status.label}</Badge></td>
                    <td className="text-slate-400 text-xs">{item.lastUpdated}</td>
                    <td>
                      <Button variant="ghost" size="sm" onClick={() => openUpdate(item)}>
                        Update Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Update modal */}
      <Modal isOpen={modal.open} onClose={closeModal} title={`Update Stock — ${modal.item?.name}`} size="sm">
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-50 p-3 text-sm">
            <p className="text-slate-500">Current: <strong className="text-slate-800">{modal.item?.quantity} {modal.item?.unit}</strong></p>
            <p className="text-slate-500">Minimum: <strong className="text-slate-800">{modal.item?.minStock} {modal.item?.unit}</strong></p>
          </div>
          <Input
            id="inv-qty"
            label={`New Quantity (${modal.item?.unit})`}
            type="number"
            min="0"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdate} loading={saving}>Update</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
