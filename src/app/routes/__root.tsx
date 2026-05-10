import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { RouterContext } from '@/app/router'
import { RootErrorBoundary } from '@/components/errors'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  errorComponent: RootErrorBoundary,
  head: () => ({
    meta: [
      {
        title: 'Home | Publication System',
      },
    ],
  }),
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Outlet />

      <Toaster richColors />
      <TanStackRouterDevtools position="top-right" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </>
  )
}
