// ─── Mock Data: Sales Transactions ───────────────────────────────────────────
export const salesTransactions = [
  { id: 'TXN-1001', item: 'Veg Thali',         category: 'Lunch',    qty: 32, amount: 2560, date: '2026-10-27', status: 'completed', student: 'S1023' },
  { id: 'TXN-1002', item: 'Masala Dosa',        category: 'Breakfast',qty: 45, amount: 2025, date: '2026-10-27', status: 'completed', student: 'S1047' },
  { id: 'TXN-1003', item: 'Chicken Biryani',    category: 'Lunch',    qty: 28, amount: 3360, date: '2026-10-27', status: 'completed', student: 'S1012' },
  { id: 'TXN-1004', item: 'Samosa',             category: 'Snacks',   qty: 80, amount: 1200, date: '2026-10-27', status: 'completed', student: 'S1089' },
  { id: 'TXN-1005', item: 'Mango Lassi',        category: 'Beverages',qty: 55, amount: 2200, date: '2026-10-27', status: 'completed', student: 'S1034' },
  { id: 'TXN-1006', item: 'Paneer Butter Masala',category: 'Dinner',  qty: 20, amount: 2200, date: '2026-10-26', status: 'completed', student: 'S1056' },
  { id: 'TXN-1007', item: 'Idli Sambar',        category: 'Breakfast',qty: 60, amount: 1800, date: '2026-10-26', status: 'completed', student: 'S1078' },
  { id: 'TXN-1008', item: 'Rajma Chawal',       category: 'Lunch',    qty: 18, amount: 1260, date: '2026-10-26', status: 'completed', student: 'S1021' },
  { id: 'TXN-1009', item: 'Cold Coffee',        category: 'Beverages',qty: 35, amount: 1750, date: '2026-10-26', status: 'completed', student: 'S1065' },
  { id: 'TXN-1010', item: 'Vada Pav',           category: 'Snacks',   qty: 70, amount: 1400, date: '2026-10-26', status: 'completed', student: 'S1043' },
  { id: 'TXN-1011', item: 'Gulab Jamun',        category: 'Desserts', qty: 30, amount:  900, date: '2026-10-25', status: 'completed', student: 'S1091' },
  { id: 'TXN-1012', item: 'Masala Chai',        category: 'Beverages',qty: 90, amount: 1350, date: '2026-10-25', status: 'completed', student: 'S1037' },
  { id: 'TXN-1013', item: 'Pav Bhaji',          category: 'Snacks',   qty: 25, amount: 1375, date: '2026-10-25', status: 'completed', student: 'S1052' },
  { id: 'TXN-1014', item: 'Fried Rice',         category: 'Dinner',   qty: 15, amount: 1125, date: '2026-10-24', status: 'completed', student: 'S1018' },
  { id: 'TXN-1015', item: 'Ice Cream',          category: 'Desserts', qty: 40, amount: 1400, date: '2026-10-24', status: 'completed', student: 'S1074' },
  { id: 'TXN-1016', item: 'Veg Thali',         category: 'Lunch',    qty: 28, amount: 2240, date: '2026-10-24', status: 'completed', student: 'S1029' },
  { id: 'TXN-1017', item: 'Poha',              category: 'Breakfast', qty: 35, amount:  875, date: '2026-10-23', status: 'completed', student: 'S1061' },
  { id: 'TXN-1018', item: 'Dal Makhani',       category: 'Dinner',    qty: 12, amount: 1020, date: '2026-10-23', status: 'completed', student: 'S1083' },
];

// Aggregated daily sales for charts
export const dailySales = [
  { date: 'Oct 21', revenue: 12400, orders: 185 },
  { date: 'Oct 22', revenue: 14200, orders: 210 },
  { date: 'Oct 23', revenue: 11800, orders: 178 },
  { date: 'Oct 24', revenue: 16500, orders: 248 },
  { date: 'Oct 25', revenue: 13900, orders: 205 },
  { date: 'Oct 26', revenue: 15200, orders: 228 },
  { date: 'Oct 27', revenue: 17800, orders: 265 },
];

export const salesByCategory = [
  { category: 'Lunch',     revenue: 9420, percentage: 34 },
  { category: 'Breakfast', revenue: 5850, percentage: 21 },
  { category: 'Snacks',    revenue: 3975, percentage: 14 },
  { category: 'Dinner',    revenue: 3325, percentage: 12 },
  { category: 'Beverages', revenue: 5300, percentage: 19 },
];
