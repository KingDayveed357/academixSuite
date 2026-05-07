import PageMeta from '../../components/common/PageMeta';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <PageMeta title="Register Your School - AcademixSuite" description="Create your school workspace, owner account, and onboarding flow in one pass." />
      <AuthLayout variant="register">
        <RegisterForm />
      </AuthLayout>
    </>
  );
}