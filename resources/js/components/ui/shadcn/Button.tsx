import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn('h-9 rounded-sm bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover', className)} {...props} /> }
