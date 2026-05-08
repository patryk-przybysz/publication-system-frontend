import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import App from '@/app/index'
import { authStorage } from '@/lib/auth-storage'

function renderArticleRoute(articleId = '1') {
  window.history.pushState({}, '', `/app/articles/${articleId}`)

  return render(<App />)
}

describe('article route', () => {
  it('renders the article details for an authenticated user', async () => {
    authStorage.set({ username: 'user', password: 'sa' })

    renderArticleRoute()

    expect(
      await screen.findByRole('heading', {
        name: 'Understanding Access Control',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Access control is central to secure publishing systems.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('By editor')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Comments' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Great overview!')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /post comment/i }),
    ).toBeInTheDocument()
  })

  it('shows article not found when the article id does not exist', async () => {
    authStorage.set({ username: 'user', password: 'sa' })

    renderArticleRoute('999')

    expect(
      await screen.findByRole('heading', { name: /article not found/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /this article doesn't exist or may have been removed by the author/i,
      ),
    ).toBeInTheDocument()
  })

  afterEach(() => {
    authStorage.remove()
  })
})
