import type { UseQueryResult } from '@tanstack/react-query'
import { FetchError } from 'ofetch'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

import {
  type QueryMatchOptions,
  type QueryMatchPatterns,
  matchQueryStatus,
} from '@/utils/match-query'

async function renderQueryMatch<TData>(
  query: Partial<UseQueryResult<TData, FetchError>>,
  patterns: QueryMatchPatterns<TData, FetchError>,
  options?: QueryMatchOptions,
) {
  return render(
    matchQueryStatus(
      query as UseQueryResult<TData, FetchError>,
      patterns,
      options,
    ) as ReactElement,
  )
}

describe('matchQueryStatus', () => {
  it('uses the provided loading renderer', async () => {
    const screen = await renderQueryMatch(
      { isLoading: true, data: undefined, error: null },
      {
        loading: () => <div>Loading articles</div>,
        success: () => <div>Loaded</div>,
      },
    )

    await expect
      .element(screen.getByText('Loading articles'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Loaded')).not.toBeInTheDocument()
  })

  it('maps unauthorized errors to the unauthorized state', async () => {
    const error = Object.assign(new FetchError('Unauthorized'), {
      status: 401,
    })

    const screen = await renderQueryMatch(
      { isLoading: false, data: undefined, error },
      {
        success: () => <div>Loaded</div>,
      },
    )

    await expect.element(screen.getByText('Unauthorized')).toBeInTheDocument()
    await expect
      .element(screen.getByText('You are not authorized to access this page.'))
      .toBeInTheDocument()
  })

  it('maps missing content to the not found error state', async () => {
    const error = Object.assign(new FetchError('Not Found'), {
      status: 404,
    })

    const screen = await renderQueryMatch(
      { isLoading: false, data: undefined, error },
      {
        success: () => <div>Loaded</div>,
      },
    )

    await expect
      .element(screen.getByText('Content Not Found'))
      .toBeInTheDocument()
    await expect
      .element(
        screen.getByText(
          'The requested content could not be found or may have been removed.',
        ),
      )
      .toBeInTheDocument()
  })

  it('renders the empty pattern for empty results', async () => {
    const screen = await renderQueryMatch(
      { isLoading: false, data: [], error: null },
      {
        empty: () => <div>No articles yet</div>,
        success: () => <div>Loaded</div>,
      },
    )

    await expect
      .element(screen.getByText('No articles yet'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Loaded')).not.toBeInTheDocument()
  })
})
