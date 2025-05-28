import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultMode?: 'login' | 'register'
}

export function AuthDialog({
  open,
  onOpenChange,
  defaultMode = 'login',
}: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  useEffect(() => {
    if (open) {
      setMode(defaultMode)
    }
  }, [open, defaultMode])

  const handleSuccess = () => {
    onOpenChange(false)
  }

  const switchToRegister = () => setMode('register')
  const switchToLogin = () => setMode('login')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{mode === 'login' ? 'Sign In' : 'Sign Up'}</DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Create a new account'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          {mode === 'login' ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToLogin={switchToLogin}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
