import type { UseQueryResult } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { FetchError } from 'ofetch'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'

import {
  type QueryMatchOptions,
  type QueryMatchPatterns,
  matchQueryStatus,
} from '@/utils/match-query'

function renderQueryMatch<TData>(
  query: Partial<UseQueryResult<TData, FetchError>>,
  patterns: QueryMatchPatterns<TData, FetchError>,
  options?: QueryMatchOptions,
) {
  render(
    matchQueryStatus(
      query as UseQueryResult<TData, FetchError>,
      patterns,
      options,
    ) as ReactElement,
  )
}

describe('matchQueryStatus', () => {
  it('uses the provided loading renderer', () => {
    renderQueryMatch(
      { isLoading: true, data: undefined, error: null },
      {
        loading: () => <div>Loading articles</div>,
        success: () => <div>Loaded</div>,
      },
    )

    expect(screen.getByText('Loading articles')).toBeInTheDocument()
    expect(screen.queryByText('Loaded')).not.toBeInTheDocument()
  })

  it('maps unauthorized errors to the unauthorized state', () => {
    const error = Object.assign(new FetchError('Unauthorized'), {
      status: 401,
    })

    renderQueryMatch(
      { isLoading: false, data: undefined, error },
      {
        success: () => <div>Loaded</div>,
      },
    )

    expect(screen.getByText('Unauthorized')).toBeInTheDocument()
    expect(
      screen.getByText('You are not authorized to access this page.'),
    ).toBeInTheDocument()
  })

  it('maps missing content to the not found error state', () => {
    const error = Object.assign(new FetchError('Not Found'), {
      status: 404,
    })

    renderQueryMatch(
      { isLoading: false, data: undefined, error },
      {
        success: () => <div>Loaded</div>,
      },
    )

    expect(screen.getByText('Content Not Found')).toBeInTheDocument()
    expect(
      screen.getByText(
        'The requested content could not be found or may have been removed.',
      ),
    ).toBeInTheDocument()
  })

  it('renders the empty pattern for empty results', () => {
    renderQueryMatch(
      { isLoading: false, data: [], error: null },
      {
        empty: () => <div>No articles yet</div>,
        success: () => <div>Loaded</div>,
      },
    )

    expect(screen.getByText('No articles yet')).toBeInTheDocument()
    expect(screen.queryByText('Loaded')).not.toBeInTheDocument()
  })
})
