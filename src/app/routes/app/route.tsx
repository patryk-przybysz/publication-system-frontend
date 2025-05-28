import { AppLogo } from '@/components/ui/app-logo'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AuthDialog } from '@/features/auth/components/auth-dialog'
import { LogoutButton } from '@/features/auth/components/logout-button'
import { useAuth, useAuthenticatedUser } from '@/lib/authorization'
import { cn } from '@/utils/cn'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function Sidebar() {
  const { isAuthenticated } = useAuth()

  return (
    <aside className="w-64 border-r bg-background sticky top-0 h-screen">
      <div className="flex h-16 items-center border-b px-6">
        <AppLogo />
      </div>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6">
            <SidebarNavigation />
          </div>
        </ScrollArea>
        <div className="border-t bg-muted/30 p-4">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground">Welcome back!</p>
              </div>
              <AuthenticatedUserInfo />
              <LogoutButton />
            </div>
          ) : (
            <div className="space-y-4">
              <UnauthenticatedWelcomeCard />
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

const sidebarNavItems = [
  {
    title: 'Articles',
    href: '/app/articles',
    icon: '📝',
  },
  {
    title: 'Users',
    href: '/app/accounts',
    icon: '👥',
  },
  {
    title: 'Profile',
    href: '/app/profile',
    icon: '🧑🏻',
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: '⚙️',
  },
] as const

function SidebarNavigation() {
  return (
    <nav className="flex flex-col gap-1">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
            'text-muted-foreground hover:text-foreground',
            'hover:bg-accent/50 hover:shadow-sm',
            'focus:bg-accent focus:text-accent-foreground focus:outline-none',
            'border border-transparent hover:border-border/50',
            'active:scale-[0.98]',
          )}
          activeProps={{
            className: 'bg-primary/10 text-primary border-primary/20 shadow-sm',
          }}
        >
          <span className="text-base">{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
function AuthButtons() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => setShowAuthDialog(true)}>
          Sign In
        </Button>
      </div>
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  )
}

function UnauthenticatedWelcomeCard() {
  return (
    <div className="text-center rounded-lg bg-background p-4 shadow-sm border-2 border-dashed border-muted-foreground/20">
      <div className="mb-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
          🔐
        </div>
        <p className="text-sm font-medium mb-1">Welcome!</p>
        <p className="text-xs text-muted-foreground">
          Sign in to access all features
        </p>
      </div>
      <div className="flex flex-col items-center">
        <AuthButtons />
      </div>
    </div>
  )
}

function AuthenticatedUserInfo() {
  const { user } = useAuthenticatedUser()
  return (
    <div className="flex items-center gap-3 rounded-lg bg-background p-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.username}</p>
        <p className="text-xs text-muted-foreground">
          Role: {user.role} • {user.verified ? '✓ Verified' : '⚠ Unverified'}
        </p>
      </div>
    </div>
  )
}
