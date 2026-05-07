import PageMeta from '../../components/common/PageMeta';
import AuthLayout from '../../components/auth/AuthLayout';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

type ForgotPasswordPageProps = {
  status?: string;
};

export default function ForgotPasswordPage({ status }: ForgotPasswordPageProps) {
  return (
    <>
      <PageMeta title="Forgot Password - AcademixSuite" description="Request a secure password reset link for your AcademixSuite account." />
      <AuthLayout variant="forgot-password">
        <ForgotPasswordForm status={status} />
      </AuthLayout>
    </>
  );
}