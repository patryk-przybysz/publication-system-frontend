import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { AccountSummary } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

const getAccounts = (): Promise<AccountSummary[]> => api('/accounts')

export const getAccountsQueryOptions = () =>
  queryOptions({
    queryKey: ['accounts'],
    queryFn: () => getAccounts(),
  })

type UseAccountsOptions = {
  queryConfig?: QueryConfig<typeof getAccountsQueryOptions>
}

export const useAccounts = ({ queryConfig }: UseAccountsOptions = {}) =>
  useQuery({
    ...getAccountsQueryOptions(),
    ...queryConfig,
  })
