import { formatCurrency } from '@/lib/formatters'

export function FIFOAllocationTimeline({ items }: { items: Array<{ feeName: string; term: string; amountApplied: number; balance: number }> }) {
  return <div className="space-y-3">{items.map((item, i) => <div key={`${item.feeName}-${i}`} className="flex gap-3"><div className="flex w-4 flex-col items-center"><span className="h-4 w-4 rounded-full border-2 border-accent bg-white" />{i < items.length - 1 ? <span className="mt-1 h-full border-l border-border" /> : null}</div><div className="flex-1"><p className="text-sm font-medium text-text-primary">{item.feeName} ({item.term})</p><p className="font-mono text-sm text-accent">{formatCurrency(item.amountApplied)} applied</p><p className="text-xs text-text-secondary">{formatCurrency(item.balance)} remaining</p></div></div>)}</div>
}
