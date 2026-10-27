// ─── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-brand-600', iconBg = 'bg-brand-50', trend, trendValue }) {
  return (
    <div className="stat-card">
      <div className={`flex-shrink-0 rounded-xl p-3 ${iconBg}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
        <p className="mt-0.5 text-2xl font-bold font-display text-slate-900">{value}</p>
        {(subtitle || trendValue) && (
          <div className="mt-1 flex items-center gap-1.5">
            {trendValue && (
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
              </span>
            )}
            {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
