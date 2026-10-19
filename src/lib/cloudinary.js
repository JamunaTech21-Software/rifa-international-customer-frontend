const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export const IMAGE_WIDTHS = [480, 768, 1080, 1440, 1920]

// Local files ("/images/x.jpg") and full URLs are used as-is; anything else is a Cloudinary public ID.
export function isDirectSrc(publicId) {
  return /^(\/|https?:|data:|blob:)/.test(publicId)
}

export function hasImage(publicId) {
  return Boolean(publicId) && (isDirectSrc(publicId) || Boolean(CLOUD_NAME))
}

export function cloudinaryUrl(publicId, { width, quality = 'auto', crop = 'limit' } = {}) {
  if (!publicId) return ''
  if (isDirectSrc(publicId)) return publicId
  if (!CLOUD_NAME) return ''
  const transforms = ['f_auto', `q_${quality}`, width && `w_${width}`, width && `c_${crop}`]
    .filter(Boolean)
    .join(',')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`
}

export function cloudinarySrcSet(publicId, widths = IMAGE_WIDTHS) {
  if (!publicId || isDirectSrc(publicId) || !CLOUD_NAME) return undefined
  return widths.map((w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`).join(', ')
}
