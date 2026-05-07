import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';

export default function Show() {
  const { props } = usePage<{ tenant?: { id: number; name: string; slug: string; domain?: string } }>();

  return (
    <AuthenticatedLayout title="Tenant Details">
      <Head title="Tenant Details" />
      <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">{props.tenant?.name ?? 'Tenant'}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{props.tenant?.domain ?? props.tenant?.slug ?? 'Mock tenant context'}</p>
      </div>
    </AuthenticatedLayout>
  );
}