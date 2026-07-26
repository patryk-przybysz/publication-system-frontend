import { AuthorizationContext } from '@/lib/authorization'
import type { AuthorizationState } from '@/lib/authorization'
import type { User } from '@/types/api'
import type { ReactElement, ReactNode } from 'react'
import { render } from 'vitest-browser-react'

type AuthState = {
  user?: User | null
  isLoading?: boolean
}

function createAuthState({
  user = null,
  isLoading = false,
}: AuthState): AuthorizationState {
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  }
}

export async function renderWithAuthContext(
  ui: ReactElement,
  authState: AuthState = {},
) {
  const value = createAuthState(authState)

  function Wrapper({ children }: { children: ReactNode }) {
    return <AuthorizationContext value={value}>{children}</AuthorizationContext>
  }

  return render(ui, { wrapper: Wrapper })
}
