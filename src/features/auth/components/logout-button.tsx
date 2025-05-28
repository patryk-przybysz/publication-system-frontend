import { Button } from '@/components/ui/button'
import { useLogout } from '@/lib/auth'
import type { ComponentProps, ReactNode } from 'react'

interface LogoutButtonProps {
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
  className?: string
  children?: ReactNode
  onLogoutStart?: () => void
  onLogoutSuccess?: () => void
  onLogoutError?: (error: Error) => void
  disabled?: boolean
  showIcon?: boolean
}

export function LogoutButton({
  variant = 'outline',
  size,
  className = 'w-full justify-start gap-2 bg-background hover:text-destructive-foreground',
  children,
  onLogoutStart,
  onLogoutSuccess,
  onLogoutError,
  disabled,
  showIcon = true,
  ...props
}: LogoutButtonProps) {
  const logoutMutation = useLogout({
    onSuccess: onLogoutSuccess,
    onError: onLogoutError,
  })

  const handleLogout = () => {
    onLogoutStart?.()
    logoutMutation.mutate()
  }

  const defaultChildren = <>{showIcon && '🔒'} Logout</>

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={disabled || logoutMutation.isPending}
      {...props}
    >
      {children || defaultChildren}
    </Button>
  )
}
