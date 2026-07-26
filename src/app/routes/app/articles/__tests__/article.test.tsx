import { afterEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

import App from '@/app/index'
import { authStorage } from '@/lib/auth-storage'

async function renderArticleRoute(articleId = '1') {
  window.history.pushState({}, '', `/app/articles/${articleId}`)

  return render(<App />)
}

describe('article route', () => {
  it('renders the article details for an authenticated user', async () => {
    authStorage.set({ username: 'user', password: 'sa' })

    const screen = await renderArticleRoute()

    await expect
      .element(
        screen.getByRole('heading', {
          name: 'Understanding Access Control',
        }),
      )
      .toBeInTheDocument()
    await expect
      .element(
        screen.getByText(
          'Access control is central to secure publishing systems.',
        ),
      )
      .toBeInTheDocument()
    await expect.element(screen.getByText('By editor')).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Comments' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByText('Great overview!'))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('button', { name: /post comment/i }))
      .toBeInTheDocument()
  })

  it('shows article not found when the article id does not exist', async () => {
    authStorage.set({ username: 'user', password: 'sa' })

    const screen = await renderArticleRoute('999')

    await expect
      .element(screen.getByRole('heading', { name: /article not found/i }))
      .toBeInTheDocument()
    await expect
      .element(
        screen.getByText(
          /this article doesn't exist or may have been removed by the author/i,
        ),
      )
      .toBeInTheDocument()
  })

  afterEach(() => {
    authStorage.remove()
  })
})
