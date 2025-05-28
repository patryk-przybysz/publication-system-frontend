import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccounts } from '@/features/accounts/api/get-accounts'
import { useAccountsDetails } from '@/features/accounts/api/get-accounts-details'
import type { AccountPublicDetails, AccountSummary } from '@/types/api'
import { matchQueryStatus } from '@/utils/match-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { AlertCircle, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { AccountDetailsCard } from './account-details-card'

type AccountType = AccountPublicDetails | AccountSummary

type AccountsListProps<T extends AccountType> = {
  query: UseQueryResult<T[]>
  renderCard: (account: T) => ReactNode
}

function AccountsList<T extends AccountType>({
  query,
  renderCard,
}: AccountsListProps<T>) {
  return matchQueryStatus(query, {
    success: (accounts) => (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => renderCard(account))}
        </div>
      </div>
    ),
    error: () => <ErrorState />,
    empty: () => <EmptyState />,
  })
}

function SimpleAccountCard({ account }: { account: AccountSummary }) {
  return (
    <Card key={account.username} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="truncate">{account.username}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export function BasicAccountsList() {
  const accountsQuery = useAccounts()

  return (
    <AccountsList
      query={accountsQuery}
      renderCard={(account) => <SimpleAccountCard account={account} />}
    />
  )
}

export function DetailedAccountsList() {
  const accountsDetailsQuery = useAccountsDetails()

  return (
    <AccountsList
      query={accountsDetailsQuery}
      renderCard={(account) => <AccountDetailsCard account={account} />}
    />
  )
}

// Reusable error and empty state components
function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Failed to load accounts</h3>
          <p className="text-muted-foreground max-w-md">
            There was an error loading the user directory. Please try again
            later.
          </p>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No accounts found</h3>
          <p className="text-muted-foreground max-w-md">
            There are no registered accounts
          </p>
        </div>
      </div>
    </div>
  )
}
