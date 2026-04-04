import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/lib/auth'
import type { AccountPublicDetails } from '@/types/api'
import { getBadgeVariant, getRoleIcon } from '@/utils/user'
import { Verified } from 'lucide-react'
import { AdminBirthDateEditor } from './admin-birth-date-editor'

type AccountDetailsCardProps = {
  account: AccountPublicDetails
}

export function AccountDetailsCard({ account }: AccountDetailsCardProps) {
  const { data: currentUser } = useUser()
  const isAdmin = currentUser?.role === 'ADMIN'

  const RoleIcon = getRoleIcon(account.role)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <RoleIcon className="h-5 w-5 text-muted-foreground" />
          <span className="truncate">{account.username}</span>
          {account.verified && (
            <Verified
              className="h-4 w-4 text-blue-500 flex-shrink-0"
              fill="currentColor"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant={getBadgeVariant('role', account.role)}>
            {account.role}
          </Badge>
          <Badge
            variant={getBadgeVariant('subscription', account.subscriptionLevel)}
          >
            {account.subscriptionLevel === 'PREMIUM' ? '⭐ Premium' : '🆓 Free'}
          </Badge>
          <Badge variant={getBadgeVariant('age', account.adult)}>
            {account.adult ? '🔞 Adult' : '👶 Minor'}
          </Badge>
          <Badge
            variant={getBadgeVariant('verified', account.verified)}
            className="text-xs"
          >
            {account.verified ? 'Verified' : 'Pending'}
          </Badge>
        </div>

        {isAdmin && (
          <div className="pt-2 border-t">
            <AdminBirthDateEditor username={account.username} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
