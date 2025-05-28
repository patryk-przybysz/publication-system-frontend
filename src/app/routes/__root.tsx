import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { RouterContext } from '@/app/router'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <Outlet />

      <Toaster richColors />
      <TanStackRouterDevtools position="top-right" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </>
  )
}
