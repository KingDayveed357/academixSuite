import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

const notifications = [
  { title: 'Fee reminder sent', detail: '3 students still owe the current term balance.' },
  { title: 'Payment confirmed', detail: 'A partial payment was allocated to outstanding invoices.' },
  { title: 'New staff invited', detail: 'An invitation was issued for a subject teacher.' },
];

export default function Notifications() {
  return (
    <AuthenticatedLayout title="Notifications">
      <Head title="Notifications" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifications</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mock alerts and operational updates.</p>
        </div>
        <div className="grid gap-4">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}