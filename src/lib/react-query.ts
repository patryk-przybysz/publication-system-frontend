import {
  type DefaultOptions,
  QueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'

import type { FetchError } from 'ofetch'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: FetchError
  }
}

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})

export type QueryConfig<
  // biome-ignore lint/suspicious/noExplicitAny: any is used to make the type more flexible
  T extends (...args: any[]) => any,
> = Omit<ReturnType<T>, 'queryKey' | 'queryFn'>

export type ApiFnReturnType<
  // biome-ignore lint/suspicious/noExplicitAny: any is used to make the type more flexible
  FnType extends (...args: any) => Promise<any>,
> = Awaited<ReturnType<FnType>>

export type MutationConfig<
  // biome-ignore lint/suspicious/noExplicitAny: any is used to make the type more flexible
  MutationFnType extends (...args: any) => Promise<any>,
> = Omit<
  UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    Error,
    Parameters<MutationFnType>[0]
  >,
  'mutationFn'
>
