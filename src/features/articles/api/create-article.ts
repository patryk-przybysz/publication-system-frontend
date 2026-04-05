import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { Article } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getArticlesQueryOptions } from './get-articles'

const optionalNonNegativeInt = (message: string) =>
  z
    .string()
    .transform((s) => (s.trim() === '' ? 0 : Number(s)))
    .refine((n) => !Number.isNaN(n) && n >= 0 && Number.isInteger(n), message)

export const createArticleInputSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
  requiredAge: optionalNonNegativeInt('Required age must be a valid number'),
  requiredAccountAge: optionalNonNegativeInt(
    'Required account age must be a valid number',
  ),
  timeUnit: z.enum(['NULL', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']),
})

export type CreateArticleInput = z.infer<typeof createArticleInputSchema>

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
