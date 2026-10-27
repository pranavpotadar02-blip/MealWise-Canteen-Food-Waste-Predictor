// ─── Food Management Page ──────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal, ConfirmDialog } from '../../components/ui/Modal';
import { PageLoader, EmptyState } from '../../components/ui/Feedback';
import { getFoodItems, createFoodItem, updateFoodItem, deleteFoodItem, toggleAvailability } from '../../services/foodService';
import { categories } from '../../mock-data/foodItems';

const EMPTY_FORM = { name: '', category: 'Breakfast', price: '', description: '', available: true, image: '🍽️' };

export function FoodManagement() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modal, setModal] = useState({ type: null, item: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = items;
    if (search) list = list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== 'All') list = list.filter((i) => i.category === categoryFilter);
    setFiltered(list);
  }, [items, search, categoryFilter]);

  async function load() {
    const data = await getFoodItems();
    setItems(data);
    setLoading(false);
  }

  function openAdd() { setForm(EMPTY_FORM); setFormErrors({}); setModal({ type: 'form', item: null }); }
  function openEdit(item) { setForm({ ...item, price: String(item.price) }); setFormErrors({}); setModal({ type: 'form', item }); }
  function openDelete(item) { setModal({ type: 'delete', item }); }
  function closeModal() { setModal({ type: null, item: null }); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Enter a valid price';
    return e;
  }

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    const data = { ...form, price: Number(form.price) };
    if (modal.item) {
      const updated = await updateFoodItem(modal.item.id, data);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } else {
      const created = await createFoodItem(data);
      setItems((prev) => [...prev, created]);
    }
    setSaving(false);
    closeModal();
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteFoodItem(modal.item.id);
    setItems((prev) => prev.filter((i) => i.id !== modal.item.id));
    setDeleting(false);
    closeModal();
  }

  async function handleToggle(id) {
    const updated = await toggleAvailability(id);
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  }

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Food Management</h1>
          <p className="text-sm text-slate-500">{items.length} items · {items.filter((i) => i.available).length} available</p>
        </div>
        <Button variant="primary" onClick={openAdd}>
          <Plus className="h-4 w-4" /> Add Food Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-full sm:w-48"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No items found" description="Try adjusting your search or filters." />
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.image}</span>
                      <div>
                        <p className="font-medium text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[180px]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant="blue">{item.category}</Badge>
                  </td>
                  <td className="font-semibold text-slate-800">₹{item.price}</td>
                  <td>
                    <button onClick={() => handleToggle(item.id)} className="flex items-center gap-1.5 text-sm">
                      {item.available
                        ? <><ToggleRight className="h-5 w-5 text-brand-600" /><span className="text-brand-600 font-medium">Available</span></>
                        : <><ToggleLeft className="h-5 w-5 text-slate-400" /><span className="text-slate-400">Unavailable</span></>
                      }
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-red-500 hover:bg-red-50" onClick={() => openDelete(item)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modal.type === 'form'}
        onClose={closeModal}
        title={modal.item ? 'Edit Food Item' : 'Add Food Item'}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input id="fi-name" label="Item Name" placeholder="Masala Dosa" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={formErrors.name} />
            </div>
            <Select id="fi-cat" label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input id="fi-price" label="Price (₹)" type="number" min="1" placeholder="45" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} error={formErrors.price} />
            <Input id="fi-emoji" label="Emoji Icon" placeholder="🍽️" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <div className="flex items-center gap-2 pt-6">
              <input id="fi-available" type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-brand-600" />
              <label htmlFor="fi-available" className="text-sm font-medium text-slate-700">Available for ordering</label>
            </div>
          </div>
          <Textarea id="fi-desc" label="Description" rows={2} placeholder="Short description…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>{modal.item ? 'Update Item' : 'Add Item'}</Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={modal.type === 'delete'}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Delete Food Item"
        message={`Are you sure you want to delete "${modal.item?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
