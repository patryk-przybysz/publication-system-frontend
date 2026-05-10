import { WithLoading } from '@/components/ui/with-loading'
import { getArticleQueryOptions } from '@/features/articles/api/get-article'
import { ArticleView } from '@/features/articles/components/article-view'
import { useAuth } from '@/lib/authorization'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/articles/$articleId')({
  component: ArticleRoute,
  loader: async ({ context, params }) => {
    const options = getArticleQueryOptions(params.articleId)
    await context.queryClient.prefetchQuery(options)
    return context.queryClient.getQueryData(options.queryKey)
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} | Publication System`
          : 'Article | Publication System',
      },
    ],
  }),
})

function ArticleRoute() {
  const { articleId } = Route.useParams()

  const { isLoading } = useAuth()

  return (
    <WithLoading isLoading={isLoading}>
      <ArticleView articleId={articleId} />
    </WithLoading>
  )
}
