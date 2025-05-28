import { Spinner } from '@/components/ui/spinner'
import type { ReactNode } from 'react'

type WithLoadingProps = {
  isLoading: boolean
  children: ReactNode
  loadingComponent?: ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function WithLoading({
  isLoading,
  children,
  loadingComponent,
  size = 'large',
  className = '',
}: WithLoadingProps) {
  if (isLoading) {
    return (
      <div className={`flex justify-center py-8 ${className}`}>
        {loadingComponent || <Spinner size={size} />}
      </div>
    )
  }

  return <>{children}</>
}
