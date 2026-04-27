import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { env } from '@/config/env'
import { loginInputSchema, useLogin } from '@/lib/auth'
import { useForm } from '@tanstack/react-form'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const loginMutation = useLogin()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: loginInputSchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: () => {
          onSuccess?.()
        },
      })
    },
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.Field name="username">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <FieldContent>
                      <Input
                        id="username"
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your username"
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
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldContent>
                      <Input
                        id="password"
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
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
