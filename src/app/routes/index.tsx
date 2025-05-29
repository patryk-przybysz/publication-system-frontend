import logo from '@/assets/logo.svg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { Separator } from '@/components/ui/separator'
import { getRoleColor } from '@/utils/user'
import { createFileRoute } from '@tanstack/react-router'
import { Edit, Globe, Settings, Shield, User } from 'lucide-react'

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
            User Permissions Matrix
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg border">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Permission</th>
                    <th className="text-center p-4 font-semibold">
                      <Badge variant="outline" className="w-fit">
                        <Globe className="h-3 w-3 mr-1" />
                        GUEST
                      </Badge>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Badge variant={getRoleColor('USER')} className="w-fit">
                        <User className="h-3 w-3 mr-1" />
                        USER
                      </Badge>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Badge variant={getRoleColor('EDITOR')} className="w-fit">
                        <Edit className="h-3 w-3 mr-1" />
                        EDITOR
                      </Badge>
                    </th>
                    <th className="text-center p-4 font-semibold">
                      <Badge variant={getRoleColor('ADMIN')} className="w-fit">
                        <Shield className="h-3 w-3 mr-1" />
                        ADMIN
                      </Badge>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-muted/20">
                    <td className="p-4 font-medium" colSpan={5}>
                      <strong>Articles</strong>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">List articles</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Read articles</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅*</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Create articles</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b bg-muted/20">
                    <td className="p-4 font-medium" colSpan={5}>
                      <strong>User Accounts</strong>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">List user accounts**</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Edit profile***</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b bg-muted/20">
                    <td className="p-4 font-medium" colSpan={5}>
                      <strong>Comments</strong>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">View comments</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Add comments</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 pl-8">Delete comments</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>*</strong> Subject to age and account age restrictions
              </p>
              <p>
                <strong>**</strong> Guest and User roles view usernames only;
                Editor and Admin roles view detailed profiles
              </p>
              <p>
                <strong>***</strong> User and Editor roles can edit own profile
                only; Admin role can edit any user profile
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
