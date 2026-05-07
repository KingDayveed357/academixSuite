import { Head } from '@inertiajs/react'
import { PublicLayout } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/shadcn/Button'

export default function Complete() {
  return <PublicLayout><Head title="Onboarding Complete" /><div className="mx-auto max-w-[720px] rounded-lg bg-white p-8 shadow-card"><h1 className="text-2xl font-semibold text-text-primary">Setup complete</h1><p className="mt-2 text-sm text-text-secondary">Your tenant environment is ready for role-based dashboard access.</p><div className="mt-6 flex justify-end"><Button onClick={() => { window.location.href = '/select-tenant' }}>Go to tenant selection</Button></div></div></PublicLayout>
}
