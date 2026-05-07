import React from 'react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';
import { CreditNoteList } from '../../../modules/finance/pages/CreditNoteList';
import { Head } from '@inertiajs/react';

export default function Index() {
  return (
    <AuthenticatedLayout title="Finance > Credit Notes">
      <Head title="Credit Notes" />
      <CreditNoteList />
    </AuthenticatedLayout>
  );
}
