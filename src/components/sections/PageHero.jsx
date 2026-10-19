import { Fragment } from 'react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Container from '@/components/ui/Container'
import MalaysiaFlag from '@/components/ui/MalaysiaFlag'
import { image, imagesWithBakedTagline } from '@/data/images'

const heights = {
  sm: 'lg:min-h-[16.5rem]',
  md: 'lg:min-h-[19rem]',
  lg: 'lg:min-h-[21rem]',
}

// Headline sizes measured from the reference designs at 1536px: About 68px, Contact / Recruitment 60–64px,
// Malaysia Jobs 53px (two long lines).
const titleSizes = {
  xl: 'text-[2.5rem] sm:text-5xl lg:text-[4.375rem]',
  lg: 'text-[2.5rem] sm:text-5xl lg:text-[4rem]',
  md: 'text-[2.25rem] sm:text-5xl lg:text-[3.375rem]',
}

// A title line is a string, a { text, highlight } segment, or an array of those (segments on one line).
function TitleLine({ line }) {
  const segments = Array.isArray(line) ? line : [line]
  return (
    <span className="block">
      {segments.map((segment, index) => {
        const { text, highlight } = typeof segment === 'string' ? { text: segment } : segment
        return (
          <Fragment key={index}>
            {highlight ? <span className="text-primary-600">{text}</span> : text}
          </Fragment>
        )
      })}
    </span>
  )
}

/**
 * Top-of-page banner. Light blue gradient on the left, photo on the right (fades into the gradient).
 * On mobile the photo sits below the text.
 *
 * breadcrumb — [{ label, to? }] or null.   title — array of lines (see TitleLine).
 * subtitle — bold line under the title.   text — paragraph (string or node).
 * imageKey — key from data/images.js.   script — handwritten tagline over the photo ("\n" = line break).
 * showFlag — Malaysian flag top-left.   size — sm | md | lg (banner height on desktop).
 * titleSize — "xl" (About), "lg" (default: Contact, Recruitment, Apply …) or "md" (Malaysia Jobs two-line title).
 * children — slot for buttons / badges under the text.
 */
export default function PageHero({
  breadcrumb = null,
  eyebrow,
  title,
  subtitle,
  text,
  imageKey,
  imageAlt = '',
  script,
  showFlag = false,
  size = 'md',
  titleSize = 'lg',
  className,
  children,
}) {
  // Some stand-in photos already contain their tagline — skip drawing it twice.
  const showScript = script && !imagesWithBakedTagline.has(imageKey)

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-linear-to-r from-surface-2 via-primary-50 to-white',
        className,
      )}
    >
      {showFlag && (
        <MalaysiaFlag className="absolute -top-4 -left-6 -z-10 hidden w-56 opacity-85 md:block lg:w-72" />
      )}

      <Container className={cn('flex flex-col lg:justify-center', heights[size])}>
        <div className="relative z-10 py-8 sm:py-10 lg:max-w-[48%] lg:py-5 xl:max-w-[46%]">
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6 lg:mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-base text-ink">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
                    {crumb.to ? (
                      <Link to={crumb.to} className="rounded-sm hover:text-primary-600">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {eyebrow && (
            <p className="mb-2 text-lg font-semibold tracking-wide text-eyebrow uppercase sm:text-xl">
              {eyebrow}
            </p>
          )}

          <h1
            className={cn('leading-[1.02] font-bold tracking-tight lg:leading-[1.0]', titleSizes[titleSize])}
          >
            {title.map((line, index) => (
              <TitleLine key={index} line={line} />
            ))}
          </h1>

          {subtitle && (
            <p className="mt-1.5 text-xl font-semibold text-ink sm:mt-2 sm:text-[1.5625rem]">{subtitle}</p>
          )}

          {text && (
            <div className="mt-2.5 max-w-[31.5rem] text-base leading-snug text-body sm:text-lg sm:leading-[1.3]">
              {text}
            </div>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>

        <div
          className={cn(
            'relative -mx-4 h-56 sm:-mx-6 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[56%]',
            '[mask-image:linear-gradient(to_bottom,transparent,black_30%)]',
            'lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]',
          )}
        >
          <CloudinaryImage
            publicId={image(imageKey)}
            alt={imageAlt}
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="size-full object-cover object-[center_30%]"
          />
          {showScript && (
            <p className="absolute top-4 right-4 font-script text-2xl leading-tight whitespace-pre-line text-white drop-shadow-md sm:right-8 sm:text-3xl lg:top-6 lg:right-[4%] lg:text-4xl">
              {script}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
