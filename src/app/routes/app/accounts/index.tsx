import { Button } from '@/components/ui/button'
import { WithLoading } from '@/components/ui/with-loading'
import { getAccountsQueryOptions } from '@/features/accounts/api/get-accounts'
import { getAccountsDetailsQueryOptions } from '@/features/accounts/api/get-accounts-details'
import { DetailedAccountsList, BasicAccountsList } from '@/features/accounts/components/accounts-list'
import { useAuth } from '@/lib/authorization'
import { createFileRoute } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

export const Route = createFileRoute('/app/accounts/')({
  component: AccountsRoute,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getAccountsQueryOptions())

    if (context.auth.isAuthenticated) {
      context.queryClient.prefetchQuery(getAccountsDetailsQueryOptions())
    }
  },
})

function AccountsRoute() {
  const { isLoading, isAuthenticated } = useAuth()

  return (
    <WithLoading isLoading={isLoading}>
      <div className="container py-8">
        <div className="space-y-8">
          <header className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold">Users</h1>
                <p className="text-muted-foreground">
                  {isAuthenticated
                    ? 'Detailed user information and statistics'
                    : 'Basic user directory - sign in for more details'}
                </p>
              </div>
            </div>

            {!isAuthenticated && (
              <Button
                variant="outline"
                disabled
                className="opacity-50 cursor-not-allowed"
                aria-label="Sign in required to view detailed user information"
              >
                <Lock className="h-4 w-4 mr-2" />
                Sign in for details
              </Button>
            )}
          </header>

          <main>
            {isAuthenticated ? (
              <section aria-label="Detailed user accounts">
                <DetailedAccountsList />
              </section>
            ) : (
              <section aria-label="Basic user directory">
                <BasicAccountsList />
              </section>
            )}
          </main>
        </div>
      </div>
    </WithLoading>
  )
}
