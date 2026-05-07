import { Skeleton } from '@/components/ui/shadcn/Skeleton'
export function SkeletonTable(){ return <div>{Array.from({length:6}).map((_,i)=><div key={i} className="grid h-12 grid-cols-6 gap-3 border-b border-border px-4 py-3">{Array.from({length:6}).map((__,j)=><Skeleton key={j} className={j>3?'ml-auto h-4 w-24':'h-4 w-24'} />)}</div>)}</div> }
