import { useForm } from '@inertiajs/react';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import AuthField from './AuthField';
import AuthNote from './AuthNote';

type ResetPasswordFormProps = {
  email: string;
  token: string;
};

type ResetPasswordData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordData>({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    form.setData({
      token,
      email,
      password: '',
      password_confirmation: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, token]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    form.post('/reset-password', {
      preserveScroll: true,
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  };

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300">
          <ShieldCheck className="size-3.5" />
          Secure reset
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">Reset password</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Choose a new password</h1>
          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            The link was issued for this account. Set a new password to regain access to your school workspace.
          </p>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField
          label="Email address"
          placeholder="you@school.edu"
          autoComplete="email"
          type="email"
          value={form.data.email}
          onChange={(event) => form.setData('email', event.target.value)}
          error={form.errors.email}
          icon={<Mail className="size-4" />}
        />

        <input type="hidden" name="token" value={form.data.token} />

        <AuthField
          label="New password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          type="password"
          autoFocus
          value={form.data.password}
          onChange={(event) => form.setData('password', event.target.value)}
          error={form.errors.password}
          icon={<Lock className="size-4" />}
        />

        <AuthField
          label="Confirm password"
          placeholder="Repeat the new password"
          autoComplete="new-password"
          type="password"
          value={form.data.password_confirmation}
          onChange={(event) => form.setData('password_confirmation', event.target.value)}
          error={form.errors.password_confirmation}
          icon={<Lock className="size-4" />}
        />

        {form.errors.email || form.errors.password ? (
          <AuthNote tone="danger" title="Check the details" message={form.errors.email || form.errors.password || 'Please verify the reset link and password fields.'} />
        ) : null}

        <button
          type="submit"
          disabled={form.processing || !form.data.email || !form.data.password || !form.data.password_confirmation}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(17,24,39,0.18)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.processing ? 'Updating password…' : 'Update password'}
          {!form.processing ? <ArrowRight className="size-4" /> : null}
        </button>
      </form>
    </div>
  );
}