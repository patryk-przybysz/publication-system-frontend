import type { User } from '@/types/api'

import { canPerformAction } from '@/utils/permissions'

export const canEditAccount = (user: User | null, username?: string) =>
  canPerformAction(user, {
    requiredRoles: ['ADMIN'],
    allowOwner: true,
    targetUsername: username,
  })
