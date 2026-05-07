import React from 'react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';
import { PaymentList } from '../../../modules/finance/pages/PaymentList';
import { Head } from '@inertiajs/react';

export default function Index() {
  return (
    <AuthenticatedLayout title="Finance > Payment Ledger">
      <Head title="Payment Ledger" />
      <PaymentList />
    </AuthenticatedLayout>
  );
}
