import React from 'react';
import AppLayout from '../../layouts/AppLayout';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthenticatedLayout({ children, title }: AuthenticatedLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
