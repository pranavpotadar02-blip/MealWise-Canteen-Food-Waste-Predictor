// ─── Mock Data: Inventory ────────────────────────────────────────────────────
export const inventoryItems = [
  { id: 1,  name: 'Rice',           unit: 'kg',    quantity: 120, minStock: 20, lastUpdated: '2026-10-27', category: 'Grains' },
  { id: 2,  name: 'Wheat Flour',    unit: 'kg',    quantity: 8,   minStock: 15, lastUpdated: '2026-10-26', category: 'Grains' },
  { id: 3,  name: 'Lentils (Dal)',  unit: 'kg',    quantity: 45,  minStock: 10, lastUpdated: '2026-10-27', category: 'Pulses' },
  { id: 4,  name: 'Kidney Beans',   unit: 'kg',    quantity: 6,   minStock: 8,  lastUpdated: '2026-10-25', category: 'Pulses' },
  { id: 5,  name: 'Onions',         unit: 'kg',    quantity: 30,  minStock: 10, lastUpdated: '2026-10-27', category: 'Vegetables' },
  { id: 6,  name: 'Tomatoes',       unit: 'kg',    quantity: 12,  minStock: 10, lastUpdated: '2026-10-27', category: 'Vegetables' },
  { id: 7,  name: 'Potatoes',       unit: 'kg',    quantity: 4,   minStock: 12, lastUpdated: '2026-10-26', category: 'Vegetables' },
  { id: 8,  name: 'Paneer',         unit: 'kg',    quantity: 8,   minStock: 5,  lastUpdated: '2026-10-27', category: 'Dairy' },
  { id: 9,  name: 'Milk',           unit: 'litres',quantity: 40,  minStock: 15, lastUpdated: '2026-10-27', category: 'Dairy' },
  { id: 10, name: 'Curd / Yogurt',  unit: 'kg',    quantity: 3,   minStock: 5,  lastUpdated: '2026-10-26', category: 'Dairy' },
  { id: 11, name: 'Cooking Oil',    unit: 'litres',quantity: 18,  minStock: 8,  lastUpdated: '2026-10-25', category: 'Oils & Fats' },
  { id: 12, name: 'Ghee',           unit: 'kg',    quantity: 2,   minStock: 3,  lastUpdated: '2026-10-26', category: 'Oils & Fats' },
  { id: 13, name: 'Chicken',        unit: 'kg',    quantity: 20,  minStock: 8,  lastUpdated: '2026-10-27', category: 'Meat & Poultry' },
  { id: 14, name: 'Eggs',           unit: 'units', quantity: 200, minStock: 60, lastUpdated: '2026-10-27', category: 'Meat & Poultry' },
  { id: 15, name: 'Sugar',          unit: 'kg',    quantity: 25,  minStock: 10, lastUpdated: '2026-10-25', category: 'Condiments' },
  { id: 16, name: 'Salt',           unit: 'kg',    quantity: 5,   minStock: 2,  lastUpdated: '2026-10-24', category: 'Condiments' },
  { id: 17, name: 'Chilli Powder',  unit: 'kg',    quantity: 1.5, minStock: 2,  lastUpdated: '2026-10-26', category: 'Spices' },
  { id: 18, name: 'Turmeric',       unit: 'kg',    quantity: 0.8, minStock: 1,  lastUpdated: '2026-10-26', category: 'Spices' },
  { id: 19, name: 'Semolina (Rava)',unit: 'kg',    quantity: 15,  minStock: 5,  lastUpdated: '2026-10-25', category: 'Grains' },
  { id: 20, name: 'Coconut',        unit: 'units', quantity: 8,   minStock: 10, lastUpdated: '2026-10-27', category: 'Vegetables' },
];

export const inventoryCategories = ['All', 'Grains', 'Pulses', 'Vegetables', 'Dairy', 'Oils & Fats', 'Meat & Poultry', 'Condiments', 'Spices'];
