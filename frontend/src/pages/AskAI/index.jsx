// ─── Ask AI Page ───────────────────────────────────────────────────────────────
// NOTE: All responses are pre-defined demo responses. No real AI is connected.
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { sendMessage, getWelcomeMessage } from '../../services/aiService';
import { DemoBanner } from '../../components/ui/Feedback';

const SUGGESTIONS = [
  'How can I reduce food waste?',
  'What are my top-selling items?',
  'Show me inventory alerts',
  'Predict demand for tomorrow',
  'Analyse my sales trends',
];

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-slide-up`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${isUser ? 'bg-brand-600' : 'bg-slate-700'}`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-white border border-slate-100 text-slate-700 shadow-card rounded-tl-sm'
        }`}>
          {msg.content}
        </div>
        <span className="text-2xs text-slate-400 px-1">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {msg.isDemo && !isUser && ' · Demo response'}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-slate-700 text-white">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-card">
        <div className="flex gap-1 items-center h-4">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export function AskAI() {
  const [messages, setMessages] = useState([getWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend(text) {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content, timestamp: new Date().toISOString() }]);
    setLoading(true);
    try {
      const reply = await sendMessage(content);
      setMessages((prev) => [...prev, reply]);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setMessages([getWelcomeMessage()]);
    setInput('');
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-500" />
            Ask AI
          </h1>
          <p className="text-sm text-slate-500">Chat with the MealWise canteen assistant</p>
        </div>
        <button
          onClick={handleReset}
          className="btn-ghost text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> New Chat
        </button>
      </div>

      <DemoBanner text="This is a demo AI assistant using pre-defined responses. No real AI model or external API is connected." />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto mt-4 mb-4 space-y-4 pr-1">
        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-600 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-2 bg-white border border-slate-200 rounded-2xl p-3 shadow-card">
        <textarea
          className="flex-1 resize-none text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none max-h-32 min-h-[2.5rem] leading-6"
          placeholder="Ask about sales, inventory, waste, predictions…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
          }}
          rows={1}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
