// ─── Mock Data: Demand Predictions ───────────────────────────────────────────
// NOTE: These are illustrative figures only. No real ML model is used.

export const predictionData = [
  { item: 'Veg Thali',          category: 'Lunch',    historical: 30, predicted: 38, confidence: 87, trend: 'up' },
  { item: 'Masala Dosa',        category: 'Breakfast',historical: 42, predicted: 50, confidence: 91, trend: 'up' },
  { item: 'Chicken Biryani',    category: 'Lunch',    historical: 26, predicted: 22, confidence: 79, trend: 'down' },
  { item: 'Samosa',             category: 'Snacks',   historical: 75, predicted: 90, confidence: 93, trend: 'up' },
  { item: 'Mango Lassi',        category: 'Beverages',historical: 50, predicted: 65, confidence: 85, trend: 'up' },
  { item: 'Idli Sambar',        category: 'Breakfast',historical: 58, predicted: 55, confidence: 82, trend: 'stable' },
  { item: 'Paneer Butter Masala',category: 'Dinner',  historical: 18, predicted: 25, confidence: 74, trend: 'up' },
  { item: 'Cold Coffee',        category: 'Beverages',historical: 32, predicted: 40, confidence: 88, trend: 'up' },
  { item: 'Vada Pav',           category: 'Snacks',   historical: 65, predicted: 70, confidence: 90, trend: 'stable' },
  { item: 'Rajma Chawal',       category: 'Lunch',    historical: 16, predicted: 14, confidence: 72, trend: 'down' },
];

export const weeklyPrediction = [
  { day: 'Mon', actual: 185, predicted: 190 },
  { day: 'Tue', actual: 210, predicted: 205 },
  { day: 'Wed', actual: 178, predicted: 175 },
  { day: 'Thu', actual: 248, predicted: 240 },
  { day: 'Fri', actual: 205, predicted: 215 },
  { day: 'Sat', actual: 228, predicted: 230 },
  { day: 'Sun', actual: null, predicted: 195 },
];

export const recommendations = [
  { item: 'Samosa',       action: 'Prepare extra 20 portions', reason: 'High demand predicted for snack time', priority: 'high' },
  { item: 'Veg Thali',    action: 'Increase stock by 25%',     reason: 'Upward trend over the past week',      priority: 'medium' },
  { item: 'Mango Lassi',  action: 'Pre-chill ingredients',     reason: 'Warm weather forecast',                 priority: 'medium' },
  { item: 'Chicken Biryani', action: 'Reduce batch by 15%',   reason: 'Declining demand trend',               priority: 'low' },
];
