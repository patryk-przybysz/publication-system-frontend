import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Article } from '@/types/api'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import {
  createCommentInputSchema,
  useCreateComment,
} from '../api/create-comment'

const createCommentFormSchema = createCommentInputSchema.pick({
  content: true,
})

export function CreateCommentForm({ articleId }: { articleId: Article['id'] }) {
  const createCommentMutation = useCreateComment({
    articleId,
  })

  const form = useForm({
    defaultValues: {
      content: '',
    },
    validators: {
      onSubmit: createCommentFormSchema,
    },
    onSubmit: ({ value }) => {
      createCommentMutation.mutate(
        {
          data: {
            ...value,
            articleId,
          },
        },
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
      <FieldGroup>
        <form.Field name="content">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="comment-content">Add a comment</FieldLabel>
                <FieldContent>
                  <Textarea
                    id="comment-content"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Share your thoughts about this article..."
                    rows={3}
                    className="resize-none"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : null}
                </FieldContent>
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
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
