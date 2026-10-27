// ─── AI Service (Mock / Demo) ─────────────────────────────────────────────────
// NOTE: No real LLM or external API is called. Responses are pre-defined demos.
import { getAIResponse, aiResponses } from '../mock-data/aiResponses';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function sendMessage(message) {
  // Simulate network + processing delay
  await delay(1200 + Math.random() * 800);
  return {
    role: 'assistant',
    content: getAIResponse(message),
    timestamp: new Date().toISOString(),
    isDemo: true,
  };
}

export function getWelcomeMessage() {
  return {
    role: 'assistant',
    content: aiResponses.greetings[0],
    timestamp: new Date().toISOString(),
    isDemo: true,
  };
}
