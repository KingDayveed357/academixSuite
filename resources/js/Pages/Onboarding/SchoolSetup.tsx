import { Head } from '@inertiajs/react'
import { PublicLayout } from '@/components/layout/AppShell'
import { Input } from '@/components/ui/shadcn/Input'
import { Button } from '@/components/ui/shadcn/Button'
import { useState } from 'react'

export default function SchoolSetup() {
  const [session, setSession] = useState('2026/2027')
  const [term, setTerm] = useState('First Term')
  return <PublicLayout><Head title="School Setup" /><div className="mx-auto max-w-[720px] rounded-lg bg-white p-8 shadow-card"><h1 className="text-2xl font-semibold text-text-primary">School setup</h1><div className="mt-4 space-y-4"><div><label className="mb-1 block text-[13px] font-medium text-text-primary">Academic Session</label><Input value={session} onChange={e => setSession(e.target.value)} /></div><div><label className="mb-1 block text-[13px] font-medium text-text-primary">Current Term</label><Input value={term} onChange={e => setTerm(e.target.value)} /></div></div><div className="mt-6 flex justify-end"><Button onClick={() => { window.location.href = '/onboarding/complete' }}>Save and continue</Button></div></div></PublicLayout>
}
