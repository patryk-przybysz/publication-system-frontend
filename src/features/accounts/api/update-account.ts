import { api } from '@/lib/api-client'
import { getUserQueryOptions } from '@/lib/auth'
import type { MutationConfig } from '@/lib/react-query'
import type { User } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

export const updateAccountInputSchema = z.object({
  birth: z
    .string()
    .trim()
    .min(1, 'Birth date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be a valid date'),
})

export type UpdateAccountInput = z.infer<typeof updateAccountInputSchema>

export const updateAccount = ({
  username,
  data,
}: {
  username: string
  data: UpdateAccountInput
}): Promise<User> =>
  api(`/accounts/${username}`, {
    method: 'PATCH',
    body: data,
  })

type UseUpdateAccountOptions = {
  mutationConfig?: MutationConfig<typeof updateAccount>
}

export const useUpdateAccount = ({
  mutationConfig = {},
}: UseUpdateAccountOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig

  return useMutation({
    mutationFn: updateAccount,
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      })
      onSuccess?.(data, variables, ...args)
    },
    ...restConfig,
  })
}
