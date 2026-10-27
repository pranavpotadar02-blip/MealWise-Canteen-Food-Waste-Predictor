// ─── Badge ─────────────────────────────────────────────────────────────────────
const VARIANT_MAP = {
  green:  'badge-green',
  yellow: 'badge-yellow',
  red:    'badge-red',
  blue:   'badge-blue',
  slate:  'badge-slate',
  purple: 'badge-purple',
};

export function Badge({ children, variant = 'slate', className = '' }) {
  return (
    <span className={`${VARIANT_MAP[variant] || 'badge-slate'} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    available:   { label: 'Available',    variant: 'green' },
    unavailable: { label: 'Unavailable',  variant: 'red' },
    low:         { label: 'Low Stock',    variant: 'yellow' },
    completed:   { label: 'Completed',    variant: 'green' },
    pending:     { label: 'Pending',      variant: 'yellow' },
    cancelled:   { label: 'Cancelled',    variant: 'red' },
    high:        { label: 'High',         variant: 'red' },
    medium:      { label: 'Medium',       variant: 'yellow' },
    low_priority:{ label: 'Low',          variant: 'blue' },
  };
  const { label, variant } = map[status] || { label: status, variant: 'slate' };
  return <Badge variant={variant}>{label}</Badge>;
}
