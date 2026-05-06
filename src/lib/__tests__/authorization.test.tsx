import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Authorization } from '@/lib/authorization'
import { createUser } from '@/testing/data-generators'
import { renderWithAuthContext } from '@/testing/test-utils'

const editorUser = createUser({
  username: 'editor',
  role: 'EDITOR',
})

const regularUser = createUser({
  username: 'alice',
  role: 'USER',
})

describe('Authorization', () => {
  it('renders the loading state while the auth context is loading', () => {
    renderWithAuthContext(
      <Authorization requireAuth loading={<div>Loading auth</div>}>
        <div>Protected content</div>
      </Authorization>,
      { isLoading: true },
    )

    expect(screen.getByText('Loading auth')).toBeDefined()
    expect(screen.queryByText('Protected content')).toBeNull()
  })

  it('requires an authenticated user when requireAuth is enabled', () => {
    renderWithAuthContext(
      <Authorization requireAuth fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    expect(screen.getByText('Protected content')).toBeDefined()
    expect(screen.queryByText('Denied')).toBeNull()
  })

  it('renders the fallback when authentication is required but no user exists', () => {
    renderWithAuthContext(
      <Authorization requireAuth fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
    )

    expect(screen.getByText('Denied')).toBeDefined()
    expect(screen.queryByText('Protected content')).toBeNull()
  })

  it('checks allowed roles through the auth context', () => {
    renderWithAuthContext(
      <Authorization allowedRoles="EDITOR" fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: editorUser },
    )

    expect(screen.getByText('Protected content')).toBeDefined()
    expect(screen.queryByText('Denied')).toBeNull()
  })

  it('checks named policies through the auth context', () => {
    renderWithAuthContext(
      <Authorization policy="article:create" fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: editorUser },
    )

    expect(screen.getByText('Protected content')).toBeDefined()
    expect(screen.queryByText('Denied')).toBeNull()
  })

  it('evaluates custom policies against the auth context user', () => {
    renderWithAuthContext(
      <Authorization
        customPolicy={(user) => user?.username === 'alice'}
        fallback={<div>Denied</div>}
      >
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    expect(screen.getByText('Protected content')).toBeDefined()
    expect(screen.queryByText('Denied')).toBeNull()
  })

  it('checks permission-based access through the auth context', () => {
    renderWithAuthContext(
      <Authorization
        permissions={{ allowOwner: true, targetUsername: 'alice' }}
        fallback={<div>Denied</div>}
      >
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    expect(screen.getByText('Protected content')).toBeDefined()
    expect(screen.queryByText('Denied')).toBeNull()
  })
})
