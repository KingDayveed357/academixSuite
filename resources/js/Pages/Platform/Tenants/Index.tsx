import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';
import { useTenant } from '../../../hooks/useTenant';

export default function Index() {
  const { tenants } = useTenant();

  return (
    <AuthenticatedLayout title="Tenants">
      <Head title="Tenants" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Tenants</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mock platform tenant directory.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tenants.map((tenant) => (
            <Link key={tenant.id} href={`/platform/tenants/${tenant.id}`} className="rounded-3xl border border-gray-200 bg-white p-5 transition hover:border-brand-500 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{tenant.name}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{tenant.domain ?? tenant.slug}</p>
            </Link>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}