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
import {
  createArticleInputSchema,
  useCreateArticle,
} from '@/features/articles/api/create-article'
import { formatFieldErrors } from '@/utils/field-error'
import { useForm, useStore } from '@tanstack/react-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { z } from 'zod'

type FormValues = z.input<typeof createArticleInputSchema>

export function CreateArticleForm() {
  const [open, setOpen] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      requiredAge: '',
      requiredAccountAge: '',
      timeUnit: 'DAY',
    },
    validators: {
      onSubmit: createArticleInputSchema,
    },
    onSubmit: ({ value }) => {
      const parsed = createArticleInputSchema.safeParse(value)
      if (!parsed.success) return
      createArticleMutation.mutate({ data: parsed.data })
    },
  })

  const createArticleMutation = useCreateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Article created successfully!')
        setOpen(false)
        form.reset()
      },
    },
  })

  const isDirty = useStore(form.store, (s) => s.isDirty)

  const resetForm = () => {
    form.reset()
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

          <form
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 space-y-6 px-4">
              <form.Field name="title">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter article title"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    {!field.state.meta.isValid ? (
                      <p className="text-sm text-destructive">
                        {formatFieldErrors(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field name="content">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter article content"
                      rows={12}
                      className="min-h-[300px] resize-none"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    {!field.state.meta.isValid ? (
                      <p className="text-sm text-destructive">
                        {formatFieldErrors(field.state.meta.errors)}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field name="requiredAge">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="requiredAge">
                        Required Age (optional)
                      </Label>
                      <Input
                        id="requiredAge"
                        type="number"
                        min="0"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., 18"
                        aria-invalid={!field.state.meta.isValid}
                      />
                      {!field.state.meta.isValid ? (
                        <p className="text-sm text-destructive">
                          {formatFieldErrors(field.state.meta.errors)}
                        </p>
                      ) : null}
                    </div>
                  )}
                </form.Field>

                <form.Field name="requiredAccountAge">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="requiredAccountAge">
                        Required Account Age (optional)
                      </Label>
                      <Input
                        id="requiredAccountAge"
                        type="number"
                        min="0"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., 30"
                        aria-invalid={!field.state.meta.isValid}
                      />
                      {!field.state.meta.isValid ? (
                        <p className="text-sm text-destructive">
                          {formatFieldErrors(field.state.meta.errors)}
                        </p>
                      ) : null}
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field name="timeUnit">
                {(field) => (
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="timeUnit">Time Unit for Account Age</Label>
                    <select
                      id="timeUnit"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as FormValues['timeUnit'],
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
                )}
              </form.Field>
            </div>

            <SheetFooter className="shrink-0 border-t pt-4 bg-background">
              <form.Subscribe selector={(state) => state.values}>
                {(values) => (
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
                        createArticleMutation.isPending ||
                        !values.title.trim() ||
                        !values.content.trim()
                      }
                      className="flex-1 h-11"
                    >
                      {createArticleMutation.isPending
                        ? 'Creating...'
                        : 'Create Article'}
                    </Button>
                  </div>
                )}
              </form.Subscribe>
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
