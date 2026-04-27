import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { formatFullDate } from '@/utils/date'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import {
  updateAccountInputSchema,
  useUpdateAccount,
} from '../api/update-account'

type ProfileBirthDateEditorProps = {
  username: string
  initialDate: string
  onSuccess?: () => void
}

export function ProfileBirthDateEditor({
  username,
  initialDate,
  onSuccess,
}: ProfileBirthDateEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const updateAccountMutation = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        setIsEditing(false)
        onSuccess?.()
      },
    },
  })

  const form = useForm({
    defaultValues: {
      birth: initialDate,
    },
    validators: {
      onSubmit: updateAccountInputSchema,
    },
    onSubmit: ({ value }) => {
      updateAccountMutation.mutate({ username, data: value })
    },
  })

  const handleCancel = () => {
    form.reset({ birth: initialDate })
    setIsEditing(false)
  }

  const handleStartEdit = () => {
    form.reset({ birth: initialDate })
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="space-y-3"
        >
          <FieldGroup>
            <form.Field name="birth">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="birth-date">Birth Date</FieldLabel>
                    <FieldContent>
                      <Input
                        id="birth-date"
                        type="date"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="mt-1"
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
          <div className="flex gap-2">
            <form.Subscribe selector={(state) => state.values}>
              {(values) => (
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    updateAccountMutation.isPending || !values.birth.trim()
                  }
                  className="h-8 px-3 text-xs"
                >
                  {updateAccountMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              )}
            </form.Subscribe>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={updateAccountMutation.isPending}
              className="h-8 px-3 text-xs"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">Birth Date</dt>
      <dd className="mt-1 text-lg flex items-center gap-2">
        <span>{formatFullDate(initialDate)}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleStartEdit}
          className="h-7 px-2 text-xs"
        >
          Edit
        </Button>
      </dd>
    </div>
  )
}
