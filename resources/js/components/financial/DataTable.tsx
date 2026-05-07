import { useMemo, useState } from 'react'
import { SkeletonTable } from '@/components/shared/SkeletonTable'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/financial/StatusBadge'
import { cn } from '@/lib/utils'

interface Column<T> { key: keyof T | string; label: string; sortable?: boolean; align?: 'left' | 'right' | 'center'; render?: (value: unknown, row: T) => React.ReactNode }
interface DataTableProps<T> { columns: Column<T>[]; data: T[]; isLoading?: boolean; emptyState?: React.ReactNode; density?: 'compact' | 'standard'; pageSize?: number }

export function DataTable<T extends Record<string, unknown>>({ columns, data, isLoading = false, emptyState, density = 'standard', pageSize = 10 }: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const total = data.length
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const rows = useMemo(() => data.slice(start, end), [data, start, end])
  if (isLoading) return <SkeletonTable />
  if (!rows.length) return <>{emptyState ?? <EmptyState title="No records available" description="Update filters or add records to continue." />}</>
  return <div className="overflow-hidden rounded-md border border-border bg-surface"><div className="hidden overflow-x-auto md:block"><table className="w-full"><thead><tr>{columns.map(c => <th key={String(c.key)} className={cn('border-b border-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary', c.align === 'right' && 'text-right', c.align === 'center' && 'text-center')}>{c.label}</th>)}</tr></thead><tbody>{rows.map((r,i) => <tr key={i} className={cn('group border-b border-border hover:bg-[#F9FAFB]', density === 'compact' ? 'h-12' : 'h-14')}>{columns.map(c => { const raw = r[c.key as keyof T]; const content = c.render ? c.render(raw, r) : c.key === 'status' ? <StatusBadge status={String(raw) as any} /> : String(raw ?? ''); return <td key={String(c.key)} className={cn('px-4 py-3 text-sm text-text-primary', c.align === 'right' && 'text-right font-mono tabular-nums', c.align === 'center' && 'text-center')}>{content}</td>})}</tr>)}</tbody></table></div><div className="space-y-3 p-3 md:hidden">{rows.map((r,i) => <article key={i} className="rounded-md border border-border bg-surface p-3">{columns.map(c => <div key={String(c.key)} className="flex items-center justify-between py-1"><span className="text-xs text-text-secondary">{c.label}</span><span className="text-sm text-text-primary">{c.key === 'status' ? <StatusBadge status={String(r[c.key as keyof T]) as any} /> : String(r[c.key as keyof T] ?? '')}</span></div>)}</article>)}</div><div className="flex items-center justify-between border-t border-border px-4 py-3 text-[13px] text-text-secondary"><span>Showing {start + 1}-{end} of {total} records</span><div className="flex gap-2"><button className="h-8 rounded-sm border border-border px-3" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button><button className="h-8 rounded-sm border border-border px-3" onClick={() => setPage(p => (end < total ? p + 1 : p))}>Next</button></div></div></div>
}
