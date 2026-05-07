import { createUser } from '@/testing/data-generators'
import { describe, expect, it } from 'vitest'

import { canCreateComment, canDeleteComment } from '../index'

describe('canCreateComment', () => {
  it('allows regular users to create comments', () => {
    const user = createUser({ role: 'USER' })

    expect(canCreateComment(user)).toBe(true)
  })

  it('rejects editors from creating comments', () => {
    const editor = createUser({ role: 'EDITOR' })

    expect(canCreateComment(editor)).toBe(false)
  })
})

describe('canDeleteComment', () => {
  it('allows admins to delete comments', () => {
    const admin = createUser({ role: 'ADMIN' })

    expect(canDeleteComment(admin)).toBe(true)
  })

  it('rejects regular users from deleting comments', () => {
    const user = createUser({ role: 'USER' })

    expect(canDeleteComment(user)).toBe(false)
  })
})
