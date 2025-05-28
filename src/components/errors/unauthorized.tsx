import { AuthDialog } from '@/features/auth/components/auth-dialog'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { ErrorComponent } from '.'
import { Button } from '../ui/button'

export function UnauthorizedError() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  return (
    <ErrorComponent
      title="Unauthorized"
      description="You are not authorized to access this page."
    >
      <div className="space-y-3">
        <Button
          onClick={() => setAuthDialogOpen(true)}
          className="w-full"
          size="lg"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </div>
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultMode="login"
      />
    </ErrorComponent>
  )
}
