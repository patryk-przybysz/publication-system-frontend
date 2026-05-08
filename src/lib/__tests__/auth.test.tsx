import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { useHasStoredAuth, useUser } from '@/lib/auth'
import { authStorage } from '@/lib/auth-storage'

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

afterEach(() => {
  authStorage.remove()
})

describe('useHasStoredAuth', () => {
  it('tracks whether credentials are stored in localStorage', () => {
    const { result } = renderHook(() => useHasStoredAuth())

    expect(result.current).toBe(false)

    act(() => {
      authStorage.set({ username: 'alice', password: 'secret' })
      window.dispatchEvent(new Event('storage'))
    })

    expect(result.current).toBe(true)

    act(() => {
      authStorage.remove()
      window.dispatchEvent(new Event('storage'))
    })

    expect(result.current).toBe(false)
  })
})

describe('useUser', () => {
  it('returns the authenticated user when credentials are valid', async () => {
    authStorage.set({ username: 'admin', password: 'sa' })
    const queryClient = new QueryClient()

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toMatchObject({
      username: 'admin',
      role: 'ADMIN',
    })
  })

  it('returns null when credentials are invalid', async () => {
    authStorage.set({ username: 'admin', password: 'wrong-password' })
    const queryClient = new QueryClient()

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toBeNull()
  })
})
