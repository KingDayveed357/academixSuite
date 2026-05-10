import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import AuthField from './AuthField';
import AuthNote from './AuthNote';

import { PageProps } from '../../types/inertia';

type LoginFormData = {
  identity: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const { props } = usePage<PageProps>();
  const { tenant, status, app_url, is_central } = props as any; // Cast for now as status is in flash or separate
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    identity: '',
    password: '',
    remember: true,
  });

  const canSubmit = useMemo(() => form.data.identity.trim().length > 0 && form.data.password.length > 0, [form.data.password, form.data.identity]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    form.post(is_central ? '/login' : '/login', {
      preserveScroll: true,
      onFinish: () => form.reset('password'),
    });
  };

  const centralLoginUrl = `${app_url}/login`;
  const centralRegisterUrl = `${app_url}/register`;
  const centralForgotPasswordUrl = `${app_url}/forgot-password`;

  return (
    <div className="space-y-7">
      <div className="space-y-5">
        {!is_central && tenant ? (
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {tenant.name}
            </div>
            <a href={centralLoginUrl} className="text-xs font-medium text-slate-500 hover:text-brand-600 transition-colors">
              Not your school?
            </a>
          </div>
        ) : is_central ? (
           <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
             Central Login
           </div>
        ) : null}

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">Sign in</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Welcome back</h1>
          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {!is_central && tenant ? `Access ${tenant.name} with your Staff ID or email.` : 'Enter your email address to access your school dashboard.'}
          </p>
        </div>

        {status ? <AuthNote tone="success" title="Password reset complete" message={status} /> : null}
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField
          label={!is_central ? "Email or Staff ID" : "Email Address"}
          placeholder={!is_central ? "e.g. GFLD-0001 or email@example.com" : "you@example.com"}
          autoComplete="username"
          autoFocus
          value={form.data.identity}
          onChange={(event) => form.setData('identity', event.target.value)}
          error={form.errors.identity}
          icon={<User className="size-4" />}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
            <a href={centralForgotPasswordUrl} className="text-sm font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              Forgot password?
            </a>
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

        {form.errors.identity?.includes('registered under this school') && (
           <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4 dark:border-brand-900/30 dark:bg-brand-950/20">
             <p className="text-sm text-brand-800 dark:text-brand-300">
               {form.errors.identity}
             </p>
             <div className="mt-3">
               <a href={centralLoginUrl} className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400">
                 Find your school →
               </a>
             </div>
           </div>
        )}

        {form.errors.identity && !form.errors.identity.includes('registered under this school') ? (
          <AuthNote tone="danger" title="Unable to sign in" message={form.errors.identity} />
        ) : null}

        {form.errors.password && (
          <AuthNote tone="danger" title="Unable to sign in" message={form.errors.password} />
        )}

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

      {is_central && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          New to AcademixSuite?{' '}
          <a href={centralRegisterUrl} className="font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            Register your school →
          </a>
        </p>
      )}
    </div>
  );
}