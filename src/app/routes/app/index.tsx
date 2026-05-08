import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  beforeLoad: () =>
    redirect({ to: '/app/articles', search: { page: 0, size: 10 } }),
})
