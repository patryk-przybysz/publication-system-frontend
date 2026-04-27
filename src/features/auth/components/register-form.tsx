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
import { registerInputSchema, useRegister } from '@/lib/auth'
import { useForm } from '@tanstack/react-form'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const registerMutation = useRegister()

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
      registerMutation.mutate(value, {
        onSuccess: () => {
          onSuccess?.()
        },
      })
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
          <FieldGroup>
            <form.Field name="username">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="register-username">
                      Username
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="register-username"
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Choose a username"
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
                    <FieldLabel htmlFor="register-password">
                      Password
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="register-password"
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Create a password"
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
            <form.Field name="birth">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="birth">Birth Date</FieldLabel>
                    <FieldContent>
                      <Input
                        id="birth"
                        type="date"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
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
