import { ErrorComponent } from '@/components/errors'
import { UnauthorizedError } from '@/components/errors/unauthorized'
import { Spinner } from '@/components/ui/spinner'
import type { UseQueryResult } from '@tanstack/react-query'
import { FetchError } from 'ofetch'
import type { ReactNode } from 'react'

type QueryMatchPatterns<TData> = {
  loading?: () => ReactNode
  error?: (error: Error) => ReactNode
  success: (data: TData) => ReactNode
  empty?: (data: TData) => ReactNode
}

type QueryMatchOptions = {
  /**
   * Custom loading component size
   */
  loadingSize?: 'small' | 'medium' | 'large'
  /**
   * Custom loading component className
   */
  loadingClassName?: string
  /**
   * Function to determine if data should be considered "empty"
   * Defaults to checking if data is falsy or empty array
   */
  isEmpty?: <T>(data: T) => boolean
  /**
   * Whether to show default error handling for common HTTP errors
   * Defaults to true
   */
  handleCommonErrors?: boolean
}

/**
 * A hook that provides pattern matching for Tanstack Query states.
 *
 * @example
 * ```tsx
 * const articlesQuery = useArticles({ page, size })
 *
 * return useQueryMatch(articlesQuery, {
 *   loading: () => <CustomSpinner />,
 *   error: (error) => <CustomError error={error} />,
 *   success: (articles) => <ArticlesList articles={articles} />,
 *   empty: () => <EmptyState message="No articles found" />
 * })
 * ```
 */
export function matchQueryStatus<TData>(
  query: UseQueryResult<TData>,
  patterns: QueryMatchPatterns<TData>,
  options: QueryMatchOptions = {},
): ReactNode {
  const {
    loadingSize = 'large',
    loadingClassName = 'flex justify-center items-center h-full',
    isEmpty = (data) => !data || (Array.isArray(data) && data.length === 0),
    handleCommonErrors = true,
  } = options

  // Handle loading state
  if (query.isLoading) {
    if (patterns.loading) {
      return patterns.loading()
    }
    return (
      <div className={loadingClassName}>
        <Spinner size={loadingSize} className="mx-auto" />
      </div>
    )
  }

  // Handle error state
  if (query.error) {
    if (patterns.error) {
      return patterns.error(query.error)
    }

    // Default error handling for common cases
    if (handleCommonErrors && query.error instanceof FetchError) {
      if (query.error.status === 401 || query.error.status === 403) {
        return <UnauthorizedError />
      }
      if (query.error.status === 404 || query.error.status === 500) {
        return (
          <ErrorComponent
            title="Content Not Found"
            description="The requested content could not be found or may have been removed."
          />
        )
      }
    }

    // Fallback error component
    return (
      <ErrorComponent
        title="Something went wrong"
        description={query.error.message || 'An unexpected error occurred'}
      />
    )
  }

  // Handle success state
  const data = query.data

  // Check for empty state if pattern is provided
  if (patterns.empty && data !== undefined && isEmpty(data)) {
    return patterns.empty(data)
  }

  // Handle success with data
  if (data !== undefined) {
    return patterns.success(data)
  }

  // Fallback for undefined data (shouldn't happen in normal cases)
  return null
}

/**
 * A simplified version that only handles the success case,
 * using default loading and error handling.
 *
 * @example
 * ```tsx
 * const articlesQuery = useArticles({ page, size })
 *
 * return useQueryMatchSimple(articlesQuery, (articles) => (
 *   <ArticlesList articles={articles} />
 * ))
 * ```
 */
export function matchQuerySuccess<TData>(
  query: UseQueryResult<TData>,
  onSuccess: (data: TData) => ReactNode,
  options: QueryMatchOptions = {},
): ReactNode {
  return matchQueryStatus(query, { success: onSuccess }, options)
}
