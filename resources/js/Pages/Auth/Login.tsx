import { usePage } from '@inertiajs/react';
import PageMeta from '../../components/common/PageMeta';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

type LoginPageProps = {
  status?: string;
};

type SharedProps = {
  tenant?: { name: string } | null;
};

export default function LoginPage({ status }: LoginPageProps) {
  const { props } = usePage<SharedProps>();

  return (
    <>
      <PageMeta title="Sign In - AcademixSuite" description="Access your school workspace with your Staff ID and password." />
      <AuthLayout variant="login">
        <LoginForm key={props.tenant?.name ?? 'login'} />
      </AuthLayout>
    </>
  );
}