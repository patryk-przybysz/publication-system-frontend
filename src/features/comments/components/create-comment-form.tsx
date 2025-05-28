import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Article } from '@/types/api'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateComment } from '../api/create-comment'

export function CreateCommentForm({ articleId }: { articleId: Article['id'] }) {
  const [content, setContent] = useState('')

  const createCommentMutation = useCreateComment({
    articleId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('Comment created successfully!')
        setContent('')
      },
      onError: () => {
        toast.error('Failed to create comment')
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast.error('Comment content is required')
      return
    }

    createCommentMutation.mutate({
      data: {
        content: content.trim(),
        articleId,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="comment-content"
          className="text-sm font-medium mb-2 block"
        >
          Add a comment
        </label>
        <Textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this article..."
          rows={3}
          className="resize-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <Button
          type="submit"
          size="sm"
          disabled={createCommentMutation.isPending || !content.trim()}
        >
          {createCommentMutation.isPending ? (
            <>
              <Spinner size="small" className="mr-2" />
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </Button>
      </div>
    </form>
  )
}
