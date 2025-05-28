import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/ui/pagination'
import { Spinner } from '@/components/ui/spinner'
import { useArticles } from '@/features/articles/api/get-articles'
import { formatContentDate } from '@/utils/date'
import { matchQueryStatus } from '@/utils/match-query'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'

type ArticlesListProps = {
  page: number
  size: number
}

export function ArticlesList({ page, size }: ArticlesListProps) {
  const articlesQuery = useArticles({
    page,
    size,
  })

  return matchQueryStatus(articlesQuery, {
    loading: () => <Spinner size="large" />,
    empty: () => (
      <EmptyState
        icon={FileText}
        title="No articles found"
        description="There are no articles available at the moment. Check back later for new content."
      />
    ),
    success: (articles) => (
      <div className="space-y-8">
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col gap-2">
              <CardHeader>
                <CardTitle className="text-xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between min-h-[2rem]">
                  <p className="text-sm text-muted-foreground">
                    By {article.author}
                    <span className="mx-2">•</span>
                    {formatContentDate(article.createdAt)}
                  </p>
                  <Button asChild size="sm" className="h-8 px-3 text-xs">
                    <Link
                      to="/app/articles/$articleId"
                      params={{ articleId: article.id }}
                    >
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination
          currentPage={page}
          hasNextPage={articles.length >= size}
          hasPreviousPage={page > 0}
          renderPreviousButton={({ disabled, label }) => (
            <Button
              variant="outline"
              asChild
              disabled={disabled}
              className="min-w-[100px] hover:bg-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-muted"
              aria-label="Go to previous page"
            >
              <Link
                to="/app/articles"
                search={(prev) => ({
                  ...prev,
                  page: page - 1,
                })}
                className="flex items-center justify-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                {label}
              </Link>
            </Button>
          )}
          renderNextButton={({ disabled, label }) => (
            <Button
              variant="outline"
              asChild
              disabled={disabled}
              className="min-w-[100px] hover:bg-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50 disabled:text-muted-foreground disabled:border-muted-foreground/30"
              aria-label="Go to next page"
            >
              <Link
                to="/app/articles"
                search={(prev) => ({
                  ...prev,
                  page: page + 1,
                })}
                className="flex items-center justify-center gap-2"
              >
                {label}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        />
      </div>
    ),
  })
}
