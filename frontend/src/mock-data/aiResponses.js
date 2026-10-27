// ─── Mock Data: AI Chat Responses ────────────────────────────────────────────
// NOTE: All responses are pre-defined demo responses. No real AI model is used.

export const aiResponses = {
  greetings: [
    "Hello! I'm the MealWise AI Assistant (demo mode). I can help you analyse canteen data, suggest improvements, and answer questions about food management. How can I help you today?",
    "Hi there! Welcome to MealWise. I'm here to assist with canteen insights. What would you like to know?",
  ],
  waste: [
    "📊 **Waste Analysis (Demo Data)**\n\nBased on the current records, your canteen generates approximately **₹950 worth of food waste per day**. The top contributors are:\n\n1. **Over-preparation** (42%) — particularly Veg Thali and Dal Makhani\n2. **Low demand** (28%) — especially in evening slots\n3. **Spoilage** (18%) — perishables like milk and tomatoes\n\n**Recommendations:**\n- Reduce Veg Thali batches by 20% on weekdays\n- Implement a pre-order system for dinner items\n- Order fresh vegetables in smaller, more frequent batches",
    "🗑️ **Food Waste Summary**\n\nThis week's waste trend shows a reduction of **12% compared to last week** — great progress! Key areas to watch:\n- Milk spoilage occurs when large batches are ordered. Consider switching to daily 2L orders.\n- Idli batter leftover can be repurposed as Uttapam to reduce waste by ~8%.",
  ],
  sales: [
    "💰 **Sales Insights (Demo Data)**\n\nToday's sales are tracking at **₹17,800** — your best day this week! Top performers:\n\n1. Chicken Biryani — ₹3,360 (28 portions)\n2. Veg Thali — ₹2,560 (32 portions)\n3. Mango Lassi — ₹2,200 (55 cups)\n\nLunch accounts for **34%** of all revenue. Consider expanding the lunch menu with 2-3 new items.",
    "📈 **Weekly Sales Trend**\n\nYour revenue has grown **14%** week-over-week. Thursday consistently outperforms other days — likely due to higher student attendance. Consider running special combo offers on Mondays and Wednesdays to boost those slower days.",
  ],
  inventory: [
    "📦 **Inventory Alert (Demo Data)**\n\nYou have **4 items below minimum stock level:**\n\n- 🔴 **Wheat Flour** — 8 kg remaining (minimum: 15 kg)\n- 🔴 **Potatoes** — 4 kg remaining (minimum: 12 kg)\n- 🔴 **Curd** — 3 kg remaining (minimum: 5 kg)\n- 🔴 **Chilli Powder** — 1.5 kg remaining (minimum: 2 kg)\n\nRecommend placing an order today to avoid menu disruptions tomorrow morning.",
    "✅ **Inventory Status**\n\nMost items are well-stocked. Based on predicted demand for tomorrow, you may want to pre-order:\n- Extra Rice (+20 kg) — high demand expected\n- Paneer (+3 kg) — upward trend in Paneer Butter Masala orders",
  ],
  predictions: [
    "🔮 **Demand Forecast — Tomorrow (Illustrative)**\n\nBased on historical patterns (no real ML model):\n\n- **Samosa** — Expect 90 portions (↑20% vs average)\n- **Veg Thali** — Expect 38 portions (↑27% vs last week)\n- **Mango Lassi** — Expect 65 cups (↑30% — warm weather)\n- **Chicken Biryani** — Expect 22 portions (↓15% — declining trend)\n\n⚠️ *These are illustrative predictions for demo purposes only.*",
  ],
  default: [
    "I'm the MealWise AI assistant running in **demo mode**. I can answer questions about:\n\n- 🗑️ Food waste analysis and reduction\n- 💰 Sales trends and insights\n- 📦 Inventory management\n- 🔮 Demand predictions\n- 📊 Analytics and reports\n\nTry asking: *\"What are my top-selling items?\"* or *\"How can I reduce food waste?\"*",
    "That's a great question! In demo mode, I have access to sample canteen data. For the best insights, try asking about sales trends, inventory levels, waste analysis, or demand predictions.",
    "I'd be happy to help with that! Based on the demo data available, let me share what I know. Could you be a bit more specific about what aspect of canteen management you're interested in?",
  ],
};

export function getAIResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('waste') || lower.includes('leftover') || lower.includes('spoil')) {
    return aiResponses.waste[Math.floor(Math.random() * aiResponses.waste.length)];
  }
  if (lower.includes('sales') || lower.includes('revenue') || lower.includes('earn') || lower.includes('sell')) {
    return aiResponses.sales[Math.floor(Math.random() * aiResponses.sales.length)];
  }
  if (lower.includes('inventory') || lower.includes('stock') || lower.includes('order')) {
    return aiResponses.inventory[Math.floor(Math.random() * aiResponses.inventory.length)];
  }
  if (lower.includes('predict') || lower.includes('forecast') || lower.includes('demand') || lower.includes('tomorrow')) {
    return aiResponses.predictions[Math.floor(Math.random() * aiResponses.predictions.length)];
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
  }
  return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
}
