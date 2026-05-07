import React from 'react';
import { cn } from '../../utils/cn';

type AuthFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function AuthField({ label, helperText, error, icon, rightSlot, className, ...props }: AuthFieldProps) {
  return (
    <label className="block space-y-1.5">
      {label ? (
        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      ) : null}

      <div
        className={cn(
          'relative flex items-center rounded-2xl border bg-white/95 shadow-sm transition focus-within:ring-2 focus-within:ring-brand-500/30 dark:bg-slate-900/90',
          error
            ? 'border-rose-300 dark:border-rose-500/50 focus-within:ring-rose-500/20'
            : 'border-slate-200/90 dark:border-slate-800',
          className,
        )}
      >
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            {icon}
          </span>
        ) : null}

        <input
          {...props}
          className={cn(
            'w-full rounded-2xl bg-transparent px-4 py-3.5 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white',
            icon ? 'pl-14' : 'pl-4',
            rightSlot ? 'pr-12' : 'pr-4',
          )}
        />

        {rightSlot ? <div className="absolute right-3.5 flex items-center">{rightSlot}</div> : null}
      </div>

      {error ? (
        <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </label>
  );
}