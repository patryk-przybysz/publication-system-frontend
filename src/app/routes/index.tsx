import logo from '@/assets/logo.svg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/components/ui/link'
import { Separator } from '@/components/ui/separator'
import { getRoleColor } from '@/utils/user'
import { createFileRoute } from '@tanstack/react-router'
import {
  Edit,
  Eye,
  Globe,
  Plus,
  Settings,
  Shield,
  Trash2,
  UserCheck,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomeRoute,
})

function HomeRoute() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={logo}
              className="mx-auto h-24 w-24"
              alt="Publication System Logo"
            />
          </div>
          <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl">
            Publication System
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for managing and publishing articles with
            role-based access control, age restrictions, and collaborative
            features.
          </p>

          <Link to="/app">
            <Button size="lg" className="text-lg px-8 py-3">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Platform Overview
          </h2>
          <div className="max-w-4xl mx-auto text-muted-foreground leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </p>
          </div>
        </section>

        <Separator />

        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            User Roles & Permissions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline" className="w-fit">
                    <Globe className="h-3 w-3 mr-1" />
                    GUEST
                  </Badge>
                </CardTitle>
                <CardDescription>Anonymous visitor access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Permissions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      Browse public content
                    </li>
                    <li className="text-muted-foreground/70">
                      • View platform overview
                    </li>
                    <li className="text-muted-foreground/70">
                      • Access documentation
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    No account required. Limited to public content only.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={getRoleColor('USER')} className="w-fit">
                    <UserCheck className="h-3 w-3 mr-1" />
                    USER
                  </Badge>
                </CardTitle>
                <CardDescription>Basic platform access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Permissions:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      View own articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit own articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Trash2 className="h-3 w-3" />
                      Delete own articles
                    </li>
                    <li className="text-muted-foreground/70">
                      • Comment on accessible articles
                    </li>
                    <li className="text-muted-foreground/70">
                      • View profile and settings
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Cannot create new articles. Access limited to
                    age-appropriate content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={getRoleColor('EDITOR')} className="w-fit">
                    <Edit className="h-3 w-3 mr-1" />
                    EDITOR
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Content creation and management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    All User permissions plus:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Plus className="h-3 w-3" />
                      Create new articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      View all articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit any article
                    </li>
                    <li className="text-muted-foreground/70">
                      • Set age restrictions on content
                    </li>
                    <li className="text-muted-foreground/70">
                      • Manage article requirements
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Primary content creators with enhanced access to platform
                    features.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={getRoleColor('ADMIN')} className="w-fit">
                    <Shield className="h-3 w-3 mr-1" />
                    ADMIN
                  </Badge>
                </CardTitle>
                <CardDescription>Full platform administration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    All Editor permissions plus:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Trash2 className="h-3 w-3" />
                      Delete any article
                    </li>
                    <li className="flex items-center gap-2">
                      <Settings className="h-3 w-3" />
                      Platform administration
                    </li>
                    <li className="text-muted-foreground/70">
                      • User management
                    </li>
                    <li className="text-muted-foreground/70">
                      • Content moderation
                    </li>
                    <li className="text-muted-foreground/70">
                      • System configuration
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Complete control over platform operations and user
                    management.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
