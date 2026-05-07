import React, { useState } from 'react';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import {
  Building2,
  Settings2,
  UserPlus,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  CreditCard,
  Globe,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import ThemeTogglerTwo from '../../../components/common/ThemeTogglerTwo';

type Step = 1 | 2 | 3 | 4;

interface Props {
  school: { id: number; name: string; slug: string } | null;
  settings: Record<string, string>;
  membership: { staff_id: string; role: string } | null;
  flash: { staff_id?: string; success?: string };
}

const STEPS = [
  { id: 1, label: 'Credentials' },
  { id: 2, label: 'Configure' },
  { id: 3, label: 'Team' },
  { id: 4, label: 'Launch' },
] as const;

export default function OnboardingWizard() {
  const { school, settings, membership, flash } = usePage<Props>().props as any;

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [copied, setCopied] = useState(false);

  const settingsForm = useForm({
    academic_session: settings?.academic_session ?? '2025/2026',
    currency: settings?.currency ?? 'NGN',
    fee_template: settings?.fee_template ?? 'standard',
    classes: settings?.classes ?? '',
  });

  const staffId = flash?.staff_id ?? membership?.staff_id ?? 'XXXX-0001';

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    settingsForm.post('/onboarding/settings', {
      onSuccess: () => nextStep(),
    });
  };

  const handleComplete = () => {
    router.post('/onboarding/complete');
  };

  const copyStaffId = () => {
    navigator.clipboard.writeText(staffId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate progress percentage
  const progressPercent = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Head title="Set up your school — AcademixSuite" />

      {/* ═══ Top bar ═══════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
        <div className="mx-auto max-w-3xl flex items-center justify-between px-5 sm:px-8 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="AcademixSuite" className="h-7 w-auto dark:hidden" />
            <img src="/assets/dark-logo.png" alt="AcademixSuite" className="h-7 w-auto hidden dark:block" />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs font-medium text-gray-400">
              Step {currentStep} of {STEPS.length}
            </span>
            <div className="w-24 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <a
              href="mailto:support@academixsuite.com"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <HelpCircle className="size-3.5" />
              <span className="hidden sm:inline">Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* ═══ Content area ══════════════════════════════════════════════════ */}
      <main className="mx-auto max-w-2xl px-5 sm:px-8 py-10 sm:py-14">

        {/* ── Step nav ──────────────────────────────────────────────────── */}
        <nav className="mb-10" aria-label="Onboarding steps">
          <ol className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const isCompleted = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <React.Fragment key={s.id}>
                  <li className="flex flex-col items-center gap-2 min-w-0">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                        isCompleted
                          ? 'bg-brand-600 text-white'
                          : isCurrent
                          ? 'border-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950'
                          : 'border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600'
                      )}
                    >
                      {isCompleted ? <Check className="size-4" /> : s.id}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold transition-colors hidden sm:block',
                        isCurrent || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-400 dark:text-gray-600'
                      )}
                    >
                      {s.label}
                    </span>
                  </li>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      'flex-1 h-px mx-2 sm:mx-4 transition-colors duration-500',
                      isCompleted ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-800'
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        {/* ── Step heading ──────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {currentStep === 1 && 'Your owner credentials'}
            {currentStep === 2 && 'Configure your school'}
            {currentStep === 3 && 'Invite your team'}
            {currentStep === 4 && 'You\'re all set'}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-lg">
            {currentStep === 1 && 'Save your Staff ID — this is how you and your team will sign in every day.'}
            {currentStep === 2 && 'Set up your academic session, currency, and fee structure defaults.'}
            {currentStep === 3 && 'Add staff members now or invite them later from the dashboard.'}
            {currentStep === 4 && 'Your school is configured and ready. Here\'s a quick summary.'}
          </p>
        </div>

        {/* ═══ Step content ══════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="p-6 sm:p-8">

            {/* ─── STEP 1: Credentials ─────────────────────────────────── */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Staff ID card */}
                <div className="rounded-xl bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-800/50 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                      Your Staff ID
                    </span>
                    <button
                      onClick={copyStaffId}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 transition-colors rounded-md px-2 py-1 bg-brand-100/50 dark:bg-brand-900/30"
                    >
                      {copied ? (
                        <><Check className="size-3" /> Copied</>
                      ) : (
                        <><Copy className="size-3" /> Copy</>
                      )}
                    </button>
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-extrabold text-brand-600 dark:text-brand-400 tracking-widest">
                    {staffId}
                  </div>
                  <p className="text-xs text-brand-600/60 dark:text-brand-400/60 mt-3 flex items-center gap-1.5">
                    <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                    Save this securely — you'll need it every time you sign in.
                  </p>
                </div>

                {/* Subdomain card */}
                {school && (
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="size-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        School Portal
                      </span>
                    </div>
                    <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                      {school.slug}.academixsuite.com
                    </p>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Share this URL with your staff so they can access the login page.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ─── STEP 2: System Configuration ────────────────────────── */}
            {currentStep === 2 && (
              <form onSubmit={handleSaveSettings}>
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Academic Session */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Calendar className="size-4 text-brand-500" />
                        Academic session
                      </label>
                      <select
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700 outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        value={settingsForm.data.academic_session}
                        onChange={(e) => settingsForm.setData('academic_session', e.target.value)}
                      >
                        <option>2024/2025</option>
                        <option>2025/2026</option>
                        <option>2026/2027</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <CreditCard className="size-4 text-brand-500" />
                        Currency
                      </label>
                      <select
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700 outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        value={settingsForm.data.currency}
                        onChange={(e) => settingsForm.setData('currency', e.target.value)}
                      >
                        <option value="NGN">NGN — Nigerian Naira</option>
                        <option value="GHS">GHS — Ghanaian Cedi</option>
                        <option value="KES">KES — Kenyan Shilling</option>
                        <option value="USD">USD — US Dollar</option>
                        <option value="GBP">GBP — British Pound</option>
                      </select>
                    </div>
                  </div>

                  {/* Fee Template */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Building2 className="size-4 text-brand-500" />
                      Fee structure template
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'standard', label: 'K–12 Standard', desc: 'Term-based fees' },
                        { value: 'tertiary', label: 'Higher Ed', desc: 'Semester-based' },
                        { value: 'custom', label: 'Custom', desc: 'Start from scratch' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => settingsForm.setData('fee_template', opt.value)}
                          className={cn(
                            'p-3.5 rounded-xl border-2 text-left transition-all duration-200',
                            settingsForm.data.fee_template === opt.value
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/50 shadow-sm shadow-brand-500/10'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                          )}
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{opt.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit embedded in step 2 form */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={settingsForm.processing}
                      className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 h-11 text-sm font-bold text-white shadow-sm transition-all disabled:opacity-50"
                    >
                      {settingsForm.processing ? 'Saving…' : 'Save & continue'}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ─── STEP 3: Invite Staff ────────────────────────────────── */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-center py-4">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-5">
                    <UserPlus className="text-blue-600 dark:text-blue-400 size-6" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                    You can invite administrators, bursars, and teachers now — or do it later from the Staff section of your dashboard.
                  </p>

                  <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                    <p className="text-sm text-gray-400 mb-4">
                      Each staff member receives a unique Staff ID after accepting their invitation.
                    </p>
                    {school && (
                      <a
                        href="/staff/invite"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-5 h-10 text-sm font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                      >
                        <UserPlus className="size-4" />
                        Invite staff members
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 4: Complete ────────────────────────────────────── */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-center py-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-5">
                    <Sparkles className="text-emerald-600 dark:text-emerald-400 size-7" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ready to launch
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Your school is configured and ready to go. Head to your dashboard to start managing.
                  </p>

                  {/* Summary card */}
                  <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-5 text-left max-w-sm mx-auto">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">
                      Configuration summary
                    </h4>
                    <div className="space-y-2.5">
                      <SummaryRow label="School" value={school?.name ?? '—'} />
                      <SummaryRow label="Staff ID" value={staffId} mono />
                      <SummaryRow label="Session" value={settingsForm.data.academic_session} />
                      <SummaryRow label="Currency" value={settingsForm.data.currency} />
                      <SummaryRow label="Fee structure" value={settingsForm.data.fee_template} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── Footer navigation ────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 h-10 text-sm font-semibold transition-colors',
                currentStep === 1
                  ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
              )}
            >
              <ArrowLeft className="size-4" />
              Back
            </button>

            {currentStep < 4 && currentStep !== 2 && (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 h-10 text-sm font-bold text-white shadow-sm transition-all"
              >
                {currentStep === 3 ? 'Skip for now' : 'Continue'}
                <ArrowRight className="size-4" />
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 h-10 text-sm font-bold text-white shadow-sm transition-all"
              >
                Launch dashboard
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Support footer ──────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <a
            href="mailto:support@academixsuite.com"
            className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <HelpCircle className="size-3.5" />
            Contact support
          </a>
          <span className="hidden sm:block">·</span>
          <a
            href="/docs/onboarding"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Read the setup guide
          </a>
          <span className="hidden sm:block">·</span>
          <span>Our team can help migrate your existing records</span>
        </div>
      </main>

      {/* Theme toggler */}
      <div className="fixed bottom-5 right-5 z-50 hidden sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className={cn(
        'text-sm font-semibold text-gray-900 dark:text-white',
        mono && 'font-mono text-brand-600 dark:text-brand-400'
      )}>
        {value}
      </span>
    </div>
  );
}
