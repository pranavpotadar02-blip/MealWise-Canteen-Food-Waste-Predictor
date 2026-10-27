// ─── LoadingSpinner.jsx ───────────────────────────────────────────────────────
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 'md', className = '', text = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size] || sizeClasses.md} animate-spin text-brand-600`} />
      {text && <p className="text-xs text-slate-500 font-medium">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
