import { Authorization } from '@/lib/authorization'
import { createUser } from '@/testing/data-generators'
import { renderWithAuthContext } from '@/testing/test-utils'
import { describe, expect, it } from 'vitest'

const editorUser = createUser({
  username: 'editor',
  role: 'EDITOR',
})

const regularUser = createUser({
  username: 'alice',
  role: 'USER',
})

describe('Authorization', () => {
  it('renders the loading state while the auth context is loading', async () => {
    const screen = await renderWithAuthContext(
      <Authorization requireAuth loading={<div>Loading auth</div>}>
        <div>Protected content</div>
      </Authorization>,
      { isLoading: true },
    )

    await expect.element(screen.getByText('Loading auth')).toBeInTheDocument()
    await expect
      .element(screen.getByText('Protected content'))
      .not.toBeInTheDocument()
  })

  it('requires an authenticated user when requireAuth is enabled', async () => {
    const screen = await renderWithAuthContext(
      <Authorization requireAuth fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    await expect
      .element(screen.getByText('Protected content'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Denied')).not.toBeInTheDocument()
  })

  it('renders the fallback when authentication is required but no user exists', async () => {
    const screen = await renderWithAuthContext(
      <Authorization requireAuth fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
    )

    await expect.element(screen.getByText('Denied')).toBeInTheDocument()
    await expect
      .element(screen.getByText('Protected content'))
      .not.toBeInTheDocument()
  })

  it('checks allowed roles through the auth context', async () => {
    const screen = await renderWithAuthContext(
      <Authorization allowedRoles="EDITOR" fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: editorUser },
    )

    await expect
      .element(screen.getByText('Protected content'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Denied')).not.toBeInTheDocument()
  })

  it('checks named policies through the auth context', async () => {
    const screen = await renderWithAuthContext(
      <Authorization policy="article:create" fallback={<div>Denied</div>}>
        <div>Protected content</div>
      </Authorization>,
      { user: editorUser },
    )

    await expect
      .element(screen.getByText('Protected content'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Denied')).not.toBeInTheDocument()
  })

  it('evaluates custom policies against the auth context user', async () => {
    const screen = await renderWithAuthContext(
      <Authorization
        customPolicy={(user) => user?.username === 'alice'}
        fallback={<div>Denied</div>}
      >
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    await expect
      .element(screen.getByText('Protected content'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Denied')).not.toBeInTheDocument()
  })

  it('checks permission-based access through the auth context', async () => {
    const screen = await renderWithAuthContext(
      <Authorization
        permissions={{ allowOwner: true, targetUsername: 'alice' }}
        fallback={<div>Denied</div>}
      >
        <div>Protected content</div>
      </Authorization>,
      { user: regularUser },
    )

    await expect
      .element(screen.getByText('Protected content'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Denied')).not.toBeInTheDocument()
  })
})
