import { useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Building2, Check, Globe, Mail, Lock, School2, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import AuthField from './AuthField';
import AuthNote from './AuthNote';

type RegisterData = {
  school_name: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type Step = 1 | 2;

const COUNTRIES = [
  { label: 'Nigeria', value: 'NG' },
  { label: 'Ghana', value: 'GH' },
  { label: 'Kenya', value: 'KE' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
];

const COUNTRY_LABELS = Object.fromEntries(COUNTRIES.map((country) => [country.value, country.label]));

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1);
  const [slugEdited, setSlugEdited] = useState(false);

  const form = useForm<RegisterData>({
    school_name: '',
    slug: '',
    location: '',
    city: '',
    country: 'NG',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const syncLocation = (city: string, country: string) => {
    const parts = [city.trim(), COUNTRY_LABELS[country] ?? country].filter(Boolean);
    form.setData('location', parts.join(', '));
  };

  const updateSchoolName = (value: string) => {
    form.setData('school_name', value);
    if (!slugEdited) {
      form.setData('slug', slugify(value));
    }
  };

  const updateSlug = (value: string) => {
    setSlugEdited(true);
    form.setData('slug', slugify(value));
  };

  const passwordStrength = useMemo(() => {
    const password = form.data.password;
    if (!password) return 0;

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [form.data.password]);

  const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
  const strengthBars = ['bg-slate-300 dark:bg-slate-700', 'bg-rose-500', 'bg-amber-500', 'bg-cyan-500', 'bg-emerald-500'];

  const validateStep = (currentStep: Step) => {
    const nextErrors: Partial<Record<keyof RegisterData, string>> = {};

    if (currentStep === 1) {
      if (!form.data.school_name.trim()) nextErrors.school_name = 'School name is required.';
      if (!form.data.slug.trim()) nextErrors.slug = 'Subdomain is required.';
      if (!form.data.city.trim()) nextErrors.city = 'City is required.';

      Object.entries(nextErrors).forEach(([key, value]) => form.setError(key as keyof RegisterData, value));
      return Object.keys(nextErrors).length === 0;
    }

    if (!form.data.name.trim()) nextErrors.name = 'Your full name is required.';
    if (!form.data.email.trim()) nextErrors.email = 'Recovery email is required.';
    if (!form.data.password || form.data.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.data.password !== form.data.password_confirmation) nextErrors.password_confirmation = 'Passwords do not match.';

    Object.entries(nextErrors).forEach(([key, value]) => form.setError(key as keyof RegisterData, value));
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    form.clearErrors();
    if (!validateStep(1)) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    form.clearErrors();
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (step === 1) {
      next();
      return;
    }

    form.clearErrors();
    if (!validateStep(2)) return;

    form.post('/register', {
      preserveScroll: true,
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  };

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Build your tenant
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-400">Registration</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {step === 1 ? 'Create your school workspace' : 'Set up the owner account'}
          </h1>
          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {step === 1
              ? 'Start with the school identity and subdomain. You can move through this in under a minute.'
              : 'Add the primary owner credentials that will control onboarding, billing, and administration.'}
          </p>
        </div>
      </div>

      <nav aria-label="Registration progress" className="flex items-center gap-3">
        {[
          { id: 1, label: 'School' },
          { id: 2, label: 'Owner' },
        ].map((item, index) => {
          const active = step === item.id;
          const completed = step > item.id;

          return (
            <div key={item.id} className="flex flex-1 items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className={completed ? 'flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white' : active ? 'flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300' : 'flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500'}>
                  {completed ? <Check className="size-4" /> : item.id}
                </div>
                <span className={active || completed ? 'text-sm font-semibold text-slate-900 dark:text-white' : 'text-sm font-medium text-slate-400 dark:text-slate-500'}>{item.label}</span>
              </div>
              {index === 0 ? <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /> : null}
            </div>
          );
        })}
      </nav>

      <form onSubmit={submit} noValidate className="space-y-5">
        {step === 1 ? (
          <div className="space-y-5">
            <AuthField
              label="School name"
              placeholder="e.g. Greenfield Academy"
              autoComplete="organization"
              autoFocus
              value={form.data.school_name}
              onChange={(event) => updateSchoolName(event.target.value)}
              error={form.errors.school_name}
              icon={<Building2 className="size-4" />}
            />

            <AuthField
              label="School subdomain"
              placeholder="greenfield"
              value={form.data.slug}
              onChange={(event) => updateSlug(event.target.value)}
              error={form.errors.slug}
              icon={<School2 className="size-4" />}
              rightSlot={<span className="text-xs font-semibold text-slate-400 dark:text-slate-500">.academixsuite.com</span>}
              helperText="Use a short, memorable URL slug."
            />

            <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
              <AuthField
                label="City"
                placeholder="e.g. Lagos"
                value={form.data.city}
                onChange={(event) => {
                  form.setData('city', event.target.value);
                  syncLocation(event.target.value, form.data.country);
                }}
                error={form.errors.city}
                icon={<Globe className="size-4" />}
              />

              <label className="block space-y-1.5">
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">Country</span>
                <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
                  <select
                    value={form.data.country}
                    onChange={(event) => {
                      form.setData('country', event.target.value);
                      syncLocation(form.data.city, event.target.value);
                    }}
                    className="w-full rounded-2xl bg-transparent px-4 py-3.5 text-sm font-medium text-slate-950 outline-none dark:text-white"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.value} value={country.value}>{country.label}</option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <AuthNote
              tone="neutral"
              title={
                  <div className="inline-flex items-center gap-2">
                    Takes less than a minute 
                    {/* A nicely styled dot */}
                    <span className="mx-2 text-lg my-auto font-bold text-slate-400">•</span> 
                    No credit card required
                  </div>
                }
              // message="Takes less than a minute  ·  No credit card required"
            />
          </div>
        ) : (
          <div className="space-y-5">
            <AuthField
              label="Owner name"
              placeholder="Your full name"
              autoComplete="name"
              autoFocus
              value={form.data.name}
              onChange={(event) => form.setData('name', event.target.value)}
              error={form.errors.name}
              icon={<User className="size-4" />}
            />

            <AuthField
              label="Recovery email"
              placeholder="admin@school.edu"
              autoComplete="email"
              type="email"
              value={form.data.email}
              onChange={(event) => form.setData('email', event.target.value)}
              error={form.errors.email}
              icon={<Mail className="size-4" />}
            />

            <AuthField
              label="Password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              type="password"
              value={form.data.password}
              onChange={(event) => form.setData('password', event.target.value)}
              error={form.errors.password}
              icon={<Lock className="size-4" />}
              helperText="Use at least 8 characters with a number and symbol."
            />

            <AuthField
              label="Confirm password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              type="password"
              value={form.data.password_confirmation}
              onChange={(event) => form.setData('password_confirmation', event.target.value)}
              error={form.errors.password_confirmation}
              icon={<Lock className="size-4" />}
            />

            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <span>Password strength</span>
                <span>{strengthLabel}</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {strengthBars.map((bar, index) => (
                  <div key={bar} className={index < passwordStrength ? `h-1.5 rounded-full ${bar}` : 'h-1.5 rounded-full bg-slate-200 dark:bg-slate-800'} />
                ))}
              </div>
            </div>

            {form.errors.email || form.errors.password ? (
              <AuthNote tone="danger" title="Check the form" message={form.errors.email || form.errors.password || 'Please review the highlighted fields.'} />
            ) : null}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          {step === 2 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          ) : null}

          <button
            type="submit"
            disabled={form.processing}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(17,24,39,0.18)] transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.processing ? 'Creating account…' : step === 1 ? 'Continue' : 'Create school workspace'}
            {!form.processing ? <ArrowRight className="size-4" /> : null}
          </button>
        </div>
      </form>
    </div>
  );
}