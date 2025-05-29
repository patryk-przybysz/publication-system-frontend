import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { getArticleQueryOptions } from '@/features/articles/api/get-article'
import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'

export const deleteCommentInputSchema = z.object({
  commentId: z.number(),
  articleId: z.string(),
})

export type DeleteCommentInput = z.infer<typeof deleteCommentInputSchema>

export const deleteComment = ({
  data,
}: {
  data: DeleteCommentInput
}): Promise<void> =>
  api(`/articles/${data.articleId}/comments/${data.commentId}`, {
    method: 'DELETE',
  })

type UseDeleteCommentOptions = {
  articleId: string
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({
  mutationConfig,
  articleId,
}: UseDeleteCommentOptions) => {
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
    mutationFn: deleteComment,
  })
}
