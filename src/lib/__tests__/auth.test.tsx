import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useHasStoredAuth } from '@/lib/auth'
import { authStorage } from '@/lib/auth-storage'

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
