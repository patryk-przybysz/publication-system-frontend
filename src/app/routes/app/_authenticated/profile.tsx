import { Badge } from '@/components/ui/badge'
import { UpdateBirthDateForm } from '@/features/accounts/components/update-birth-date-form'
import { useAuthenticatedUser } from '@/lib/authorization'
import { formatFullDate } from '@/utils/date'
import {
  formatMembershipDuration,
  getBadgeVariant,
  isAdult,
} from '@/utils/user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_authenticated/profile')({
  component: ProfileRoute,
})

function ProfileRoute() {
  const { user } = useAuthenticatedUser()
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Username
              </dt>
              <dd className="mt-1 text-lg font-medium">{user.username}</dd>
            </div>

            <UpdateBirthDateForm currentBirthDate={user.birth} />

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Account Age
              </dt>
              <dd className="mt-1 text-lg flex items-center gap-2">
                {isAdult(user.birth) ? (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    🔞 Adult
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                  >
                    👶 Minor
                  </Badge>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Subscription
              </dt>
              <dd className="mt-1">
                <Badge
                  variant={getBadgeVariant(
                    'subscription',
                    user.subscriptionLevel,
                  )}
                >
                  {user.subscriptionLevel === 'PREMIUM'
                    ? '⭐ Premium'
                    : '🆓 Free'}
                </Badge>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Member Since
              </dt>
              <dd className="mt-1 text-lg">{formatFullDate(user.createdAt)}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Membership Duration
              </dt>
              <dd className="mt-1 text-lg font-medium text-primary">
                {formatMembershipDuration(user.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 p-6 bg-muted/50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3">Account Status</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Verification:</span>
            <Badge
              variant={getBadgeVariant('verified', user.verified)}
              className="text-xs"
            >
              {user.verified ? 'Verified' : 'Pending'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Role:</span>
            <Badge
              variant={getBadgeVariant('role', user.role)}
              className="text-xs"
            >
              {user.role}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Plan:</span>
            <Badge
              variant={getBadgeVariant('subscription', user.subscriptionLevel)}
              className="text-xs"
            >
              {user.subscriptionLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Age Status:</span>
            <Badge
              variant={getBadgeVariant('age', isAdult(user.birth))}
              className="text-xs"
            >
              {isAdult(user.birth) ? 'Adult' : 'Minor'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
