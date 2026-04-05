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
import { registerInputSchema, useRegister } from '@/lib/auth'
import { formatFieldErrors } from '@/utils/field-error'
import { useForm } from '@tanstack/react-form'

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

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      birth: '',
    },
    validators: {
      onSubmit: registerInputSchema,
    },
    onSubmit: ({ value }) => {
      registerMutation.mutate(value)
    },
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field name="username">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Choose a username"
                  aria-invalid={!field.state.meta.isValid}
                />
                {!field.state.meta.isValid ? (
                  <p className="text-sm text-destructive">
                    {formatFieldErrors(field.state.meta.errors)}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Create a password"
                  aria-invalid={!field.state.meta.isValid}
                />
                {!field.state.meta.isValid ? (
                  <p className="text-sm text-destructive">
                    {formatFieldErrors(field.state.meta.errors)}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Field name="birth">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="birth">Birth Date</Label>
                <Input
                  id="birth"
                  type="date"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={!field.state.meta.isValid}
                />
                {!field.state.meta.isValid ? (
                  <p className="text-sm text-destructive">
                    {formatFieldErrors(field.state.meta.errors)}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
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
