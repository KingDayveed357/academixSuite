import { usePage } from '@inertiajs/react';
import PageMeta from '../../components/common/PageMeta';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

type LoginPageProps = {
  status?: string;
};

import { PageProps } from '../../types/inertia';

export default function LoginPage({ status }: LoginPageProps) {
  const { props } = usePage<PageProps>();
  const schoolName = props.tenant?.name ?? 'AcademixSuite';

  return (
    <>
      <PageMeta 
        title={`Sign In - ${schoolName}`} 
        description={props.tenant ? `Access ${schoolName} dashboard.` : "Access your school workspace with your email address."} 
      />
      <AuthLayout variant="login">
        <LoginForm key={props.tenant?.name ?? 'login'} />
      </AuthLayout>
    </>
  );
}