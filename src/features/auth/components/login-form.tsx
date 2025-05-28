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
import { env } from '@/config/env'
import { useLogin } from '@/lib/auth'
import { useState } from 'react'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const loginMutation = useLogin({
    onSuccess: () => {
      onSuccess?.()
    },
  })
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(credentials)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
          {onSwitchToRegister && (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onSwitchToRegister}
            >
              Don't have an account? Sign up
            </Button>
          )}
        </form>
        {env.NODE_ENV === 'development' && (
          <div className="mt-4 pt-4 border-t border-muted">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
                DEVELOPMENT MODE
              </p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Test accounts available:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-xs font-medium">USER</span>
                </div>
                <span className="text-xs font-mono bg-background px-2 py-1 rounded border">
                  user:sa
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs font-medium">EDITOR</span>
                </div>
                <span className="text-xs font-mono bg-background px-2 py-1 rounded border">
                  editor:sa
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-xs font-medium">ADMIN</span>
                </div>
                <span className="text-xs font-mono bg-background px-2 py-1 rounded border">
                  admin:sa
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
