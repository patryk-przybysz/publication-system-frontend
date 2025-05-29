import type { User } from '@/types/api'
import {
  type UseMutationOptions,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { FetchError } from 'ofetch'
import { useEffect, useState } from 'react'
import { api } from './api-client'
import type { MutationConfig, QueryConfig } from './react-query'

const AUTH_STORAGE_KEY = 'user-credentials'

export const authStorage = {
  get: () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },
  set: (credentials: AuthCredentials): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials))
  },
  remove: () => localStorage.removeItem(AUTH_STORAGE_KEY),
  getAuthHeader: (): string | null => {
    const credentials = authStorage.get()
    if (!credentials) return null

    const encoded = btoa(`${credentials.username}:${credentials.password}`)
    return `Basic ${encoded}`
  },
}

const userKey = ['authenticated-user'] as const

type AuthCredentials = {
  username: string
  password: string
}

type RegisterCredentials = {
  username: string
  password: string
  birth: string
}

async function loginFn({ username, password }: AuthCredentials) {
  authStorage.set({ username, password })
  return getCurrentUser()
}

async function registerFn(credentials: RegisterCredentials) {
  await api('/auth/register', {
    method: 'POST',
    body: credentials,
  })

  authStorage.set({
    username: credentials.username,
    password: credentials.password,
  })

  // Register returns empty 200, we need to fetch user data
  return getCurrentUser()
}

async function getCurrentUser(): Promise<User | null> {
  // Check if we have stored credentials before making the request
  if (!authStorage.get()) {
    return null
  }

  try {
    const user = await api<User>('/auth/check')
    return user
  } catch (error) {
    // If we get 401, clear stored credentials
    if (error instanceof FetchError && error.status === 401) {
      authStorage.remove()
    }
    return null
  }
}

async function logoutFn() {
  authStorage.remove()
}

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: userKey,
    queryFn: getCurrentUser,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  })

export function useUser(options?: QueryConfig<typeof getUserQueryOptions>) {
  return useQuery({
    ...getUserQueryOptions(),
    ...options,
  })
}

export function useLogin(options?: MutationConfig<typeof loginFn>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginFn,
    ...options,
    onSettled: (...rest) => {
      queryClient.invalidateQueries()
      options?.onSettled?.(...rest)
    },
    onError: (...rest) => {
      authStorage.remove()
      options?.onError?.(...rest)
    },
  })
}

export function useRegister(options?: MutationConfig<typeof registerFn>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerFn,
    ...options,
    onSuccess: (data, ...rest) => {
      queryClient.invalidateQueries()
      options?.onSuccess?.(data, ...rest)
    },
    onError: (error, ...rest) => {
      authStorage.remove()
      options?.onError?.(error, ...rest)
    },
  })
}

export function useLogout(
  options?: Omit<UseMutationOptions<void, Error, void>, 'mutationFn'>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutFn,
    ...options,
    onSuccess: (...rest) => {
      queryClient.setQueryData(userKey, null)

      queryClient.invalidateQueries()

      options?.onSuccess?.(...rest)
    },
  })
}

export const useHasStoredAuth = () => {
  const [hasAuth, setHasAuth] = useState(() => !!authStorage.get())

  useEffect(() => {
    const checkAuth = () => setHasAuth(!!authStorage.get())

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  return hasAuth
}
