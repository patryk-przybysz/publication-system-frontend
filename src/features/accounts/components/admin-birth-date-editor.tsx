import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/api-client'
import type { User } from '@/types/api'
import { formatFullDate } from '@/utils/date'
import { matchQueryStatus } from '@/utils/match-query'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Edit2 } from 'lucide-react'
import { useState } from 'react'
import { useUpdateAccount } from '../api/update-account'

type AdminBirthDateEditorProps = {
  username: string
  onSuccess?: () => void
}

export function AdminBirthDateEditor({
  username,
  onSuccess,
}: AdminBirthDateEditorProps) {
  const [editedBirthDate, setEditedBirthDate] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const userDetailsQuery = useQuery({
    queryKey: ['accounts', username],
    queryFn: (): Promise<User> => api(`/accounts/${username}`),
    enabled: isEditing,
  })

  const updateAccountMutation = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        setEditedBirthDate(null)
        setIsEditing(false)
        onSuccess?.()
      },
    },
  })

  const handleCancel = () => {
    setEditedBirthDate(null)
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
      success: (userData) => {
        const displayBirthDate = editedBirthDate ?? userData.birth ?? ''

        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault()

          const birthDate = editedBirthDate ?? userData.birth
          if (!birthDate?.trim()) return

          updateAccountMutation.mutate({
            username,
            data: {
              birth: birthDate,
            },
          })
        }

        return (
          <div className="space-y-2 p-2 border rounded-md bg-muted/50">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Label htmlFor={`birth-date-${username}`} className="text-xs">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Birth Date for {username}
                </Label>
                <Input
                  id={`birth-date-${username}`}
                  type="date"
                  value={displayBirthDate}
                  onChange={(e) => setEditedBirthDate(e.target.value)}
                  required
                  className="h-8 text-xs"
                />
              </div>
              <div className="flex gap-1">
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    updateAccountMutation.isPending || !displayBirthDate.trim()
                  }
                  className="h-7 px-2 text-xs"
                >
                  {updateAccountMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={updateAccountMutation.isPending}
                  className="h-7 px-2 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
            {userData.birth && (
              <div className="text-xs text-muted-foreground">
                Current: {formatFullDate(userData.birth)}
              </div>
            )}
          </div>
        )
      },
    },
    {
      loadingSize: 'small',
      loadingClassName: 'flex items-center gap-2',
      handleCommonErrors: true,
    },
  )
}
