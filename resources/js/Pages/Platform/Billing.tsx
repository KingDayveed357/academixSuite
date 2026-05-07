import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

const plans = [
  { name: 'Starter', price: '₦0.00', seats: '1 tenant' },
  { name: 'Growth', price: '₦0.00', seats: 'Up to 5 tenants' },
  { name: 'Scale', price: '₦0.00', seats: 'Unlimited tenants' },
];

export default function Billing() {
  return (
    <AuthenticatedLayout title="Platform Billing">
      <Head title="Platform Billing" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Platform billing</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Subscription overview for the mock super admin workspace.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{plan.name}</p>
              <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{plan.price}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{plan.seats}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}