import { Link } from '@inertiajs/react';
import { CreditCard } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';

export default function OwnerBilling() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
      <PageMeta title="Billing | AcademixSuite" description="Manage billing and subscription" />
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <CreditCard className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Billing</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Subscription and payment management is now reachable.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
          No billing provider is connected yet. This route exists so the owner dashboard can navigate safely while the billing stack is completed.
        </div>

        <div className="mt-6">
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}