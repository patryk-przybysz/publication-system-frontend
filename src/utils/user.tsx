import type { Role, SubscriptionLevel } from '@/types/api'
import {
  Crown,
  Edit,
  Eye,
  Globe,
  Plus,
  Settings,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export interface RoleDetails {
  color: BadgeVariant
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  permissions: Array<{
    icon: ComponentType<{ className?: string }>
    text: string
  }>
  capabilities: string[]
}

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

export function getSubscriptionColor(
  subscription: SubscriptionLevel,
): BadgeVariant {
  return subscription === 'PREMIUM' ? 'default' : 'outline'
}

export function getVerifiedColor(verified: boolean): BadgeVariant {
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

export function getRoleDetails(role: Role | string | null): RoleDetails {
  switch (role) {
    case 'ADMIN':
      return {
        color: 'destructive',
        icon: Shield,
        title: 'Administrator',
        description: 'Full system access with administrative privileges',
        permissions: [
          { icon: Eye, text: 'View all articles and content' },
          { icon: Edit, text: 'Edit any article or content' },
          { icon: Trash2, text: 'Delete any article or content' },
          { icon: Plus, text: 'Create new articles' },
          { icon: Users, text: 'Manage users and permissions' },
          { icon: Settings, text: 'Access system administration' },
        ],
        capabilities: [
          'Complete platform oversight and control',
          'User management and role assignment',
          'System configuration and settings',
          'Content moderation and quality control',
          'Full access to all features and data',
        ],
      }
    case 'EDITOR':
      return {
        color: 'default',
        icon: Edit,
        title: 'Editor',
        description: 'Content creation and management privileges',
        permissions: [
          { icon: Eye, text: 'View all articles' },
          { icon: Edit, text: 'Edit any article' },
          { icon: Plus, text: 'Create new articles' },
          { icon: Trash2, text: 'Delete own articles' },
        ],
        capabilities: [
          'Create and publish new articles',
          'Edit and improve existing content',
          'Review and moderate article submissions',
          'Access content management tools',
          'Collaborate with other editors and authors',
        ],
      }
    case 'USER':
      return {
        color: 'secondary',
        icon: UserCheck,
        title: 'User',
        description: 'Basic platform access with content viewing',
        permissions: [
          { icon: Eye, text: 'View own articles' },
          { icon: Edit, text: 'Edit own articles' },
          { icon: Trash2, text: 'Delete own articles' },
        ],
        capabilities: [
          'View and manage personal articles',
          'Edit personal content and profile',
          'Access age-appropriate content only',
          'Comment on accessible articles',
          'Basic platform interaction',
        ],
      }
    default:
      return {
        color: 'outline',
        icon: Globe,
        title: 'Guest',
        description: 'Anonymous visitor with limited access',
        permissions: [
          { icon: Eye, text: 'Browse public content' },
          { icon: Globe, text: 'View platform overview' },
        ],
        capabilities: [
          'View publicly available information',
          'Access platform documentation',
          'Browse content overview',
          'Learn about platform features',
        ],
      }
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
