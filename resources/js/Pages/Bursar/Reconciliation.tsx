import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../app/layouts/AuthenticatedLayout';

const rows = [
  { ref: 'RC-001', status: 'Matched', amount: '₦0.00' },
  { ref: 'RC-002', status: 'Pending', amount: '₦0.00' },
  { ref: 'RC-003', status: 'Matched', amount: '₦0.00' },
];

export default function Reconciliation() {
  return (
    <AuthenticatedLayout title="Reconciliation">
      <Head title="Reconciliation" />
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Reconciliation</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">FIFO-ready payment matching and audit visibility.</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-950/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Reference</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.ref}>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{row.ref}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}