import type { User } from '@/types/api'

type UserRole = 'USER' | 'EDITOR' | 'ADMIN'

export function hasRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.includes(user.role as UserRole)
}

export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  return hasRole(user, roles)
}

export function hasAllRoles(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.every((role) => user.role === role)
}

export function isOwnerOrHasRole(
  user: User | null,
  targetUsername: string | undefined,
  roles: UserRole[],
): boolean {
  if (!user) return false

  // Check if user has required role
  if (hasRole(user, roles)) return true

  // Check if user is the owner
  return user.username === targetUsername
}

export function canPerformAction(
  user: User | null,
  options: {
    requiredRoles?: UserRole[]
    allowOwner?: boolean
    targetUsername?: string
  },
): boolean {
  const { requiredRoles = [], allowOwner = false, targetUsername } = options

  if (!user) return false

  // Check role-based permissions
  if (requiredRoles.length > 0 && hasRole(user, requiredRoles)) {
    return true
  }

  // Check ownership permissions
  if (allowOwner && targetUsername && user.username === targetUsername) {
    return true
  }

  return false
}
