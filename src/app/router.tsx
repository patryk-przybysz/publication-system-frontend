import { type AuthorizationContext, useAuth } from '@/lib/authorization'
import { queryClient } from '@/lib/react-query'
import { routeTree } from '@/routeTree.gen'
import type { QueryClient } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { NotFound } from './not-found'

export type RouterContext = {
  queryClient: QueryClient
  auth: AuthorizationContext
}

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {} as AuthorizationContext,
  } satisfies RouterContext,
  defaultPreload: false,
  defaultNotFoundComponent: NotFound,
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

export function AppRouter() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
