import { cn } from '@/lib/cn'

const titleSizes = {
  lg: 'text-3xl sm:text-4xl lg:text-section', // "Explore Job Opportunities"
  md: 'text-2xl sm:text-[1.75rem]', // "Company Overview", "Job Categories in Malaysia"
  sm: 'text-xl sm:text-2xl', // card-level headings: "Our Location", "Need Help?"
}

/**
 * eyebrow — small uppercase line above the title.
 * title + highlight — the highlight text (must appear inside title) is coloured primary.
 * underline — short primary bar under the title (About / Apply style).
 */
export default function SectionHeading({
  as: Tag = 'h2',
  id,
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'left',
  size = 'lg',
  underline = false,
  inverted = false,
  className,
}) {
  const centered = align === 'center'

  let titleContent = title
  if (highlight && typeof title === 'string' && title.includes(highlight)) {
    const [before, ...after] = title.split(highlight)
    titleContent = (
      <>
        {before}
        <span className={inverted ? 'text-primary-300' : 'text-primary-600'}>{highlight}</span>
        {after.join(highlight)}
      </>
    )
  }

  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-2 text-[0.8125rem] font-semibold tracking-[0.11em] uppercase',
            inverted ? 'text-white/70' : 'text-muted',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn(titleSizes[size], 'leading-tight font-bold', inverted && 'text-white')}>
        {titleContent}
      </Tag>
      {underline && (
        <span
          aria-hidden="true"
          className={cn('mt-3 block h-[3px] w-10 rounded-full bg-primary-600', centered && 'mx-auto')}
        />
      )}
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-base sm:text-lg',
            inverted ? 'text-white/80' : 'text-body',
            centered && 'mx-auto max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
