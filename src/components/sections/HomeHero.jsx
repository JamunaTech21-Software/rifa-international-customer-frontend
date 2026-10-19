import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import Container from '@/components/ui/Container'
import MalaysiaFlag from '@/components/ui/MalaysiaFlag'
import { image, imagesWithBakedTagline } from '@/data/images'

const IMAGE_KEY = 'hero.home'

/**
 * Home page hero — taller than PageHero (about 440px), with the flag, an eyebrow line, two buttons and the
 * "New Opportunities Brighter Future" tagline. The TrustStrip below overlaps its bottom edge.
 * On desktop the photo is positioned against the full-width section, so it runs to the right screen edge.
 */
export default function HomeHero({ className }) {
  const showScript = !imagesWithBakedTagline.has(IMAGE_KEY)

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-linear-to-r from-surface-2 via-primary-50 to-white',
        className,
      )}
    >
      <MalaysiaFlag className="absolute -top-4 -left-6 -z-10 hidden w-56 opacity-85 md:block lg:w-72" />

      <Container className="flex flex-col lg:min-h-[27.5rem]">
        <div className="relative z-10 py-8 sm:py-12 lg:max-w-[50%] lg:pt-[5.5rem] lg:pb-16 lg:pl-[4.5rem] xl:max-w-[47%]">
          <p className="mb-3 text-sm font-medium tracking-[0.1em] text-eyebrow uppercase sm:text-[0.9375rem]">
            Your trusted partner for a better tomorrow
          </p>

          <h1 className="text-[2.5rem] leading-[1.02] font-bold tracking-tight sm:text-5xl lg:text-[3.625rem] lg:leading-[0.96]">
            <span className="block">Build Your Career in</span>
            <span className="block text-primary-600">Malaysia</span>
          </h1>

          <p className="mt-4 max-w-[28.5rem] text-base leading-snug font-medium text-body sm:text-[1.125rem] sm:leading-[1.25]">
            <strong className="font-semibold text-ink">Rifa International</strong> (RL-693) is a government
            approved recruiting agency helping Bangladeshi workers to build a brighter future in Malaysia and
            other countries.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 lg:mt-5">
            <Button to="/malaysia-jobs" iconRight>
              Find Job Opportunities
            </Button>
            <Button to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'relative -mx-4 h-60 sm:-mx-6 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[63%]',
            '[mask-image:linear-gradient(to_bottom,transparent,black_28%)]',
            'lg:[mask-image:linear-gradient(to_right,transparent,black_22%)]',
          )}
        >
          <CloudinaryImage
            publicId={image(IMAGE_KEY)}
            alt="Two workers in hard hats looking at the Petronas Twin Towers in Kuala Lumpur"
            priority
            sizes="(min-width: 1024px) 63vw, 100vw"
            className="size-full object-cover object-[62%_40%] lg:object-[center_40%]"
          />
          {showScript && (
            <p className="absolute top-4 right-4 font-script text-2xl leading-tight whitespace-pre-line text-white drop-shadow-md sm:right-8 sm:text-3xl lg:top-8 lg:right-[5%] lg:text-4xl">
              {'New\nOpportunities\nBrighter\nFuture'}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
