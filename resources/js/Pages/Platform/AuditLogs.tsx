import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

export default function AuditLogs() {
  return (
    <AuthenticatedLayout title="Platform Audit Logs">
      <Head title="Platform Audit Logs" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Platform audit logs</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Super admin visibility into tenant and billing actions.</p>
      </div>
    </AuthenticatedLayout>
  );
}