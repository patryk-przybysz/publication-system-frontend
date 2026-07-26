import { createUser } from '@/testing/data-generators'
import { renderWithAuthContext } from '@/testing/test-utils'
import type { AccountPublicDetails } from '@/types/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'

import { AccountDetailsCard } from '../account-details-card'

const account: AccountPublicDetails = {
  username: 'alice',
  verified: true,
  role: 'EDITOR',
  subscriptionLevel: 'PREMIUM',
  adult: true,
  membership: '2 years',
}

describe('AccountDetailsCard', () => {
  it('shows the account details and the edit action for the owner', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    const screen = await renderWithAuthContext(
      <QueryClientProvider client={queryClient}>
        <AccountDetailsCard account={account} />
      </QueryClientProvider>,
      {
        user: createUser({ username: 'alice', role: 'USER' }),
      },
    )

    await expect.element(screen.getByText('alice')).toBeInTheDocument()
    await expect.element(screen.getByText('EDITOR')).toBeInTheDocument()
    await expect.element(screen.getByText('⭐ Premium')).toBeInTheDocument()
    await expect.element(screen.getByText('🔞 Adult')).toBeInTheDocument()
    await expect.element(screen.getByText('Verified')).toBeInTheDocument()
    await expect
      .element(screen.getByRole('button', { name: /edit birth date/i }))
      .toBeInTheDocument()
  })

  it('hides the edit action for unrelated users', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    const screen = await renderWithAuthContext(
      <QueryClientProvider client={queryClient}>
        <AccountDetailsCard account={account} />
      </QueryClientProvider>,
      {
        user: createUser({ username: 'bob', role: 'USER' }),
      },
    )

    await expect.element(screen.getByText('alice')).toBeInTheDocument()
    await expect
      .element(screen.getByRole('button', { name: /edit birth date/i }))
      .not.toBeInTheDocument()
  })
})
