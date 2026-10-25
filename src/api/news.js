import { ApiError, apiGet } from '@/api/client'

/**
 * GET /news and GET /news/{slug} (backend/docs/api.md). Each API post is turned into the shape the pages already
 * use (see data/news.js): `date` is the API's published_on, `imagePublicId` the cover uploaded in the admin panel
 * (or ''), and `imageKey` the local stand-in photo of the three starting posts (same slug), used as fallback.
 */
export function toArticle(apiPost, fallbackImageKey = 'hero.news') {
  return {
    slug: apiPost.slug,
    title: apiPost.title,
    date: apiPost.published_on,
    excerpt: apiPost.excerpt,
    imageKey: fallbackImageKey,
    imagePublicId: apiPost.image_public_id ?? '',
    body: apiPost.body ?? [],
  }
}

export async function fetchNews(imageKeyFor) {
  const response = await apiGet('/news')
  return response.data.map((post) => toArticle(post, imageKeyFor(post.slug)))
}

/** One article, or null when the API says it does not exist (404: unknown, draft or not yet published). */
export async function fetchArticle(slug, imageKeyFor) {
  try {
    const response = await apiGet(`/news/${encodeURIComponent(slug)}`)
    return toArticle(response.data, imageKeyFor(slug))
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}
