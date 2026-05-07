import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import AuthField from './AuthField';
import AuthNote from './AuthNote';
import { useMockSession } from '../../app/providers/MockSessionProvider';

type SharedProps = {
  status?: string;
  tenant?: { name: string } | null;
};

type LoginFormData = {
  staff_id: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const { props } = usePage<SharedProps>();
  const { tenant: mockTenant } = useMockSession();
  const tenant = props.tenant ?? mockTenant;
  const status = props.status;
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    staff_id: '',
    password: '',
    remember: true,
  });

  const canSubmit = useMemo(() => form.data.staff_id.trim().length > 0 && form.data.password.length > 0, [form.data.password, form.data.staff_id]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    form.post('/login', {
      preserveScroll: true,
      onFinish: () => form.reset('password'),
    });
  };

  return (
    <div className="space-y-7">
      <div className="space-y-5">
        {tenant ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {tenant.name}
          </div>
        ) : (
          <AuthNote
            tone="warning"
            title="Tenant not resolved"
            message="Use your school's dedicated subdomain so the correct staff directory and role routing are loaded."
          />
        )}

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">Sign in</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Welcome back</h1>
          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {tenant ? `Access ${tenant.name} with your Staff ID and password.` : 'Access your school workspace with your Staff ID and password.'}
          </p>
        </div>

        {status ? <AuthNote tone="success" title="Password reset complete" message={status} /> : null}
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField
          label="Staff ID"
          placeholder="e.g. GFLD-0001"
          autoComplete="username"
          autoFocus
          value={form.data.staff_id}
          onChange={(event) => form.setData('staff_id', event.target.value)}
          error={form.errors.staff_id}
          icon={<User className="size-4" />}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
            <Link href="/forgot-password" className="text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              Forgot password?
            </Link>
          </div>

          <AuthField
            label=""
            placeholder="Enter your password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            value={form.data.password}
            onChange={(event) => form.setData('password', event.target.value)}
            error={form.errors.password}
            icon={<Lock className="size-4" />}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />
        </div>

        {form.errors.staff_id && form.errors.password ? (
          <AuthNote tone="danger" title="Unable to sign in" message={form.errors.staff_id || form.errors.password} />
        ) : null}

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-700">
          <input
            type="checkbox"
            className="sr-only"
            checked={form.data.remember}
            onChange={(event) => form.setData('remember', event.target.checked)}
          />
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-950">
            {form.data.remember ? <span className="h-2.5 w-2.5 rounded-[3px] bg-brand-600" /> : null}
          </span>
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={form.processing || !canSubmit}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(17,24,39,0.18)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.processing ? 'Signing in…' : 'Sign in to dashboard'}
          {!form.processing ? <ArrowRight className="size-4" /> : null}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        New to AcademixSuite?{' '}
        <Link href="/register" className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
          Register your school →
        </Link>
      </p>
    </div>
  );
}