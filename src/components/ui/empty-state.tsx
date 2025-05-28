import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
    component?: ReactNode
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
        {action && (
          <div>
            {action.component || (
              <Button
                variant="outline"
                onClick={action.onClick}
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>{action.label}</a>
                ) : (
                  action.label
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
