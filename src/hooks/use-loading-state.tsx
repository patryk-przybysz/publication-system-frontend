import { Spinner } from '@/components/ui/spinner'
import { WithLoading } from '@/components/ui/with-loading'
import type React from 'react'

type Size = NonNullable<React.ComponentProps<typeof Spinner>['size']>

export function useLoadingState(isLoading: boolean, size: Size = 'large') {
  const LoadingComponent = ({ className = '' }: { className?: string }) => (
    <div className={`flex justify-center py-8 ${className}`}>
      <Spinner size={size} />
    </div>
  )

  return {
    isLoading,
    LoadingComponent,
    renderWithLoading: (children: React.ReactNode, className?: string) => (
      <WithLoading isLoading={isLoading} size={size} className={className}>
        {children}
      </WithLoading>
    ),
  }
}
