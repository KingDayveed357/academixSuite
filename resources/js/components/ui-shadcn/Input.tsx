import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn('h-10 w-full rounded-sm border border-border px-3 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent', className)} {...props} /> }
