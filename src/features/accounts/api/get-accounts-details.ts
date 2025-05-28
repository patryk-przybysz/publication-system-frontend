import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { AccountPublicDetails } from '@/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

const getAccountsDetails = (): Promise<AccountPublicDetails[]> =>
  api('/accounts/details')

export const getAccountsDetailsQueryOptions = () => {
  return queryOptions({
    queryKey: ['accounts', 'details'],
    queryFn: () => getAccountsDetails(),
  })
}

type UseAccountsDetailsOptions = {
  queryConfig?: QueryConfig<typeof getAccountsDetailsQueryOptions>
}

export const useAccountsDetails = ({
  queryConfig,
}: UseAccountsDetailsOptions = {}) => {
  return useQuery({
    ...getAccountsDetailsQueryOptions(),
    ...queryConfig,
  })
}
