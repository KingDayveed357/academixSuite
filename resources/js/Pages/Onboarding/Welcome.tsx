import { Head } from '@inertiajs/react'
import { PublicLayout } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/shadcn/Button'

export default function Welcome() {
  return <PublicLayout><Head title="Onboarding Welcome" /><div className="mx-auto max-w-[720px] rounded-lg bg-white p-8 shadow-card"><h1 className="text-2xl font-semibold text-text-primary">Welcome to AcademixSuite</h1><p className="mt-2 text-sm text-text-secondary">Set up your school workspace in three quick steps.</p><div className="mt-6 flex justify-end"><Button onClick={() => { window.location.href = '/onboarding/school-setup' }}>Continue</Button></div></div></PublicLayout>
}
