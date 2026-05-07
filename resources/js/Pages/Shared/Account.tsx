import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';
import { useAuth } from '../../hooks/useAuth';

export default function Account() {
  const { user, role, session } = useAuth();

  return (
    <AuthenticatedLayout title="Account">
      <Head title="Account" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Account settings</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Current mock session and tenant context.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard label="Name" value={user?.name ?? '—'} />
          <InfoCard label="Role" value={role ?? '—'} />
          <InfoCard label="Email" value={user?.email ?? '—'} />
          <InfoCard label="Active school" value={session.tenant?.name ?? '—'} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}