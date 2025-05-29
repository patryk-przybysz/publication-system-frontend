import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { Article } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getArticlesQueryOptions } from './get-articles'

const createArticleInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  requiredAge: z.number(),
  requiredAccountAge: z.number(),
  timeUnit: z.enum(['NULL', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']),
})

type CreateArticleInput = z.infer<typeof createArticleInputSchema>

const createArticle = ({
  data,
}: {
  data: CreateArticleInput
}): Promise<Article> =>
  api('/articles', {
    method: 'POST',
    body: data,
  })

type UseCreateArticleOptions = {
  mutationConfig?: MutationConfig<typeof createArticle>
}

export const useCreateArticle = ({
  mutationConfig,
}: UseCreateArticleOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticlesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createArticle,
  })
}
