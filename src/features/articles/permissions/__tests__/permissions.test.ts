import { createUser } from '@/testing/data-generators'
import { describe, expect, it } from 'vitest'

import { canCreateArticle } from '../index'

describe('canCreateArticle', () => {
  it('allows editors to create articles', () => {
    const editor = createUser({ role: 'EDITOR' })

    expect(canCreateArticle(editor)).toBe(true)
  })

  it('rejects users without the editor role', () => {
    const user = createUser({ role: 'USER' })

    expect(canCreateArticle(user)).toBe(false)
  })
})
