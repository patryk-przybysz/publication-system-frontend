import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogout, useUser } from '@/lib/auth'
import { useRouter } from '@tanstack/react-router'

export function UserMenu() {
  const { data: user, isSuccess: isAuthenticated } = useUser()
  const logout = useLogout({
    onSuccess: () => {
      router.navigate({ to: '/' })
    },
  })

  const router = useRouter()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          👤 {user.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.username}</span>
            <span className="text-muted-foreground">
              {user.role} • {user.subscriptionLevel}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout.mutate()}
          className="text-red-600"
        >
          🔓 Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
