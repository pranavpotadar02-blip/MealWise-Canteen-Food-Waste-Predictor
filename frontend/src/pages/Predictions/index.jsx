// ─── Demand Predictions Page ───────────────────────────────────────────────────
// NOTE: All predictions are illustrative sample data. No real ML model is used.
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Badge } from '../../components/ui/Badge';
import { DemoBanner, PageLoader } from '../../components/ui/Feedback';
import { getPredictions, getWeeklyPrediction, getRecommendations } from '../../services/predictionService';

function TrendIcon({ trend }) {
  if (trend === 'up')   return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-slate-400" />;
}

function confidenceColor(c) {
  if (c >= 90) return 'bg-green-500';
  if (c >= 80) return 'bg-brand-500';
  if (c >= 70) return 'bg-amber-500';
  return 'bg-red-500';
}

export function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPredictions(), getWeeklyPrediction(), getRecommendations()]).then(
      ([preds, wk, r]) => { setPredictions(preds); setWeekly(wk); setRecs(r); setLoading(false); }
    );
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Demand Predictions</h1>
          <p className="text-sm text-slate-500">Forecast-based planning suggestions for tomorrow</p>
        </div>
      </div>

      <DemoBanner text="These are illustrative predictions based on historical sample data. No real machine-learning model is connected in this demo." />

      {/* Weekly chart */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4">Actual vs Predicted Orders (This Week)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="actual" fill="#86efac" name="Actual Orders" radius={[3, 3, 0, 0]} barSize={20} />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Predicted Orders" dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Item-level predictions */}
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Item-Level Forecast (Tomorrow)</h2>
          <div className="space-y-3">
            {predictions.map((p) => (
              <div key={p.item} className="flex items-center gap-3">
                <TrendIcon trend={p.trend} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.item}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-400">{p.historical} → </span>
                      <span className={`text-sm font-semibold ${p.predicted > p.historical ? 'text-green-600' : p.predicted < p.historical ? 'text-red-500' : 'text-slate-700'}`}>
                        {p.predicted}
                      </span>
                    </div>
                  </div>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${confidenceColor(p.confidence)}`} style={{ width: `${p.confidence}%` }} />
                    </div>
                    <span className="text-2xs text-slate-400 flex-shrink-0">{p.confidence}% conf.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Planning Recommendations</h2>
          <div className="space-y-3">
            {recs.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-800">{r.item}</p>
                  <Badge variant={r.priority === 'high' ? 'red' : r.priority === 'medium' ? 'yellow' : 'blue'}>
                    {r.priority}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 mb-1">✅ {r.action}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Info className="h-3 w-3" /> {r.reason}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
            ⚠️ Recommendations are illustrative and based on demo data only.
          </p>
        </div>
      </div>
    </div>
  );
}
