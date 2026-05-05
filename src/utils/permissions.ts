import type { User } from '@/types/api'

type UserRole = 'USER' | 'EDITOR' | 'ADMIN'

export function hasRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.includes(user.role as UserRole)
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
