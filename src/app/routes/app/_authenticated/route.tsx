import { UnauthorizedError } from '@/components/errors/unauthorized'
import { Spinner } from '@/components/ui/spinner'
import { getUserQueryOptions, useUser } from '@/lib/auth'
import { matchQueryStatus } from '@/utils/match-query'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_authenticated')({
  component: AuthenticatedLayout,
  loader: async ({ context }) =>
    context.queryClient.prefetchQuery(getUserQueryOptions()),
})

function AuthenticatedLayout() {
  const userQuery = useUser()

  return matchQueryStatus(
    userQuery,
    {
      loading: () => <Spinner size="large" />,
      empty: () => <UnauthorizedError />,
      success: () => <Outlet />,
    },
    {
      isEmpty: (data) => data === null,
    },
  )
}
