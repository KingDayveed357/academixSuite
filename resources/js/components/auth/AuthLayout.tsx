import React from 'react';
import { Link } from '@inertiajs/react';
import ThemeTogglerTwo from '../common/ThemeTogglerTwo';
import { cn } from '../../utils/cn';
import GridShape from "../common/GridShape";


type AuthVariant = 'login' | 'register' | 'forgot-password' | 'reset-password';

type AuthLayoutProps = {
  children: React.ReactNode;
  variant: AuthVariant;
};

const VARIANTS: Record<
  AuthVariant,
  {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    bullets: string[];
    image: string;
    alt: string;
    accent: string;
  }
> = {
  login: {
    eyebrow: 'Secure access',
    title: 'Sign in to the right school, instantly',
    description: 'Tenant-aware authentication keeps every school record, role, and payment flow exactly where it belongs.',
    badge: 'Role-based routing',
    bullets: ['School subdomains are resolved automatically', 'Staff IDs route users to the correct workspace', 'Sessions regenerate on every successful sign-in'],
    image: '/assets/icons/authentication.svg',
    alt: 'Authentication illustration',
    accent: 'from-sky-400/20 via-brand-500/10 to-transparent',
  },
  register: {
    eyebrow: 'Launch faster',
    title: 'Create a school workspace without setup friction',
    description: 'A compact onboarding flow captures the school, owner, and subdomain in one clean pass.',
    badge: 'Owner onboarding',
    bullets: ['A school tenant is created during registration', 'The owner account is provisioned immediately', 'You move straight into onboarding after signup'],
    image: '/assets/icons/authentication.svg',
    alt: 'Authentication and onboarding illustration',
    accent: 'from-emerald-400/20 via-brand-500/10 to-transparent',
  },
  'forgot-password': {
    eyebrow: 'Self-service recovery',
    title: 'Send a secure reset link in one request',
    description: 'No support ticket loop. Verified users get a direct password reset link in their inbox.',
    badge: 'Email verification',
    bullets: ['Reset links are short-lived and unique', 'Only the registered email can receive a link', 'Users return to the same sign-in flow after reset'],
    image: '/assets/icons/forgot-password.svg',
    alt: 'Forgot password illustration',
    accent: 'from-amber-400/20 via-sky-500/10 to-transparent',
  },
  'reset-password': {
    eyebrow: 'Password recovery',
    title: 'Set a new password with confidence',
    description: 'Token-based recovery stays minimal and focused while still reinforcing account security.',
    badge: 'One-time token',
    bullets: ['Use the email address tied to the reset token', 'New passwords are confirmed before submission', 'The session returns to the sign-in page after success'],
    image: '/assets/icons/otp-security.svg',
    alt: 'OTP security illustration',
    accent: 'from-brand-500/20 via-cyan-500/10 to-transparent',
  },
};

function AuthPanel({ variant }: { variant: AuthVariant }) {
  const content = VARIANTS[variant];

  return (
    <aside className="relative hidden overflow-hidden border-l border-slate-200/80 bg-slate-950 text-white dark:border-white/5 lg:flex">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,129,255,0.2),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.5))]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-between px-8 py-8 xl:px-10">
       <GridShape />
        <div className="space-y-8">
         
          <div className="flex items-center justify-between">
            <span className={cn('inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-200 backdrop-blur')}>{content.badge}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300 backdrop-blur">Premium auth</span>
          </div>

          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200/80">{content.eyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white xl:text-[2.6rem] xl:leading-[1.05]">{content.title}</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">{content.description}</p>
          </div>

          <div className={cn('rounded-[2rem] border border-white/10 mb-5 bg-gradient-to-br p-5 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-sm', content.accent)}>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10  p-3 shadow-[0_20px_60px_rgba(0,0,0,0.22)] dark:bg-slate-900/90">
                <img
                  src={content.image}
                  alt={content.alt}
                  className="mx-auto w-full max-w-[30rem] object-contain opacity-95 drop-shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:brightness-[1.02] dark:contrast-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {content.bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="mb-2 h-1.5 w-10 rounded-full bg-gradient-to-r from-brand-300 to-cyan-300" />
              <p className="text-sm leading-6 text-slate-300">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function AuthLayout({ children, variant }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,0.94fr)] xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <main className="flex min-h-screen flex-col border-r border-slate-200/80 bg-white dark:border-white/5 dark:bg-slate-950">
          <header className="flex items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/assets/logo.png" alt="AcademixSuite" className="h-8 w-auto dark:hidden" />
              <img src="/assets/dark-logo.png" alt="AcademixSuite" className="hidden h-8 w-auto dark:block" />
            </Link>

            <a
              href="mailto:support@academixsuite.com"
              className="hidden items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white sm:flex"
            >
              Need help?
            </a>
          </header>

          <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 md:px-12 lg:px-14">
            <div className="w-full max-w-[31rem]">{children}</div>
          </div>

          <footer className="border-t border-slate-200/80 px-6 py-4 sm:px-8 lg:px-10 dark:border-white/5">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} AcademixSuite ·{' '}
              <Link href="/privacy" className="transition hover:text-slate-600 dark:hover:text-slate-300">Privacy</Link> ·{' '}
              <Link href="/terms" className="transition hover:text-slate-600 dark:hover:text-slate-300">Terms</Link>
            </p>
          </footer>
        </main>

        <AuthPanel variant={variant} />
      </div>

      <div className="fixed bottom-5 right-5 z-50 hidden sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}