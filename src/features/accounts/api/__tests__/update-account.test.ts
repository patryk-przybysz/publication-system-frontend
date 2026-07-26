import { api } from '@/lib/api-client'
import { createUser } from '@/testing/data-generators'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { updateAccount } from '@/features/accounts/api/update-account'

vi.mock('@/lib/api-client', () => ({
  api: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(api).mockReset()
})

describe('updateAccount', () => {
  it('patches the target account with the submitted birth date', async () => {
    const updatedUser = createUser({ username: 'alice' })
    vi.mocked(api).mockResolvedValue(updatedUser)

    await expect(
      updateAccount({
        username: 'alice',
        data: {
          birth: '1990-01-31',
        },
      }),
    ).resolves.toEqual(updatedUser)

    expect(api).toHaveBeenCalledWith('/accounts/alice', {
      method: 'PATCH',
      body: {
        birth: '1990-01-31',
      },
    })
  })
})
