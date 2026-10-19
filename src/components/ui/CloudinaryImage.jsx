import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { cloudinarySrcSet, cloudinaryUrl, hasImage } from '@/lib/cloudinary'

/**
 * Responsive image from Cloudinary (or a local /path or full URL).
 * Shows a soft brand gradient placeholder while publicId is empty or no cloud name is configured.
 * priority — load eagerly with high fetch priority (use for the hero image only).
 */
export default function CloudinaryImage({
  publicId,
  alt,
  sizes = '100vw',
  width = 1440,
  className,
  priority = false,
  ...rest
}) {
  if (!hasImage(publicId)) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : 'true'}
        className={cn(
          'flex items-center justify-center bg-linear-to-br from-primary-100 via-surface-2 to-primary-200 text-primary-300',
          className,
        )}
      >
        <ImageIcon size={32} strokeWidth={1.5} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={cloudinaryUrl(publicId, { width })}
      srcSet={cloudinarySrcSet(publicId)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('object-cover', className)}
      {...rest}
    />
  )
}
