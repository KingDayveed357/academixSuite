import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';

interface RoleOption {
  value: string;
  label: string;
}

interface Props {
  roles: RoleOption[];
  flash?: { success?: string };
}

export default function InviteStaff() {
  const { roles, flash } = usePage<Props>().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    role: roles[0]?.value ?? 'school_admin',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/staff/invite', {
      preserveScroll: true,
      onSuccess: () => reset('email'),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
      <PageMeta title="Invite Staff | AcademixSuite" description="Invite staff members to your school" />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400">
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                <UserPlus className="size-3.5" /> Staff Invitations
              </p>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Invite a staff member</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Send a role-based invitation to a staff member in this tenant.</p>
            </div>
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <ShieldCheck className="size-6" />
            </div>
          </div>

          {flash?.success && (
            <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
              {flash.success}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">Email address</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                  placeholder="name@school.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error-500">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">Role</span>
              <select
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-error-500">{errors.role}</p>}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700 disabled:opacity-60"
              >
                {processing ? 'Sending invitation...' : 'Send invitation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}