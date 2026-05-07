import { Link, usePage } from '@inertiajs/react'
import { useAuth } from '@/hooks/useAuth'
import { useTenant } from '@/hooks/useTenant'
import type { UserRole } from '@/types/auth'
import { cn } from '@/lib/utils'

const navMap: Record<UserRole, Array<{ label: string; href: string }>> = {
  SUPER_ADMIN: [{ label: 'Platform', href: '/platform' }, { label: 'Schools', href: '/platform/tenants' }, { label: 'Audit Logs', href: '/platform/audit-logs' }, { label: 'Account', href: '/account' }],
  SCHOOL_OWNER: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Staff', href: '/staff' }, { label: 'Settings', href: '/settings' }, { label: 'Billing', href: '/billing' }, { label: 'Account', href: '/account' }],
  SCHOOL_ADMIN: [{ label: 'Dashboard', href: '/admin' }, { label: 'Students', href: '/students' }, { label: 'Classes', href: '/classes' }, { label: 'Fees', href: '/fees' }, { label: 'Audit Logs', href: '/audit-logs' }, { label: 'Account', href: '/account' }],
  BURSAR: [{ label: 'Finance', href: '/finance' }, { label: 'Payments', href: '/finance/payments' }, { label: 'Credit Notes', href: '/finance/credit-notes' }, { label: 'Reconciliation', href: '/finance/reconciliation' }, { label: 'Audit Logs', href: '/audit-logs' }, { label: 'Account', href: '/account' }],
}

export function PageHeader({ title, breadcrumb, actions }: { title: string; breadcrumb: string[]; actions?: React.ReactNode }) {
  return <header className="sticky top-0 z-10 h-14 border-b border-[#E5E7EB] bg-white"><div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 md:px-6"><div><p className="hidden text-[13px] text-[#6B7280] md:block">{breadcrumb.join(' / ')}</p><h1 className="text-md font-semibold text-[#111827] md:text-xl">{title}</h1></div><div>{actions}</div></div></header>
}

export function PublicLayout({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#F7F8FA] p-6"><div className="mx-auto w-full max-w-[1200px]">{children}</div></main> }

export function AppShell({ children }: { children: React.ReactNode }) {
  const { url } = usePage(); const { user } = useAuth(); const { school } = useTenant(); const links = navMap[user.role]
  return <div className="flex h-screen overflow-hidden bg-page"><aside className="fixed hidden h-screen w-60 bg-[#111318] md:block"><div className="h-14 border-b border-[#1F2937] px-3 py-2"><p className="text-sm font-semibold text-white">AcademixSuite</p><p className="truncate text-xs text-[#9CA3AF]">{school.name}</p></div><div className="py-2">{links.map(l => <Link key={l.href} href={l.href} className={cn('mx-2 mb-1 flex h-9 items-center rounded-md px-3 text-sm', url === l.href || url.startsWith(`${l.href}/`) ? 'border-l-[3px] border-[#2563EB] bg-[#1F2430] pl-[9px] text-white' : 'text-[#9CA3AF] hover:bg-[#1A1F2A]')}>{l.label}</Link>)}</div></aside><div className="flex min-w-0 flex-1 flex-col overflow-hidden md:ml-60">{user.role === 'SUPER_ADMIN' ? <div className="bg-danger py-2 text-center text-sm text-white">Viewing as: Greenfield Academy</div> : null}<main className="flex-1 overflow-y-auto">{children}</main></div></div>
}
