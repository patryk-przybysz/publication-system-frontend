import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/authorization'
import {
  getRoleDetails,
  getSubscriptionColor,
  getVerifiedColor,
} from '@/utils/user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: AppRoute,
})

function AppRoute() {
  const { user } = useAuth()

  const roleDetails = getRoleDetails(user?.role || null)
  const IconComponent = roleDetails.icon

  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {user ? `Welcome, ${user.username}` : 'Welcome to the Platform'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={roleDetails.color}>{roleDetails.title}</Badge>
              {user && (
                <>
                  <Badge variant={getVerifiedColor(user.verified)}>
                    {user.verified ? '✓ Verified' : '⚠ Unverified'}
                  </Badge>
                  <Badge variant={getSubscriptionColor(user.subscriptionLevel)}>
                    {user.subscriptionLevel}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Role Description */}
        <p className="text-muted-foreground">{roleDetails.description}</p>

        <Separator />

        {/* Permissions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Your Permissions</h2>
          <ul className="space-y-2">
            {roleDetails.permissions.map((permission) => {
              const PermissionIcon = permission.icon
              return (
                <li key={permission.text} className="flex items-center gap-2">
                  <PermissionIcon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{permission.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Capabilities */}
        <div>
          <h2 className="text-lg font-semibold mb-3">What You Can Do</h2>
          <ul className="space-y-1">
            {roleDetails.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                <span className="text-sm text-muted-foreground">
                  {capability}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
