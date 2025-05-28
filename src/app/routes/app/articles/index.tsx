import { Button } from '@/components/ui/button'
import { getArticlesQueryOptions } from '@/features/articles/api/get-articles'
import { ArticlesList } from '@/features/articles/components/articles-list'
import { CreateArticleForm } from '@/features/articles/components/create-article-form'
import { Authorization } from '@/lib/authorization'
import { createFileRoute } from '@tanstack/react-router'
import { Lock } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/app/articles/')({
  component: ArticlesRoute,
  loaderDeps: ({ search: { page, size } }) => ({
    page,
    size,
  }),
  validateSearch: z.object({
    page: z.number().nonnegative().catch(0),
    size: z.number().nonnegative().catch(10),
  }),
  loader: async ({ context, deps: { page, size } }) =>
    context.queryClient.prefetchQuery(
      getArticlesQueryOptions({
        page,
        size,
      }),
    ),
})

function ArticlesRoute() {
  const { page, size } = Route.useSearch()

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Authorization
          policy="article:create"
          fallback={
            <Button
              variant="secondary"
              disabled
              className="opacity-50 cursor-not-allowed"
            >
              <Lock className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          }
        >
          <CreateArticleForm />
        </Authorization>
      </div>
      <ArticlesList page={page} size={size} />
    </div>
  )
}
