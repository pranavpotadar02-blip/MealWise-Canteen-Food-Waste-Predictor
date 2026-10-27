// ─── Inventory Service (Mock) ─────────────────────────────────────────────────
import { inventoryItems as initialItems } from '../mock-data/inventory';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let store = [...initialItems];

export async function getInventory() {
  await delay(300);
  return [...store];
}

export async function updateStock(id, quantity) {
  await delay(400);
  store = store.map((i) =>
    i.id === id
      ? { ...i, quantity, lastUpdated: new Date().toISOString().split('T')[0] }
      : i
  );
  return store.find((i) => i.id === id);
}

export async function getLowStockItems() {
  await delay(200);
  return store.filter((i) => i.quantity <= i.minStock);
}
