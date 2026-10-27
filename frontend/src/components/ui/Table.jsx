// ─── Table.jsx ────────────────────────────────────────────────────────────────
// Reusable styled data table wrapper with headers, cells, and responsive scrolling.
// ─────────────────────────────────────────────────────────────────────────────

export function Table({ children, className = '' }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-left text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return (
    <thead className={`border-b border-surface-border bg-slate-50 text-2xs uppercase tracking-wider font-semibold text-slate-500 ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }) {
  return (
    <tbody className={`divide-y divide-surface-border bg-white ${className}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', hover = true, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`${hover ? 'hover:bg-slate-50/80 transition-colors' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return (
    <th className={`px-4 py-3.5 font-semibold text-slate-600 ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = '' }) {
  return (
    <td className={`px-4 py-3.5 text-slate-700 align-middle ${className}`}>
      {children}
    </td>
  );
}

export default Table;
