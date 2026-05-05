import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { RotateCcw } from 'lucide-react'
import { ErrorFallback } from './error-fallback'

export function RootErrorBoundary({ reset }: ErrorComponentProps) {
  return (
    <ErrorFallback
      title="Application Error"
      description="Something unexpected happened. You can try again or go back to the articles page."
      fullPage
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={reset} type="button" variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        <Link
          to="/app/articles"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go to Articles
        </Link>
      </div>
    </ErrorFallback>
  )
}
