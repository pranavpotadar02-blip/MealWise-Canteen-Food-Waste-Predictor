// ─── Mock Data: Waste Records ─────────────────────────────────────────────────
export const wasteRecords = [
  { id: 1, item: 'Veg Thali',       category: 'Lunch',    quantity: 8,  unit: 'portions', reason: 'Over-preparation', date: '2026-10-27', cost: 640  },
  { id: 2, item: 'Idli Sambar',     category: 'Breakfast',quantity: 12, unit: 'portions', reason: 'Expired',          date: '2026-10-27', cost: 360  },
  { id: 3, item: 'Rajma Chawal',    category: 'Lunch',    quantity: 5,  unit: 'portions', reason: 'Over-preparation', date: '2026-10-26', cost: 350  },
  { id: 4, item: 'Masala Chai',     category: 'Beverages',quantity: 15, unit: 'cups',     reason: 'Low demand',       date: '2026-10-26', cost: 225  },
  { id: 5, item: 'Paneer Butter Masala',category: 'Dinner',quantity: 4, unit: 'portions', reason: 'Over-preparation', date: '2026-10-25', cost: 440  },
  { id: 6, item: 'Tomatoes',        category: 'Vegetables',quantity: 3, unit: 'kg',       reason: 'Spoilage',         date: '2026-10-25', cost: 120  },
  { id: 7, item: 'Bread',           category: 'Grains',   quantity: 2,  unit: 'loaves',   reason: 'Expired',          date: '2026-10-24', cost: 80   },
  { id: 8, item: 'Chicken Biryani', category: 'Lunch',    quantity: 6,  unit: 'portions', reason: 'Low demand',       date: '2026-10-24', cost: 720  },
  { id: 9, item: 'Milk',            category: 'Dairy',    quantity: 4,  unit: 'litres',   reason: 'Spoilage',         date: '2026-10-23', cost: 180  },
  { id: 10,item: 'Gulab Jamun',     category: 'Desserts', quantity: 10, unit: 'pieces',   reason: 'Low demand',       date: '2026-10-23', cost: 100  },
  { id: 11,item: 'Dal Makhani',     category: 'Dinner',   quantity: 7,  unit: 'portions', reason: 'Over-preparation', date: '2026-10-22', cost: 595  },
  { id: 12,item: 'Poha',            category: 'Breakfast',quantity: 9,  unit: 'portions', reason: 'Over-preparation', date: '2026-10-21', cost: 225  },
];

export const wasteTrend = [
  { date: 'Oct 21', waste: 820, cost: 820 },
  { date: 'Oct 22', waste: 1100, cost: 1100 },
  { date: 'Oct 23', waste: 695, cost: 695 },
  { date: 'Oct 24', waste: 940, cost: 940 },
  { date: 'Oct 25', waste: 785, cost: 785 },
  { date: 'Oct 26', waste: 610, cost: 610 },
  { date: 'Oct 27', waste: 1000, cost: 1000 },
];

export const wasteByReason = [
  { reason: 'Over-preparation', value: 42, color: '#ef4444' },
  { reason: 'Low demand',       value: 28, color: '#f59e0b' },
  { reason: 'Spoilage',         value: 18, color: '#8b5cf6' },
  { reason: 'Expired',          value: 12, color: '#3b82f6' },
];

export const wasteRecommendations = [
  'Reduce Veg Thali preparation by 20% on weekdays — consistent over-production detected.',
  'Order Milk in smaller batches (2 L instead of 5 L) to prevent spoilage.',
  'Consider a pre-order system for Paneer Butter Masala to match actual student demand.',
  'Use leftover Idli batter to prepare Uttapam as a secondary menu item.',
  'Review Masala Chai preparation schedule — current batches consistently exceed demand.',
];
