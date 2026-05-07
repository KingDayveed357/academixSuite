import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

export default function Analytics() {
  return (
    <AuthenticatedLayout title="Analytics">
      <Head title="Analytics" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Analytics</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Owner analytics placeholder for the mock frontend rebuild.</p>
      </div>
    </AuthenticatedLayout>
  );
}