import { useForm, usePage } from '@inertiajs/react';
import { Mail, ShieldCheck, UserPlus } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';

interface Props {
  token: string;
  email: string;
  role: string;
  school: { id: number; name: string; slug: string };
  isNewUser: boolean;
}

export default function AcceptInvitation() {
  const { token, email, role, school, isNewUser } = usePage<Props>().props;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    password: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/invite/${token}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
      <PageMeta title="Accept Invitation | AcademixSuite" description="Accept a school staff invitation" />
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <UserPlus className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Accept invitation</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{school.name} invited you as a {role.replace('_', ' ')}.</p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
            <Mail className="size-4 text-gray-400" /> {email}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {isNewUser && (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">Your full name</span>
              <input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-error-500">{errors.name}</p>}
            </label>
          )}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">Password</span>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
              placeholder="Create a password"
            />
            {errors.password && <p className="mt-1 text-xs text-error-500">{errors.password}</p>}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a href="/" className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900">
              Cancel
            </a>
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {processing ? 'Joining...' : 'Join school'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}