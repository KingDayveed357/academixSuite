import PageMeta from '../../components/common/PageMeta';
import AuthLayout from '../../components/auth/AuthLayout';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

type ResetPasswordPageProps = {
  email: string;
  token: string;
};

export default function ResetPasswordPage({ email, token }: ResetPasswordPageProps) {
  return (
    <>
      <PageMeta title="Reset Password - AcademixSuite" description="Set a new password and regain access to your school workspace." />
      <AuthLayout variant="reset-password">
        <ResetPasswordForm email={email} token={token} />
      </AuthLayout>
    </>
  );
}