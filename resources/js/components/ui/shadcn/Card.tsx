import { cn } from '@/lib/utils'
export function Card({ className, children }: { className?: string; children: React.ReactNode }) { return <section className={cn('rounded-md border border-border bg-surface shadow-card', className)}>{children}</section> }
