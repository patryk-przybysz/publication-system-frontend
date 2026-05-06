import { createUser } from '@/testing/data-generators'
import { describe, expect, it } from 'vitest'
import { canPerformAction, hasRole } from '../permissions'

describe('hasRole', () => {
  it('returns false when there is no user', () => {
    expect(hasRole(null, ['USER'])).toBe(false)
  })

  it('returns true when the user has one of the allowed roles', () => {
    const user = createUser({ role: 'EDITOR' })

    expect(hasRole(user, ['USER', 'EDITOR'])).toBe(true)
  })

  it('returns false when none of the allowed roles match', () => {
    const user = createUser({ role: 'USER' })

    expect(hasRole(user, ['EDITOR', 'ADMIN'])).toBe(false)
  })
})

describe('canPerformAction', () => {
  it('returns false when there is no user', () => {
    expect(
      canPerformAction(null, {
        requiredRoles: ['USER'],
      }),
    ).toBe(false)
  })

  it('allows users with a required role', () => {
    const editor = createUser({ role: 'EDITOR' })

    expect(
      canPerformAction(editor, {
        requiredRoles: ['EDITOR'],
      }),
    ).toBe(true)
  })

  it('allows the owner even when they do not have the required role', () => {
    const owner = createUser({ username: 'alice', role: 'USER' })

    expect(
      canPerformAction(owner, {
        requiredRoles: ['ADMIN'],
        allowOwner: true,
        targetUsername: 'alice',
      }),
    ).toBe(true)
  })

  it('rejects ownership checks when the target username is missing', () => {
    const owner = createUser({ username: 'alice', role: 'USER' })

    expect(
      canPerformAction(owner, {
        allowOwner: true,
      }),
    ).toBe(false)
  })

  it('returns false when neither role nor ownership matches', () => {
    const user = createUser({ username: 'bob', role: 'USER' })

    expect(
      canPerformAction(user, {
        requiredRoles: ['ADMIN'],
        allowOwner: true,
        targetUsername: 'alice',
      }),
    ).toBe(false)
  })
})
