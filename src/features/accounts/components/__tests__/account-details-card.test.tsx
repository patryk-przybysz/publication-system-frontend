import { createUser } from '@/testing/data-generators'
import { renderWithAuthContext } from '@/testing/test-utils'
import type { AccountPublicDetails } from '@/types/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
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
  it('shows the account details and the edit action for the owner', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    renderWithAuthContext(
      <QueryClientProvider client={queryClient}>
        <AccountDetailsCard account={account} />
      </QueryClientProvider>,
      {
        user: createUser({ username: 'alice', role: 'USER' }),
      },
    )

    expect(screen.getByText('alice')).toBeInTheDocument()
    expect(screen.getByText('EDITOR')).toBeInTheDocument()
    expect(screen.getByText('⭐ Premium')).toBeInTheDocument()
    expect(screen.getByText('🔞 Adult')).toBeInTheDocument()
    expect(screen.getByText('Verified')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /edit birth date/i }),
    ).toBeInTheDocument()
  })

  it('hides the edit action for unrelated users', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    renderWithAuthContext(
      <QueryClientProvider client={queryClient}>
        <AccountDetailsCard account={account} />
      </QueryClientProvider>,
      {
        user: createUser({ username: 'bob', role: 'USER' }),
      },
    )

    expect(screen.getByText('alice')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /edit birth date/i }),
    ).not.toBeInTheDocument()
  })
})
