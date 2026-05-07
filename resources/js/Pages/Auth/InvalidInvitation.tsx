import { Link, usePage } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';

interface Props {
  message: string;
}

export default function InvalidInvitation() {
  const { message } = usePage<Props>().props;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
      <PageMeta title="Invalid Invitation | AcademixSuite" description="The invitation link is invalid or expired" />
      <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 rounded-full bg-error-50 p-4 text-error-600 dark:bg-error-500/10 dark:text-error-400">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Invitation unavailable</h1>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        <Link href="/login" className="mt-6 inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-black text-white transition hover:bg-brand-700">
          Back to login
        </Link>
      </div>
    </div>
  );
}