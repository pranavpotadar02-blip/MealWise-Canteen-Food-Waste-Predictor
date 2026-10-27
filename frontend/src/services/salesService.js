// ─── Sales Service (Mock) ─────────────────────────────────────────────────────
import { salesTransactions as initialTransactions, dailySales, salesByCategory } from '../mock-data/sales';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const STUDENT_ORDERS_KEY = 'mealwise_student_orders';

/**
 * Fetch all actual orders placed by students
 */
export async function getStudentOrders() {
  await delay(150);
  try {
    const raw = localStorage.getItem(STUDENT_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Update status of a student order (e.g. Preparing -> Ready for Pickup -> Completed)
 */
export async function updateOrderStatus(orderId, newStatus) {
  await delay(200);
  try {
    const raw = localStorage.getItem(STUDENT_ORDERS_KEY);
    const orders = raw ? JSON.parse(raw) : [];
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    localStorage.setItem(STUDENT_ORDERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('mealwise:order_updated', { detail: { orderId, status: newStatus } }));
    return updated;
  } catch (err) {
    console.error('Failed to update order status', err);
    throw err;
  }
}

/**
 * Get unified sales transactions (including actual student orders)
 */
export async function getSalesTransactions() {
  await delay(250);
  const studentOrders = await getStudentOrders();

  // Convert student orders to unified transaction format
  const convertedStudentTxns = studentOrders.map((o) => ({
    id: o.token || o.id,
    orderId: o.id,
    item: o.items.map((i) => `${i.quantity}x ${i.name}`).join(', '),
    category: o.items[0]?.category || 'Meals',
    qty: o.totalQuantity,
    amount: o.totalAmount,
    date: o.date || new Date().toISOString().split('T')[0],
    time: o.createdAt || 'Today',
    status: o.status === 'Completed' ? 'completed' : 'pending',
    liveStatus: o.status,
    student: o.token,
    paymentMethod: o.paymentMethod,
    isStudentOrder: true,
  }));

  return [...convertedStudentTxns, ...initialTransactions];
}

export async function getDailySales() {
  await delay(200);
  return [...dailySales];
}

export async function getSalesByCategory() {
  await delay(200);
  return [...salesByCategory];
}

export async function getSalesSummary() {
  await delay(200);
  const studentOrders = await getStudentOrders();
  const studentRevenue = studentOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const baseTotal = initialTransactions.reduce((sum, t) => sum + t.amount, 0);
  const total = baseTotal + studentRevenue;

  const todayBase = initialTransactions.filter((t) => t.date === '2026-10-27');
  const todayRevenue = todayBase.reduce((sum, t) => sum + t.amount, 0) + studentRevenue;
  const todayOrders = todayBase.length + studentOrders.length;
  const totalOrders = initialTransactions.length + studentOrders.length;

  return {
    totalRevenue: total,
    todayRevenue,
    totalOrders,
    todayOrders,
    avgOrderValue: Math.round(total / (totalOrders || 1)),
    activeStudentOrdersCount: studentOrders.filter((o) => o.status !== 'Completed').length,
  };
}
