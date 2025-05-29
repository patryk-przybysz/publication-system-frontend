import type { User } from '@/types/api'
import { canPerformAction } from '@/utils/permissions'

export const canCreateComment = (user: User | null) =>
  canPerformAction(user, {
    requiredRoles: ['USER'],
  })

export const canDeleteComment = (user: User | null) =>
  canPerformAction(user, {
    requiredRoles: ['ADMIN'],
  })
