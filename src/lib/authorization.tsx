import { canEditAccount } from '@/features/accounts/permissions'
import { canCreateArticle } from '@/features/articles/permissions'
import { canCreateComment } from '@/features/comments/permissions'
import type { User } from '@/types/api'
import { canPerformAction, hasRole } from '@/utils/permissions'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { useUser } from './auth'

type PolicyFunction = (user: User | null, ...args: never[]) => boolean

export const POLICIES = {
  'article:create': canCreateArticle,
  'comment:create': canCreateComment,
  'account:update': canEditAccount,
} as const

type PolicyKey = keyof typeof POLICIES
type Role = User['role']

export type AuthorizationContext = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  hasRole: (roles: Role[]) => boolean
  canPerform: (action: PolicyKey, ...args: never[]) => boolean
  canPerformCustom: (action: PolicyFunction, ...args: never[]) => boolean
}

const AuthorizationContext = createContext<AuthorizationContext | null>(null)

export function useAuth() {
  const context = useContext(AuthorizationContext)
  if (!context) {
    throw new Error(
      'useAuthorization must be used within an AuthorizationProvider',
    )
  }
  return context
}

export function AuthorizationProvider({ children }: { children: ReactNode }) {
  const userQuery = useUser()
  const user = userQuery.data || null

  const contextValue: AuthorizationContext = {
    user,
    isLoading: userQuery.isLoading,
    isAuthenticated: !!user,
    hasRole: (roles: Role[]) => hasRole(user, roles),
    canPerform: (action: PolicyKey) => {
      const policyFn = POLICIES[action]
      return policyFn ? policyFn(user) : false
    },
    canPerformCustom: (action: PolicyFunction) => action(user),
  }

  return (
    <AuthorizationContext value={contextValue}>{children}</AuthorizationContext>
  )
}

type AuthorizationProps = {
  children: ReactNode
  fallback?: ReactNode
  loading?: ReactNode
} & (
  | {
      // Role-based authorization
      allowedRoles: Role | Role[]
      policy?: never
      customPolicy?: never
      requireAuth?: never
      permissions?: never
    }
  | {
      // Policy-based authorization
      allowedRoles?: never
      policy: PolicyKey
      customPolicy?: never
      requireAuth?: never
      permissions?: never
    }
  | {
      // Custom function
      allowedRoles?: never
      policy?: never
      customPolicy: PolicyFunction
      requireAuth?: never
      permissions?: never
    }
  | {
      // Just require authentication
      allowedRoles?: never
      policy?: never
      customPolicy?: never
      requireAuth: true
      permissions?: never
    }
  | {
      // Permission check using canPerformAction utility
      allowedRoles?: never
      policy?: never
      customPolicy?: never
      requireAuth?: never
      permissions: {
        requiredRoles?: Role[]
        allowOwner?: boolean
        targetUsername?: string
      }
    }
)

export function Authorization({
  children,
  fallback = null,
  loading = null,
  ...authProps
}: AuthorizationProps) {
  const userQuery = useUser()

  if (userQuery.isLoading) {
    return <>{loading}</>
  }

  const user = userQuery.data || null

  if (authProps?.requireAuth) {
    return user ? <>{children}</> : <>{fallback}</>
  }

  if (authProps?.allowedRoles) {
    const roles = Array.isArray(authProps.allowedRoles)
      ? authProps.allowedRoles
      : [authProps.allowedRoles]

    return hasRole(user, roles) ? <>{children}</> : <>{fallback}</>
  }

  if (authProps?.policy) {
    const policyFn = POLICIES[authProps.policy]
    const isAuthorized = policyFn ? policyFn(user) : false
    return isAuthorized ? <>{children}</> : <>{fallback}</>
  }

  if (authProps?.customPolicy) {
    const isAuthorized = authProps.customPolicy(user)
    return isAuthorized ? <>{children}</> : <>{fallback}</>
  }

  if (authProps?.permissions) {
    const isAuthorized = canPerformAction(user, authProps.permissions)
    return isAuthorized ? <>{children}</> : <>{fallback}</>
  }

  return <>{children}</>
}

// Convenience hooks for common authorization patterns

// Hook that guarantees user is not null (throws if null)
export function useAuthenticatedUser(): { user: User; isLoading: boolean } {
  const { user, isLoading } = useAuth()

  if (!isLoading && !user) {
    throw new Error(
      'User is not authenticated',
    )
  }

  return { user: user as User, isLoading }
}

export function useHasRole(roles: Role | Role[]) {
  const { hasRole } = useAuth()
  const roleArray = Array.isArray(roles) ? roles : [roles]
  return hasRole(roleArray)
}

export function useCanPerform(action: PolicyKey) {
  const { canPerform } = useAuth()
  return canPerform(action)
}

export function useCanPerformCustom(action: PolicyFunction) {
  const { canPerformCustom } = useAuth()
  return canPerformCustom(action)
}

// Specialized hooks for common permission checks
export function useCanEditAccount(username?: string) {
  const { user } = useAuth()
  return canEditAccount(user, username)
}

export function useCanCreateArticle() {
  const { user } = useAuth()
  return canCreateArticle(user)
}

export function useCanCreateComment() {
  const { user } = useAuth()
  return canCreateComment(user)
}
