import { AuthorizationContext } from '@/lib/authorization'
import type { AuthorizationState } from '@/lib/authorization'
import type { User } from '@/types/api'
import { render as rtlRender } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

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

export function renderWithAuthContext(
  ui: ReactElement,
  authState: AuthState = {},
) {
  const value = createAuthState(authState)

  function Wrapper({ children }: { children: ReactNode }) {
    return <AuthorizationContext value={value}>{children}</AuthorizationContext>
  }

  return rtlRender(ui, { wrapper: Wrapper })
}
