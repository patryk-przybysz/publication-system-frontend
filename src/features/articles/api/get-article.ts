import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { ArticleDetails } from '@/types/api'

const getArticle = ({
  articleId,
}: {
  articleId: string
}): Promise<ArticleDetails> => api(`/articles/${articleId}`)

export const getArticleQueryOptions = (articleId: string) => {
  return queryOptions({
    queryKey: ['articles', articleId],
    queryFn: () => getArticle({ articleId }),
  })
}

type UseArticleOptions = {
  articleId: string
  queryConfig?: QueryConfig<typeof getArticleQueryOptions>
}

export const useArticle = ({ articleId, queryConfig }: UseArticleOptions) => {
  return useQuery({
    ...getArticleQueryOptions(articleId),
    ...queryConfig,
  })
}
