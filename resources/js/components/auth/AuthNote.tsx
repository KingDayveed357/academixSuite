import { cn } from '../../utils/cn';

type AuthNoteProps = {
  title: React.ReactNode;
  message?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

const TONES = {
  neutral: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300',
  warning: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300',
  danger: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300',
};

export default function AuthNote({ title, message, tone = 'neutral' }: AuthNoteProps) {
  return (
    <div className={cn('rounded-2xl border px-4 py-1', TONES[tone])}>
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-sm leading-6 opacity-90">{message}</p>
    </div>
  );
}