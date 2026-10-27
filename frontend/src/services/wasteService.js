// ─── Waste Service (Mock) ─────────────────────────────────────────────────────
import { wasteRecords as initialRecords, wasteTrend, wasteByReason, wasteRecommendations } from '../mock-data/waste';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let store = [...initialRecords];
let nextId = Math.max(...store.map((r) => r.id)) + 1;

export async function getWasteRecords() {
  await delay(300);
  return [...store];
}

export async function addWasteRecord(data) {
  await delay(500);
  const record = { ...data, id: nextId++, date: new Date().toISOString().split('T')[0] };
  store = [record, ...store];
  return { ...record };
}

export async function deleteWasteRecord(id) {
  await delay(400);
  store = store.filter((r) => r.id !== id);
  return { success: true };
}

export async function getWasteTrend() {
  await delay(200);
  return [...wasteTrend];
}

export async function getWasteByReason() {
  await delay(200);
  return [...wasteByReason];
}

export async function getWasteRecommendations() {
  await delay(200);
  return [...wasteRecommendations];
}
