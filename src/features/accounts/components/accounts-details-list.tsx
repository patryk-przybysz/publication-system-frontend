import { useAccountsDetails } from '@/features/accounts/api/get-accounts-details'
import { matchQueryStatus } from '@/utils/match-query'
import { AlertCircle, Users } from 'lucide-react'
import { AccountDetailsCard } from './account-details-card'

export function AccountsDetailsList() {
  const accountsDetailsQuery = useAccountsDetails()

  return matchQueryStatus(accountsDetailsQuery, {
    success: (accountsDetails) => (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accountsDetails.map((account) => (
            <AccountDetailsCard key={account.username} account={account} />
          ))}
        </div>
      </div>
    ),
  })
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            Failed to load account details
          </h3>
          <p className="text-muted-foreground max-w-md">
            There was an error loading the detailed account information. Please
            try again later.
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
            There are no registered accounts available at the moment.
          </p>
        </div>
      </div>
    </div>
  )
}
