import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'
import type { LinkComponentProps } from '@tanstack/react-router'
import { type VariantProps, cva } from 'class-variance-authority'

const logoVariants = cva(
  'flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const iconVariants = cva(
  'flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base',
        xl: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface AppLogoProps extends VariantProps<typeof logoVariants> {
  /** Custom text to display next to the logo icon */
  text?: string
  /** Custom initials/abbreviation for the logo icon */
  initials?: string
  /** Link destination - if not provided, component renders as div instead of Link */
  to?: LinkComponentProps['to']
  /** Additional CSS classes */
  className?: string
  /** Additional CSS classes for the icon */
  iconClassName?: string
  /** Additional CSS classes for the text */
  textClassName?: string
}

export function AppLogo({
  text = 'Publication System',
  initials = 'PS',
  to = '/app',
  size,
  className,
  iconClassName,
  textClassName,
}: AppLogoProps) {
  const content = (
    <>
      <div className={cn(iconVariants({ size }), iconClassName)}>
        {initials}
      </div>
      <span className={cn(textClassName)}>{text}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cn(logoVariants({ size }), className)}>
        {content}
      </Link>
    )
  }

  return <div className={cn(logoVariants({ size }), className)}>{content}</div>
}
