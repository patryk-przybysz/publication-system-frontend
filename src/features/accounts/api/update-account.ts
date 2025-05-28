import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { User } from '@/types/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

export const updateAccountInputSchema = z.object({
  birth: z.string(),
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
  mutationConfig,
}: UseUpdateAccountOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    mutationFn: updateAccount,
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries()
      toast.success('Birth date updated successfully')
      onSuccess?.(data, variables, ...args)
    },
    ...restConfig,
  })
}
