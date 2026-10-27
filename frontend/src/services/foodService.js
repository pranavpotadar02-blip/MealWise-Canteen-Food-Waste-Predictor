// ─── Food Service (Mock) ───────────────────────────────────────────────────────
import { foodItems as initialItems } from '../mock-data/foodItems';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// In-memory store (resets on page refresh — demo only)
let store = [...initialItems];
let nextId = Math.max(...store.map((i) => i.id)) + 1;

export async function getFoodItems() {
  await delay(300);
  return [...store];
}

export async function getFoodItem(id) {
  await delay(200);
  const item = store.find((i) => i.id === id);
  if (!item) throw new Error('Food item not found');
  return { ...item };
}

export async function createFoodItem(data) {
  await delay(500);
  const newItem = { ...data, id: nextId++ };
  store = [...store, newItem];
  return { ...newItem };
}

export async function updateFoodItem(id, data) {
  await delay(500);
  store = store.map((i) => (i.id === id ? { ...i, ...data } : i));
  return store.find((i) => i.id === id);
}

export async function deleteFoodItem(id) {
  await delay(400);
  store = store.filter((i) => i.id !== id);
  return { success: true };
}

export async function toggleAvailability(id) {
  await delay(300);
  store = store.map((i) => (i.id === id ? { ...i, available: !i.available } : i));
  return store.find((i) => i.id === id);
}
