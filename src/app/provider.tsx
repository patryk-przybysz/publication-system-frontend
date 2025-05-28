import { ThemeProvider } from '@/components/theme-provider'
import { AuthorizationProvider } from '@/lib/authorization'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthorizationProvider>{children}</AuthorizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
