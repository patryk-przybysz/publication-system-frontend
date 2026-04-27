import type { User } from '@/types/api'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { FetchError } from 'ofetch'
import { useEffect, useState } from 'react'
import { z } from 'zod'
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

export const loginInputSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const registerInputSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  birth: z.string().min(1, 'Birth date is required'),
})

type AuthCredentials = z.infer<typeof loginInputSchema>

type RegisterCredentials = z.infer<typeof registerInputSchema>

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

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof loginFn>
}

export function useLogin({ mutationConfig = {} }: UseLoginOptions = {}) {
  const queryClient = useQueryClient()
  const { onSettled, onError, ...restConfig } = mutationConfig

  return useMutation({
    mutationFn: loginFn,
    onSettled: (...args) => {
      queryClient.invalidateQueries()
      onSettled?.(...args)
    },
    onError: (...args) => {
      authStorage.remove()
      onError?.(...args)
    },
    ...restConfig,
  })
}

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof registerFn>
}

export function useRegister({ mutationConfig = {} }: UseRegisterOptions = {}) {
  const queryClient = useQueryClient()
  const { onSuccess, onError, ...restConfig } = mutationConfig

  return useMutation({
    mutationFn: registerFn,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries()
      onSuccess?.(data, ...args)
    },
    onError: (error, ...args) => {
      authStorage.remove()
      onError?.(error, ...args)
    },
    ...restConfig,
  })
}

type UseLogoutOptions = {
  mutationConfig?: MutationConfig<typeof logoutFn>
}

export function useLogout({ mutationConfig = {} }: UseLogoutOptions = {}) {
  const queryClient = useQueryClient()
  const { onSuccess, ...restConfig } = mutationConfig

  return useMutation({
    mutationFn: logoutFn,
    onSuccess: (...args) => {
      queryClient.setQueryData(userKey, null)
      queryClient.invalidateQueries()
      onSuccess?.(...args)
    },
    ...restConfig,
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
