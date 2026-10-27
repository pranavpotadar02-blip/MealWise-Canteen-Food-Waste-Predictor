// ─── Prediction Service (Mock) ────────────────────────────────────────────────
// NOTE: No real ML model is used. Data is illustrative.
import { predictionData, weeklyPrediction, recommendations } from '../mock-data/predictions';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getPredictions() {
  await delay(600);
  return [...predictionData];
}

export async function getWeeklyPrediction() {
  await delay(400);
  return [...weeklyPrediction];
}

export async function getRecommendations() {
  await delay(300);
  return [...recommendations];
}
