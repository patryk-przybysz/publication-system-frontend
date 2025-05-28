import {
  type LinkComponentProps,
  Link as RouterLink,
} from '@tanstack/react-router'

import { cn } from '@/utils/cn'

export function Link({ children, className, ...props }: LinkComponentProps) {
  return (
    <RouterLink
      className={cn('text-slate-600 hover:text-slate-900', className)}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
