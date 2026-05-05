import type { Role, SubscriptionLevel } from '@/types/api'
import { Crown, Shield, Users } from 'lucide-react'
import type { ComponentType } from 'react'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export function getRoleIcon(role: Role): ComponentType<{ className?: string }> {
  switch (role) {
    case 'ADMIN':
      return Shield
    case 'EDITOR':
      return Crown
    case 'USER':
      return Users
  }
}

export function getRoleColor(role: Role): BadgeVariant {
  switch (role) {
    case 'ADMIN':
      return 'destructive'
    case 'EDITOR':
      return 'default'
    case 'USER':
      return 'secondary'
  }
}

function getSubscriptionColor(subscription: SubscriptionLevel): BadgeVariant {
  return subscription === 'PREMIUM' ? 'default' : 'outline'
}

function getVerifiedColor(verified: boolean): BadgeVariant {
  return verified ? 'default' : 'secondary'
}

export function getBadgeVariant(
  type: 'verified' | 'role' | 'subscription' | 'age',
  value: string | boolean,
): BadgeVariant {
  switch (type) {
    case 'verified':
      return getVerifiedColor(value as boolean)
    case 'role':
      return getRoleColor(value as Role)
    case 'subscription':
      return getSubscriptionColor(value as SubscriptionLevel)
    case 'age':
      return value ? 'default' : 'secondary'
    default:
      return 'secondary'
  }
}

export function formatMembershipDuration(createdAt: string): string {
  const created = new Date(createdAt)
  const now = new Date()
  const diffInMonths = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30),
  )

  if (diffInMonths < 1) {
    const diffInDays = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
    )
    return diffInDays === 1 ? '1 day' : `${diffInDays} days`
  }

  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month' : `${diffInMonths} months`
  }

  const years = Math.floor(diffInMonths / 12)
  return years === 1 ? '1 year' : `${years} years`
}

export function isAdult(birthDate: string): boolean {
  const birth = new Date(birthDate)
  const now = new Date()
  const age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    return age - 1 >= 18
  }

  return age >= 18
}
