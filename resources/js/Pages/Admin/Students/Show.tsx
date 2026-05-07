import React from 'react';
import AuthenticatedLayout from '../../../app/layouts/AuthenticatedLayout';
import { StudentProfile } from '../../../modules/students/pages/StudentProfile';
import { Head } from '@inertiajs/react';

export default function Show() {
  return (
    <AuthenticatedLayout title="Student Directory > Student Profile">
      <Head title="Student Profile" />
      <StudentProfile />
    </AuthenticatedLayout>
  );
}
