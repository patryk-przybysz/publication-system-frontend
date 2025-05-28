import { Link } from '@/components/ui/link'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        replace
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  )
}
