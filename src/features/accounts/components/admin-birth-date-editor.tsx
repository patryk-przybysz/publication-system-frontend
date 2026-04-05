import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/api-client'
import type { User } from '@/types/api'
import { formatFullDate } from '@/utils/date'
import { formatFieldErrors } from '@/utils/field-error'
import { matchQueryStatus } from '@/utils/match-query'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Edit2 } from 'lucide-react'
import { useState } from 'react'
import {
  updateAccountInputSchema,
  useUpdateAccount,
} from '../api/update-account'

type AdminBirthDateEditorProps = {
  username: string
  onSuccess?: () => void
}

type AdminBirthDateEditFormProps = {
  username: string
  initialBirth: string
  onSuccess?: () => void
  onCancel: () => void
}

function AdminBirthDateEditForm({
  username,
  initialBirth,
  onSuccess,
  onCancel,
}: AdminBirthDateEditFormProps) {
  const updateAccountMutation = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        onSuccess?.()
      },
    },
  })

  const form = useForm({
    defaultValues: {
      birth: initialBirth,
    },
    validators: {
      onSubmit: updateAccountInputSchema,
    },
    onSubmit: ({ value }) => {
      updateAccountMutation.mutate({ username, data: value })
    },
  })

  return (
    <div className="space-y-2 p-2 border rounded-md bg-muted/50">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
        className="space-y-2"
      >
        <form.Field name="birth">
          {(field) => (
            <div>
              <Label htmlFor={`birth-date-${username}`} className="text-xs">
                <Calendar className="h-3 w-3 inline mr-1" />
                Birth Date for {username}
              </Label>
              <Input
                id={`birth-date-${username}`}
                type="date"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="h-8 text-xs"
                aria-invalid={!field.state.meta.isValid}
              />
              {!field.state.meta.isValid ? (
                <p className="text-xs text-destructive mt-1">
                  {formatFieldErrors(field.state.meta.errors)}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>
        <div className="flex gap-1">
          <form.Subscribe selector={(state) => state.values}>
            {(values) => (
              <Button
                type="submit"
                size="sm"
                disabled={
                  updateAccountMutation.isPending || !values.birth.trim()
                }
                className="h-7 px-2 text-xs"
              >
                {updateAccountMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </form.Subscribe>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={updateAccountMutation.isPending}
            className="h-7 px-2 text-xs"
          >
            Cancel
          </Button>
        </div>
      </form>
      {initialBirth ? (
        <div className="text-xs text-muted-foreground">
          Current: {formatFullDate(initialBirth)}
        </div>
      ) : null}
    </div>
  )
}

export function AdminBirthDateEditor({
  username,
  onSuccess,
}: AdminBirthDateEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const userDetailsQuery = useQuery({
    queryKey: ['accounts', username],
    queryFn: (): Promise<User> => api(`/accounts/${username}`),
    enabled: isEditing,
  })

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  if (!isEditing) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleStartEdit}
        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
        title={`Edit birth date for ${username}`}
      >
        <Edit2 className="h-3 w-3 mr-1" />
        Edit Birth Date
      </Button>
    )
  }

  return matchQueryStatus(
    userDetailsQuery,
    {
      loading: () => (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Spinner size="small" />
          Loading birth date...
        </div>
      ),
      error: () => (
        <div className="text-xs text-destructive">
          Failed to load birth date
        </div>
      ),
      success: (userData) => (
        <AdminBirthDateEditForm
          key={`${username}-${userData.birth ?? ''}`}
          username={username}
          initialBirth={userData.birth ?? ''}
          onSuccess={() => {
            setIsEditing(false)
            onSuccess?.()
          }}
          onCancel={handleCancel}
        />
      ),
    },
    {
      loadingSize: 'small',
      loadingClassName: 'flex items-center gap-2',
      handleCommonErrors: true,
    },
  )
}
