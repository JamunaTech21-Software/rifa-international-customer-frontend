import { cn } from '@/lib/cn'

// Centred site-width wrapper (1420px max) with responsive side padding.
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('container-site', className)} {...rest}>
      {children}
    </Tag>
  )
}
