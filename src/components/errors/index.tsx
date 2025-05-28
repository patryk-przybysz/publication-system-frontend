import { AlertCircle } from 'lucide-react'
import type React from 'react'

export type ErrorComponentProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
  description?: string
}

export function ErrorComponent({
  children,
  icon = <AlertCircle className="h-8 w-8 text-destructive" />,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
}: ErrorComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-destructive">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
