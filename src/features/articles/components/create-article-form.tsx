import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useCreateArticle } from '@/features/articles/api/create-article'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function CreateArticleForm() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [requiredAge, setRequiredAge] = useState('')
  const [requiredAccountAge, setRequiredAccountAge] = useState('')
  const [timeUnit, setTimeUnit] = useState<
    'NULL' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
  >('DAY')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Track if form is dirty
  useEffect(() => {
    const hasContent = Boolean(
      title.trim() ||
        content.trim() ||
        requiredAge ||
        requiredAccountAge ||
        timeUnit !== 'DAY',
    )
    setIsDirty(hasContent)
  }, [title, content, requiredAge, requiredAccountAge, timeUnit])

  const resetForm = () => {
    setTitle('')
    setContent('')
    setRequiredAge('')
    setRequiredAccountAge('')
    setTimeUnit('DAY')
    setIsDirty(false)
  }

  const handleClose = () => {
    if (isDirty) {
      setShowConfirmDialog(true)
    } else {
      setOpen(false)
    }
  }

  const confirmClose = () => {
    setShowConfirmDialog(false)
    setOpen(false)
    resetForm()
  }

  const cancelClose = () => {
    setShowConfirmDialog(false)
  }

  const createArticleMutation = useCreateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Article created successfully!')
        setOpen(false)
        resetForm()
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required')
      return
    }

    const ageValue = requiredAge ? Number(requiredAge) : 0
    const accountAgeValue = requiredAccountAge ? Number(requiredAccountAge) : 0

    if (requiredAge && (Number.isNaN(ageValue) || ageValue < 0)) {
      toast.error('Required age must be a valid number')
      return
    }

    if (
      requiredAccountAge &&
      (Number.isNaN(accountAgeValue) || accountAgeValue < 0)
    ) {
      toast.error('Required account age must be a valid number')
      return
    }

    createArticleMutation.mutate({
      data: {
        title: title.trim(),
        content: content.trim(),
        requiredAge: ageValue,
        requiredAccountAge: accountAgeValue,
        timeUnit,
      },
    })
  }

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose()
          } else {
            setOpen(true)
          }
        }}
      >
        <SheetTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create New Article</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 space-y-6 px-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter article content"
                  rows={12}
                  required
                  className="min-h-[300px] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requiredAge">Required Age (optional)</Label>
                  <Input
                    id="requiredAge"
                    type="number"
                    min="0"
                    value={requiredAge}
                    onChange={(e) => setRequiredAge(e.target.value)}
                    placeholder="e.g., 18"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requiredAccountAge">
                    Required Account Age (optional)
                  </Label>
                  <Input
                    id="requiredAccountAge"
                    type="number"
                    min="0"
                    value={requiredAccountAge}
                    onChange={(e) => setRequiredAccountAge(e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="timeUnit">Time Unit for Account Age</Label>
                <select
                  id="timeUnit"
                  value={timeUnit}
                  onChange={(e) =>
                    setTimeUnit(
                      e.target.value as
                        | 'NULL'
                        | 'HOUR'
                        | 'DAY'
                        | 'WEEK'
                        | 'MONTH'
                        | 'YEAR',
                    )
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="HOUR">Hours</option>
                  <option value="DAY">Days</option>
                  <option value="WEEK">Weeks</option>
                  <option value="MONTH">Months</option>
                  <option value="YEAR">Years</option>
                </select>
              </div>
            </div>

            <SheetFooter className="flex-shrink-0 border-t pt-4 bg-background">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createArticleMutation.isPending || !title || !content
                  }
                  className="flex-1 h-11"
                >
                  {createArticleMutation.isPending
                    ? 'Creating...'
                    : 'Create Article'}
                </Button>
              </div>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to close the form?
              All changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelClose}>
              Keep Editing
            </Button>
            <Button variant="destructive" onClick={confirmClose}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
