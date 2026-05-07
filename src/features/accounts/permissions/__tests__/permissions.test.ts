import { createUser } from '@/testing/data-generators'
import { describe, expect, it } from 'vitest'

import { canEditAccount } from '../index'

describe('canEditAccount', () => {
  it('allows an admin to edit any account', () => {
    const admin = createUser({ username: 'admin-user', role: 'ADMIN' })

    expect(canEditAccount(admin, 'alice')).toBe(true)
  })

  it('allows the account owner to edit their own account', () => {
    const owner = createUser({ username: 'alice', role: 'USER' })

    expect(canEditAccount(owner, 'alice')).toBe(true)
  })

  it('rejects unrelated users without the admin role', () => {
    const viewer = createUser({ username: 'bob', role: 'USER' })

    expect(canEditAccount(viewer, 'alice')).toBe(false)
  })
})
