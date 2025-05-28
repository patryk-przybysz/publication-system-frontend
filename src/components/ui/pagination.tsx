import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

type PaginationProps = {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange?: (page: number) => void
  className?: string
  previousLabel?: string
  nextLabel?: string
  renderPreviousButton?: (props: {
    disabled: boolean
    onClick: () => void
    label: string
  }) => ReactNode
  renderNextButton?: (props: {
    disabled: boolean
    onClick: () => void
    label: string
  }) => ReactNode
}

export function Pagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  className = '',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  renderPreviousButton,
  renderNextButton,
}: PaginationProps) {
  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange?.(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange?.(currentPage + 1)
    }
  }

  const previousButtonProps = {
    disabled: !hasPreviousPage,
    onClick: handlePrevious,
    label: previousLabel,
  }

  const nextButtonProps = {
    disabled: !hasNextPage,
    onClick: handleNext,
    label: nextLabel,
  }

  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {renderPreviousButton ? (
        renderPreviousButton(previousButtonProps)
      ) : (
        <Button
          variant="outline"
          disabled={!hasPreviousPage}
          onClick={handlePrevious}
          className="min-w-[100px] hover:bg-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-muted"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {previousLabel}
        </Button>
      )}

      {renderNextButton ? (
        renderNextButton(nextButtonProps)
      ) : (
        <Button
          variant="outline"
          disabled={!hasNextPage}
          onClick={handleNext}
          className="min-w-[100px] hover:bg-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50 disabled:text-muted-foreground disabled:border-muted-foreground/30"
          aria-label="Go to next page"
        >
          {nextLabel}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  )
}
