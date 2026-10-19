import { cn } from '@/lib/cn'
import Container from '@/components/ui/Container'

const backgrounds = {
  white: 'bg-white',
  surface: 'bg-surface',
  navy: 'bg-navy-900 text-white',
}

const spacings = {
  none: '',
  sm: 'py-8 lg:py-10',
  md: 'py-12 lg:py-16',
  lg: 'py-16 lg:py-24',
}

// Page section with background and vertical rhythm. Set contained={false} to skip the inner Container.
export default function Section({
  as: Tag = 'section',
  bg = 'white',
  spacing = 'md',
  contained = true,
  className,
  containerClassName,
  children,
  ...rest
}) {
  return (
    <Tag className={cn(backgrounds[bg], spacings[spacing], className)} {...rest}>
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </Tag>
  )
}
