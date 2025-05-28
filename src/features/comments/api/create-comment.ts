import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { getArticleQueryOptions } from '@/features/articles/api/get-article'
import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'

export const createCommentInputSchema = z.object({
  content: z.string(),
  articleId: z.string(),
})

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>

export const createComment = ({
  data,
}: {
  data: CreateCommentInput
}): Promise<void> =>
  api(`/articles/${data.articleId}/comments`, {
    method: 'POST',
    body: data,
  })

type UseCreateCommentOptions = {
  articleId: string
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({
  mutationConfig,
  articleId,
}: UseCreateCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticleQueryOptions(articleId).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createComment,
  })
}
