import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

const logs = [
  'Staff member viewed payment history',
  'Bursar recorded a new receipt',
  'Owner updated school settings',
  'Tenant context switched',
];

export default function AuditLogs() {
  return (
    <AuthenticatedLayout title="Audit Logs">
      <Head title="Audit Logs" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Audit trail</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Shared activity log for the active school context.</p>
        </div>
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={log} className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm text-slate-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-black text-brand-600 dark:bg-brand-500/10">{index + 1}</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}