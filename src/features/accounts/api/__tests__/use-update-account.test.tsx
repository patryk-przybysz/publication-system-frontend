import { api } from '@/lib/api-client'
import { createUser } from '@/testing/data-generators'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { type ReactNode, createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useUpdateAccount } from '@/features/accounts/api/update-account'

vi.mock('@/lib/api-client', () => ({
  api: vi.fn(),
}))

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient, children })
  }
}

beforeEach(() => {
  vi.mocked(api).mockReset()
})

describe('useUpdateAccount', () => {
  it('invalidates account-related caches after a successful update', async () => {
    const queryClient = new QueryClient()
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const wrapper = createWrapper(queryClient)
    const onSuccess = vi.fn()
    const updatedUser = createUser({ username: 'alice' })

    vi.mocked(api).mockResolvedValue(updatedUser)

    const { result } = renderHook(
      () => useUpdateAccount({ mutationConfig: { onSuccess } }),
      { wrapper },
    )

    await act(async () => {
      await result.current.mutateAsync({
        username: 'alice',
        data: {
          birth: '1990-01-31',
        },
      })
    })

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['accounts'],
      })
    })
    expect(onSuccess).toHaveBeenCalled()
  })
})
