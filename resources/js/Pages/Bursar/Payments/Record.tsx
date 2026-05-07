import React from 'react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';
import { RecordPayment } from '../../../modules/finance/pages/RecordPayment';
import { Head } from '@inertiajs/react';

export default function Record() {
  return (
    <AuthenticatedLayout title="Finance > Record Payment">
      <Head title="Record Payment" />
      <RecordPayment />
    </AuthenticatedLayout>
  );
}
