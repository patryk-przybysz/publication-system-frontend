import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { Article } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

type SortParam<T extends Record<string, unknown>> = `${keyof T & string},${
  | 'asc'
  | 'desc'}`

type GetArticlesParams = {
  author?: string
  requiredAge?: number
  page?: number
  size?: number
  sort?: SortParam<Article>
}

const getArticles = ({
  author,
  requiredAge,
  page,
  size,
  sort,
}: GetArticlesParams = {}) =>
  api<Article[]>('/articles', {
    params: {
      author,
      'required-age': requiredAge,
      page,
      size,
      sort,
    },
  })

export const getArticlesQueryOptions = ({
  author,
  requiredAge,
  page,
  size,
  sort,
}: GetArticlesParams = {}) => {
  return queryOptions({
    queryKey:
      page !== undefined
        ? ['articles', { author, requiredAge, page, size, sort }]
        : ['articles'],
    queryFn: () => getArticles({ author, requiredAge, page, size, sort }),
  })
}

type UseArticlesOptions = {
  author?: string
  requiredAge?: number
  page?: number
  size?: number
  sort?: SortParam<Article>
  queryConfig?: QueryConfig<typeof getArticlesQueryOptions>
}

export const useArticles = ({
  queryConfig,
  author,
  requiredAge,
  page,
  size,
  sort,
}: UseArticlesOptions) => {
  return useQuery({
    ...getArticlesQueryOptions({ author, requiredAge, page, size, sort }),
    ...queryConfig,
  })
}
