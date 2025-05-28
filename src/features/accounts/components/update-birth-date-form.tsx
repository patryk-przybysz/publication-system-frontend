import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/api-client'
import { useUser } from '@/lib/auth'
import type { User } from '@/types/api'
import { formatFullDate } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Edit2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUpdateAccount } from '../api/update-account'

type UpdateBirthDateFormProps = {
  username?: string // If provided, admin is updating another user's birth date
  currentBirthDate?: string // If not provided, will fetch from API
  onSuccess?: () => void
  variant?: 'profile' | 'admin' // Different display styles
}

export function UpdateBirthDateForm({
  username,
  currentBirthDate,
  onSuccess,
  variant = 'profile',
}: UpdateBirthDateFormProps) {
  const { data: currentUser } = useUser()
  const [birthDate, setBirthDate] = useState(currentBirthDate || '')
  const [isEditing, setIsEditing] = useState(false)

  const targetUsername = username || currentUser?.username

  // Fetch user details if we don't have birth date and we're editing
  const userDetailsQuery = useQuery({
    queryKey: ['accounts', targetUsername],
    queryFn: (): Promise<User> => api(`/accounts/${targetUsername}`),
    enabled: !currentBirthDate && isEditing && !!targetUsername,
  })

  // Update birth date when user details are loaded
  useEffect(() => {
    if (userDetailsQuery.data?.birth) {
      setBirthDate(userDetailsQuery.data.birth)
    }
  }, [userDetailsQuery.data?.birth])

  const updateAccountMutation = useUpdateAccount({
    mutationConfig: {
      onSuccess: () => {
        setIsEditing(false)
        onSuccess?.()
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!targetUsername || !birthDate.trim()) {
      return
    }

    updateAccountMutation.mutate({
      username: targetUsername,
      data: {
        birth: birthDate,
      },
    })
  }

  const handleCancel = () => {
    setBirthDate(currentBirthDate || '')
    setIsEditing(false)
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    if (currentBirthDate) {
      setBirthDate(currentBirthDate)
    }
  }

  // Don't show admin variant if user is not admin
  if (variant === 'admin' && currentUser?.role !== 'ADMIN') {
    return null
  }

  // Admin variant - compact button style
  if (variant === 'admin') {
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

    if (userDetailsQuery.isLoading) {
      return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Spinner size="small" />
          Loading birth date...
        </div>
      )
    }

    if (userDetailsQuery.error) {
      return (
        <div className="text-xs text-destructive">
          Failed to load birth date
        </div>
      )
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
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="h-8 text-xs"
            />
          </div>
          <div className="flex gap-1">
            <Button
              type="submit"
              size="sm"
              disabled={updateAccountMutation.isPending || !birthDate.trim()}
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
        {(currentBirthDate || userDetailsQuery.data?.birth) && (
          <div className="text-xs text-muted-foreground">
            Current:{' '}
            {formatFullDate(
              currentBirthDate || userDetailsQuery.data?.birth || '',
            )}
          </div>
        )}
      </div>
    )
  }

  // Profile variant - original layout
  return isEditing ? (
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
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={updateAccountMutation.isPending || !birthDate.trim()}
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
  ) : (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">Birth Date</dt>
      <dd className="mt-1 text-lg flex items-center gap-2">
        <span>{formatFullDate(currentBirthDate || '')}</span>
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
