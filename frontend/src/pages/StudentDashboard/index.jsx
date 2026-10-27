// ─── Student Dashboard Page ────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  Search, Filter, ShoppingBag, Plus, Minus, CheckCircle,
  Clock, ArrowRight, X, Utensils, AlertCircle, Receipt, Trash2
} from 'lucide-react';
import { getFoodItems } from '../../services/foodService';
import { PageLoader } from '../../components/ui/Feedback';
import { useAuth } from '../../hooks/useAuth';
import { categories } from '../../mock-data/foodItems';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Mess Hours Extended', body: 'Dinner service will now run until 9:30 PM on weekdays.', date: '2026-10-27', type: 'info' },
  { id: 2, title: 'New Item Added!', body: 'Paneer Butter Masala is now available for dinner. Try it today!', date: '2026-10-26', type: 'new' },
  { id: 3, title: 'UPI Payments Accepted', body: 'You can now pay via PhonePe, Google Pay, and Paytm at the canteen counter.', date: '2026-10-25', type: 'update' },
];

const LOCAL_ORDERS_KEY = 'mealwise_student_orders';

function FoodCard({ item, quantity = 0, onAdd, onUpdateQuantity }) {
  return (
    <div className={`bg-white rounded-xl border shadow-card p-4 flex gap-3 transition-all hover:shadow-card-md ${!item.available ? 'opacity-65 bg-slate-50/70' : ''}`}>
      <span className="text-3xl select-none flex-shrink-0">{item.image}</span>
      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-slate-800 leading-tight">{item.name}</p>
            <span className="font-bold text-brand-700 text-sm flex-shrink-0">₹{item.price}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="blue">{item.category}</Badge>
            {item.available ? (
              <Badge variant="green">Available</Badge>
            ) : (
              <Badge variant="red">Sold Out</Badge>
            )}
          </div>
        </div>

        {/* Order Action Button */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {item.available ? 'Ready in ~10m' : 'Currently unavailable'}
          </span>

          {item.available && (
            <div>
              {quantity === 0 ? (
                <button
                  onClick={() => onAdd(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white border border-brand-200 hover:border-brand-600 transition-all shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add to Order
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-300 rounded-lg p-0.5 shadow-sm">
                  <button
                    onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                    className="h-6 w-6 rounded bg-white text-brand-700 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-bold text-xs text-brand-900 w-4 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                    className="h-6 w-6 rounded bg-white text-brand-700 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StudentDashboard() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAvailable, setShowAvailable] = useState(false);
  const { user } = useAuth();

  // Cart state: { [itemId]: { item, quantity } }
  const [cart, setCart] = useState({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [pickupSlot, setPickupSlot] = useState('Immediate (10-15 mins)');
  const [paymentMethod, setPaymentMethod] = useState('Pay at Counter (Cash/UPI)');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Placed orders history
  const [placedOrders, setPlacedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    getFoodItems()
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load food items:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let list = items;
    if (search) list = list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== 'All') list = list.filter((i) => i.category === activeCategory);
    if (showAvailable) list = list.filter((i) => i.available);
    setFiltered(list);
  }, [items, search, activeCategory, showAvailable]);

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { item, quantity: 1 },
    }));
  };

  const updateQuantity = (itemId, newQty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (newQty <= 0) {
        delete next[itemId];
      } else if (next[itemId]) {
        next[itemId] = { ...next[itemId], quantity: newQty };
      }
      return next;
    });
  };

  const clearCart = () => setCart({});

  const cartList = Object.values(cart);
  const totalQuantity = cartList.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalAmount = cartList.reduce((sum, entry) => sum + entry.quantity * entry.item.price, 0);

  // Place Order handler
  const handlePlaceOrder = () => {
    if (cartList.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const tokenNumber = `#MW-${Math.floor(100 + Math.random() * 900)}`;
      const order = {
        id: `ord-${Date.now()}`,
        token: tokenNumber,
        items: cartList.map((c) => ({
          id: c.item.id,
          name: c.item.name,
          quantity: c.quantity,
          price: c.item.price,
          image: c.item.image,
        })),
        totalAmount,
        totalQuantity,
        pickupSlot,
        paymentMethod,
        notes: orderNotes,
        status: 'Preparing in Kitchen',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0],
      };

      const updated = [order, ...placedOrders];
      setPlacedOrders(updated);
      try {
        localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save order to localStorage', e);
      }

      setLastPlacedOrder(order);
      setCart({});
      setOrderNotes('');
      setIsSubmitting(false);
    }, 600);
  };

  if (loading) return <PageLoader />;

  const availableCount = items.filter((i) => i.available).length;
  const displayName = user?.name || 'Student';
  const displaySubtitle = user?.rollNumber
    ? `${user.rollNumber} · ${user.department || 'Student'}`
    : 'Campus Canteen Portal';

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 p-5 text-white shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-brand-200">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},
          </p>
          <h1 className="font-display text-xl sm:text-2xl font-bold mt-0.5">{displayName} 👋</h1>
          <p className="text-sm text-brand-100 mt-1">{displaySubtitle}</p>
          <div className="mt-3 flex items-center gap-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow" />
              {availableCount} items available right now
            </span>
          </div>
        </div>

        {/* View Active Orders Button */}
        {placedOrders.length > 0 && (
          <button
            onClick={() => setIsOrdersOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white font-semibold text-xs sm:text-sm transition-all"
          >
            <Receipt className="h-4 w-4" />
            My Active Orders ({placedOrders.length})
          </button>
        )}
      </div>

      {/* Announcements */}
      <div>
        <h2 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide text-slate-500">
          📢 Canteen Announcements
        </h2>
        <div className="space-y-2">
          {ANNOUNCEMENTS.map((a) => (
            <div
              key={a.id}
              className={`rounded-xl border px-4 py-3 transition-colors ${
                a.type === 'info'
                  ? 'border-blue-100 bg-blue-50/70'
                  : a.type === 'new'
                  ? 'border-green-100 bg-green-50/70'
                  : 'border-amber-100 bg-amber-50/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-semibold ${
                    a.type === 'info' ? 'text-blue-800' : a.type === 'new' ? 'text-green-800' : 'text-amber-800'
                  }`}
                >
                  {a.title}
                </p>
                <span className="text-xs text-slate-400">{a.date}</span>
              </div>
              <p
                className={`text-xs mt-0.5 ${
                  a.type === 'info' ? 'text-blue-600' : a.type === 'new' ? 'text-green-600' : 'text-amber-600'
                }`}
              >
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Header with Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900">Today's Live Menu</h2>
            <p className="text-xs text-slate-500">Choose items below to place your order directly</p>
          </div>
          <button
            onClick={() => setShowAvailable(!showAvailable)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              showAvailable ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <Filter className="h-3 w-3" />
            Available only
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            className="input pl-9"
            placeholder="Search food items (e.g. Masala Dosa, Biryani, Chai)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="text-sm font-semibold text-slate-700">No food items found</p>
            <p className="text-xs mt-1 text-slate-400">Try adjusting your search query or selected category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3.5">
            {filtered.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                quantity={cart[item.id]?.quantity || 0}
                onAdd={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-slate-400 text-center mt-5">
          Showing {filtered.length} of {items.length} items · Prices in INR · Demo ordering simulation
        </p>
      </div>

      {/* ── Floating Tray / Cart Bar ─────────────────────────────── */}
      {totalQuantity > 0 && (
        <aside aria-label="Order tray" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-slate-900 text-white rounded-2xl shadow-card-lg border border-slate-800 p-4 animate-slide-up flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">My Tray ({totalQuantity} items)</p>
              <p className="text-base font-bold text-white">₹{totalAmount}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-colors"
          >
            Review & Place <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      )}

      {/* ── Checkout / Place Order Modal ───────────────────────── */}
      {isCheckoutOpen && (
        <Modal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          title="Review Your Canteen Order"
          size="md"
        >
          <div className="space-y-4">
            {/* Selected items list */}
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {cartList.map(({ item, quantity }) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-400">₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="h-5 w-5 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="h-5 w-5 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-slate-800 w-12 text-right">
                      ₹{quantity * item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between border border-slate-200">
              <span className="font-semibold text-slate-700 text-sm">Total Payable Amount</span>
              <span className="font-display font-extrabold text-brand-700 text-lg">₹{totalAmount}</span>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="label">Pickup Timing</label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="input"
                >
                  <option value="Immediate (10-15 mins)">Immediate (10-15 mins)</option>
                  <option value="Lunch Service (12:30 PM - 1:30 PM)">Lunch Service (12:30 PM - 1:30 PM)</option>
                  <option value="Evening Snacks (4:30 PM - 5:30 PM)">Evening Snacks (4:30 PM - 5:30 PM)</option>
                  <option value="Dinner Service (7:30 PM - 9:00 PM)">Dinner Service (7:30 PM - 9:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="label">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="input"
                >
                  <option value="Pay at Counter (Cash/UPI)">Pay at Counter (Cash / Counter UPI QR)</option>
                  <option value="Prepaid Online (GPay / PhonePe / Paytm)">Prepaid Online (UPI Simulator)</option>
                  <option value="Student College Mess Card">Student College Mess Card</option>
                </select>
              </div>

              <div>
                <label className="label">Kitchen Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, extra chutney, pack in parcel..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                loading={isSubmitting}
                onClick={handlePlaceOrder}
              >
                Confirm & Place Order (₹{totalAmount})
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Order Success Modal ─────────────────────────────────── */}
      {lastPlacedOrder && (
        <Modal
          isOpen={!!lastPlacedOrder}
          onClose={() => setLastPlacedOrder(null)}
          title="Order Confirmed!"
          size="sm"
        >
          <div className="text-center py-2 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Pickup Token</p>
              <p className="font-display text-4xl font-extrabold text-brand-600 mt-1">
                {lastPlacedOrder.token}
              </p>
              <p className="text-xs text-slate-500 mt-1">Show this token at the canteen collection counter</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 text-left border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-amber-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {lastPlacedOrder.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Ready:</span>
                <span className="font-semibold text-slate-800">{lastPlacedOrder.pickupSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-semibold text-slate-800">{lastPlacedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="text-slate-500">Total:</span>
                <span className="font-bold text-slate-900">₹{lastPlacedOrder.totalAmount} ({lastPlacedOrder.totalQuantity} items)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                variant="secondary"
                className="w-full justify-center text-xs"
                onClick={() => setLastPlacedOrder(null)}
              >
                Done
              </Button>
              <Button
                variant="primary"
                className="w-full justify-center text-xs"
                onClick={() => {
                  setLastPlacedOrder(null);
                  setIsOrdersOpen(true);
                }}
              >
                Track My Orders
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── My Orders Modal ────────────────────────────────────── */}
      {isOrdersOpen && (
        <Modal
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          title="My Canteen Orders"
          size="md"
        >
          <div className="space-y-4">
            {placedOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Receipt className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">No active orders</p>
                <p className="text-xs text-slate-400">Place an order from today's menu to receive a token</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {placedOrders.map((ord) => (
                  <div key={ord.id} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-extrabold text-base text-brand-700">
                          {ord.token}
                        </span>
                        <Badge variant="yellow">{ord.status}</Badge>
                      </div>
                      <span className="text-xs text-slate-400">{ord.createdAt}</span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.quantity}x {it.name}</span>
                          <span className="font-medium text-slate-800">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>Pickup: {ord.pickupSlot}</span>
                      <span className="font-bold text-slate-900 text-sm">₹{ord.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsOrdersOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default StudentDashboard;
