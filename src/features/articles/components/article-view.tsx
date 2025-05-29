import { ErrorComponent } from '@/components/errors'
import { UnauthorizedError } from '@/components/errors/unauthorized'
import { Link } from '@/components/ui/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { CreateCommentForm } from '@/features/comments/components/create-comment-form'
import { DeleteCommentButton } from '@/features/comments/components/delete-comment-button'
import { useUser } from '@/lib/auth'
import { Authorization } from '@/lib/authorization'
import type { Article, Comment } from '@/types/api'
import { formatContentDate } from '@/utils/date'
import { matchQueryStatus } from '@/utils/match-query'
import { FileWarning, Lock, MessageCircle } from 'lucide-react'
import { FetchError } from 'ofetch'
import { useArticle } from '../api/get-article'

export function ArticleView({ articleId }: { articleId: string }) {
  const articleQuery = useArticle({
    articleId,
  })

  return matchQueryStatus(articleQuery, {
    error: (e) => {
      if (e instanceof FetchError && e.status === 500)
        return <ArticleNotFound />
      return <UnauthorizedError />
    },
    success: (article) => (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="text-sm text-muted-foreground">
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <span>{formatContentDate(article.createdAt)}</span>
          </div>
        </div>

        <div className="prose max-w-none">{article.content}</div>

        <Separator className="my-8" />

        <ArticleComments articleId={articleId} comments={article.comments} />
      </div>
    ),
  })
}

function ArticleComments({
  articleId,
  comments,
}: { articleId: Article['id']; comments: Comment[] }) {
  const { data: currentUser } = useUser()

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Comments</h3>

      <div className="space-y-6">
        <Authorization
          policy={'comment:create'}
          fallback={
            <div className="text-center py-6 border rounded-lg bg-muted/20">
              <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                You are not allowed to comment on this article
              </p>
            </div>
          }
        >
          <div className="border rounded-lg p-6 bg-card">
            <CreateCommentForm articleId={articleId} />
          </div>
        </Authorization>

        {comments.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No comments yet</p>
            <p className="text-sm text-muted-foreground/70">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="border rounded-lg bg-card">
            <div className="p-6">
              <h4 className="font-medium mb-4">
                {comments.length} comment
                {comments.length !== 1 ? 's' : ''}
              </h4>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {comments.map((comment, index) => {
                    const isCurrentUser =
                      currentUser?.username === comment.author

                    return (
                      <div key={comment.id}>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                isCurrentUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-primary/10'
                              }`}
                            >
                              <span
                                className={`text-sm font-medium ${
                                  isCurrentUser
                                    ? 'text-primary-foreground'
                                    : 'text-primary'
                                }`}
                              >
                                {comment.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm flex-1">
                              <span className="font-medium">
                                {comment.author}
                              </span>
                              {isCurrentUser && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                  You
                                </span>
                              )}
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                {formatContentDate(comment.createdAt)}
                              </span>
                            </div>
                            <Authorization
                              policy="comment:delete"
                              fallback={null}
                            >
                              <DeleteCommentButton
                                comment={comment}
                                articleId={articleId}
                              />
                            </Authorization>
                          </div>
                          <div className="ml-11">
                            <p className="text-sm leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                        {index < comments.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ArticleNotFound() {
  return (
    <ErrorComponent
      icon={<FileWarning className="h-8 w-8 text-destructive" />}
      title="Article Not Found"
      description="This article doesn't exist or may have been removed by the author."
    >
      <Link
        to="/app/articles"
        replace
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Browse Articles
      </Link>
    </ErrorComponent>
  )
}
