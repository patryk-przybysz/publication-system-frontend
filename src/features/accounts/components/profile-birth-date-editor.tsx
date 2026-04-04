import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatFullDate } from '@/utils/date'
import { useState } from 'react'
import { useUpdateAccount } from '../api/update-account'

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
  const [editedDate, setEditedDate] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const displayDate = editedDate ?? initialDate

  const updateAccountMutation = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        setEditedDate(null)
        setIsEditing(false)
        onSuccess?.()
      },
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!displayDate.trim()) return

    updateAccountMutation.mutate({
      username,
      data: {
        birth: displayDate,
      },
    })
  }

  const handleCancel = () => {
    setEditedDate(null)
    setIsEditing(false)
  }

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label
              htmlFor="birth-date"
              className="text-sm font-medium text-muted-foreground"
            >
              Birth Date
            </Label>
            <Input
              id="birth-date"
              type="date"
              value={displayDate}
              onChange={(e) => setEditedDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={updateAccountMutation.isPending || !displayDate.trim()}
              className="h-8 px-3 text-xs"
            >
              {updateAccountMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
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
        <span>{formatFullDate(displayDate)}</span>
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
