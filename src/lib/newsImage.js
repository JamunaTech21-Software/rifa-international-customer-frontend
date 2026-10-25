import { image } from '@/data/images'
import { hasImage } from '@/lib/cloudinary'

/** Cover photo of an article: the one uploaded in the admin panel, else the local photo of the starting posts, else a general one. */
export function newsImage(item) {
  const candidates = [item.imagePublicId, image(item.imageKey), image('hero.news')]
  return candidates.find((candidate) => hasImage(candidate)) ?? ''
}
