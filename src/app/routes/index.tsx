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
  MessageCircle,
  Plus,
  Settings,
  Shield,
  User,
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
            A comprehensive platform for managing and publishing articles with{' '}
            <span className="whitespace-nowrap">role-based</span> access control
            and age restrictions.
          </p>

          <Link to="/app" preload={false}>
            <Button size="lg" className="text-lg px-8 py-3">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            About the Platform
          </h2>
          <div className="max-w-4xl mx-auto text-muted-foreground leading-relaxed space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                🎓 Academic Project Overview
              </h3>
              <p>
                This Publication System was designed and implemented as part of
                an academic initiative at{' '}
                <strong className="text-foreground">
                  Gdańsk University of Technology
                </strong>
                , within the course <em>"Introduction to Cybersecurity"</em>. It
                serves as a realistic implementation of a digital publishing
                platform that demonstrates real-world applications of access
                control models.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Models
                </h3>
                <p className="mb-3">
                  The platform showcases both{' '}
                  <strong>Role-Based Access Control (RBAC)</strong> and{' '}
                  <strong>Attribute-Based Access Control (ABAC)</strong> in
                  practice, providing different levels of access based on user
                  roles and attributes.
                </p>
                <ul className="text-sm space-y-1 [&>li]:before:content-['•'] [&>li]:before:mr-2 [&>li]:before:text-primary">
                  <li>
                    Role-based permissions for users, editors, and
                    administrators
                  </li>
                  <li>Age-based content restrictions</li>
                  <li>Content management controls</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Platform Features
                </h3>
                <p className="mb-3">
                  A digital publishing platform that handles user registration,
                  article submission, and content management with access
                  controls.
                </p>
                <ul className="text-sm space-y-1 [&>li]:before:content-['•'] [&>li]:before:mr-2 [&>li]:before:text-primary">
                  <li>Article creation and management</li>
                  <li>User authentication and authorization</li>
                  <li>Comment system</li>
                  <li>Administrative controls</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Technical Implementation
              </h3>
              <p className="mb-3">
                Built with web technologies, the system demonstrates
                enterprise-level security practices and clean architecture
                patterns.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Frontend Technologies:
                  </h4>
                  <ul className="space-y-1 [&>li]:before:content-['•'] [&>li]:before:mr-2 [&>li]:before:text-primary">
                    <li>React 19 with TypeScript</li>
                    <li>TanStack Router & Query</li>
                    <li>Tailwind CSS & Radix UI</li>
                    <li>Vite</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Backend Technologies:
                  </h4>
                  <ul className="space-y-1 [&>li]:before:content-['•'] [&>li]:before:mr-2 [&>li]:before:text-primary">
                    <li>Java 24 with Spring Boot 3</li>
                    <li>Spring Security 6</li>
                    <li>Spring Data JPA 3</li>
                    <li>H2 & Maven</li>
                  </ul>
                </div>
              </div>
            </div>
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
                      List articles
                    </li>
                    <li className="flex items-center gap-2">
                      <UserCheck className="h-3 w-3" />
                      View users list
                    </li>
                    <li className="flex items-center gap-2">
                      <Plus className="h-3 w-3" />
                      Register new account
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground ">
                    No login required. Cannot view individual article details or
                    user profiles.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={getRoleColor('USER')} className="w-fit">
                    <User className="h-3 w-3 mr-1" />
                    USER
                  </Badge>
                </CardTitle>
                <CardDescription>Authenticated user access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    Additional permissions:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      View individual article content*
                    </li>
                    <li className="flex items-center gap-2">
                      <UserCheck className="h-3 w-3" />
                      List user accounts
                    </li>
                    <li className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit own profile
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    *Article access subject to age restrictions and content
                    policies. Profile views show basic info (usernames) only.
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
                      <Eye className="h-3 w-3" />
                      View all articles
                    </li>
                    <li className="flex items-center gap-2">
                      <Plus className="h-3 w-3" />
                      Create new articles
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageCircle className="h-3 w-3" />
                      Add comments
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Can create and access all content regardless of age
                    restrictions.
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
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="space-y-2 flex-1">
                  <h4 className="font-medium text-sm">
                    All Editor permissions plus:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Edit className="h-3 w-3" />
                      Edit any user profile
                    </li>
                    <li className="flex items-center gap-2 line-through opacity-50">
                      <MessageCircle className="h-3 w-3" />
                      Add comments
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Administrative control over users and content, access to
                    restricted content.
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
