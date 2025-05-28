import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/lib/auth'
import { useState } from 'react'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const registerMutation = useRegister({
    onSuccess: () => {
      onSuccess?.()
    },
  })
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    birth: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    registerMutation.mutate(credentials)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-username">Username</Label>
            <Input
              id="register-username"
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
              placeholder="Choose a username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              placeholder="Create a password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth">Birth Date</Label>
            <Input
              id="birth"
              type="date"
              value={credentials.birth}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, birth: e.target.value }))
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Creating account...' : 'Sign Up'}
          </Button>
          {onSwitchToLogin && (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onSwitchToLogin}
            >
              Already have an account? Sign in
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
