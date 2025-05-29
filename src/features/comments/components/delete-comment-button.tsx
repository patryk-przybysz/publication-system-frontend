import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { Article, Comment } from '@/types/api'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteComment } from '../api/delete-comment'

interface DeleteCommentButtonProps {
  comment: Comment
  articleId: Article['id']
}

export function DeleteCommentButton({
  comment,
  articleId,
}: DeleteCommentButtonProps) {
  const deleteCommentMutation = useDeleteComment({
    articleId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('Comment deleted successfully!')
      },
    },
  })

  const handleDelete = () => {
    deleteCommentMutation.mutate({
      data: {
        commentId: comment.id,
        articleId,
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          disabled={deleteCommentMutation.isPending}
        >
          {deleteCommentMutation.isPending ? (
            <Spinner size="small" />
          ) : (
            <Trash2 className="h-3 w-3" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
