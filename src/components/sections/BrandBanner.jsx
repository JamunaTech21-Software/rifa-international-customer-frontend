import { cn } from '@/lib/cn'
import CloudinaryImage from '@/components/ui/CloudinaryImage'
import { image, imagesWithBakedTagline } from '@/data/images'

/**
 * Wide photo banner with a handwritten tagline over the photo and a navy block on the right
 * (About page: "A Brighter Future in Malaysia" … "Your Global Career Partner").
 *
 * script    — handwritten tagline ("\n" = line break), drawn unless the photo already contains it.
 * sideLines — lines of the right-hand block (white text, divider line on the left, short bar below).
 */
export default function BrandBanner({ imageKey, imageAlt = '', script, sideLines = [], className }) {
  const showScript = script && !imagesWithBakedTagline.has(imageKey)

  return (
    <section className={cn('flex flex-col bg-navy-900 lg:flex-row', className)}>
      <div className="relative h-44 min-w-0 flex-1 sm:h-52 lg:h-44 xl:h-[11.5rem]">
        <CloudinaryImage
          publicId={image(imageKey)}
          alt={imageAlt}
          sizes="(min-width: 1024px) 83vw, 100vw"
          className="size-full object-cover object-[35%_60%] lg:[mask-image:linear-gradient(to_right,black_88%,transparent)]"
        />
        {showScript && (
          <p className="absolute top-1/2 left-5 -translate-y-1/2 font-script text-3xl leading-tight whitespace-pre-line text-white drop-shadow-md sm:left-10 sm:text-4xl lg:text-5xl">
            {script}
          </p>
        )}
      </div>

      {sideLines.length > 0 && (
        <div className="flex items-center px-6 py-6 sm:px-10 lg:w-[17%] lg:min-w-60 lg:px-8 lg:py-0">
          <div className="border-l-2 border-white pl-5 text-white">
            <p className="text-xl leading-snug font-bold sm:text-[1.375rem]">
              {sideLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <span aria-hidden="true" className="mt-3 block h-0.5 w-10 rounded-full bg-white" />
          </div>
        </div>
      )}
    </section>
  )
}
