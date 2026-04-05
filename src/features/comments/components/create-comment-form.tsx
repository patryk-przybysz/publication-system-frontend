import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Article } from '@/types/api'
import { formatFieldErrors } from '@/utils/field-error'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import {
  createCommentInputSchema,
  useCreateComment,
} from '../api/create-comment'

export function CreateCommentForm({ articleId }: { articleId: Article['id'] }) {
  const createCommentMutation = useCreateComment({
    articleId,
  })

  const form = useForm({
    defaultValues: {
      content: '',
      articleId,
    },
    validators: {
      onSubmit: createCommentInputSchema,
    },
    onSubmit: ({ value }) => {
      createCommentMutation.mutate(
        { data: value },
        {
          onSuccess: () => {
            toast.success('Comment created successfully!')
            form.reset()
          },
        },
      )
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="comment-content"
          className="text-sm font-medium mb-2 block"
        >
          Add a comment
        </label>
        <form.Field name="content">
          {(field) => (
            <div>
              <Textarea
                id="comment-content"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Share your thoughts about this article..."
                rows={3}
                className="resize-none"
                aria-invalid={!field.state.meta.isValid}
              />
              {!field.state.meta.isValid ? (
                <p className="text-sm text-destructive mt-1">
                  {formatFieldErrors(field.state.meta.errors)}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>
      <div className="flex justify-between items-center">
        <form.Subscribe selector={(state) => state.values}>
          {(values) => (
            <Button
              type="submit"
              size="sm"
              disabled={
                createCommentMutation.isPending || !values.content.trim()
              }
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
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
