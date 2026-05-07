import { useForm } from '@inertiajs/react';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import AuthField from './AuthField';
import AuthNote from './AuthNote';

type ForgotPasswordFormProps = {
  status?: string;
};

export default function ForgotPasswordForm({ status }: ForgotPasswordFormProps) {
  const form = useForm({ email: '' });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    form.post('/forgot-password', {
      preserveScroll: true,
      onFinish: () => form.reset('email'),
    });
  };

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300">
          <ShieldCheck className="size-3.5" />
          Reset access
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">Forgot password</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">We’ll email a reset link</h1>
          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Enter the email address tied to your account and we’ll send a password reset link immediately.
          </p>
        </div>

        {status ? <AuthNote tone="success" title="Email sent" message={status} /> : null}
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField
          label="Email address"
          placeholder="you@school.edu"
          autoComplete="email"
          type="email"
          autoFocus
          value={form.data.email}
          onChange={(event) => form.setData('email', event.target.value)}
          error={form.errors.email}
          icon={<Mail className="size-4" />}
        />

        <button
          type="submit"
          disabled={form.processing || !form.data.email}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(17,24,39,0.18)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.processing ? 'Sending link…' : 'Send reset link'}
          {!form.processing ? <ArrowRight className="size-4" /> : null}
        </button>
      </form>
    </div>
  );
}