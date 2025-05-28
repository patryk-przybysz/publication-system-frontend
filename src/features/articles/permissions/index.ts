import type { User } from '@/types/api'
import { canPerformAction } from '@/utils/permissions'

export const canCreateArticle = (user: User | null) =>
  canPerformAction(user, {
    requiredRoles: ['EDITOR'],
  })
