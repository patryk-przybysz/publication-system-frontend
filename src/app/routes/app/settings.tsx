import { ModeToggle } from '@/components/ui/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/settings')({
  component: SettingsRoute,
})

function SettingsRoute() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
