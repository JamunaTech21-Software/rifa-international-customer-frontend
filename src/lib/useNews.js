import { useEffect, useState } from 'react'
import { fetchArticle, fetchNews } from '@/api/news'
import { news as bundledNews } from '@/data/news'

// The three starting posts keep their local photo as a fallback when no cover was uploaded.
const imageKeyFor = (slug) => bundledNews.find((item) => item.slug === slug)?.imageKey ?? 'hero.news'

// The list is fetched once per visit and shared by every page that needs it; articles are cached by slug.
let listRequest = null
const articleRequests = new Map()

const loadList = () => {
  listRequest ??= fetchNews(imageKeyFor).catch((error) => {
    listRequest = null
    throw error
  })
  return listRequest
}

const loadArticle = (slug) => {
  if (!articleRequests.has(slug)) {
    articleRequests.set(
      slug,
      fetchArticle(slug, imageKeyFor).catch((error) => {
        articleRequests.delete(slug)
        throw error
      }),
    )
  }
  return articleRequests.get(slug)
}

/**
 * Published news posts from the API, newest first. While they load `loading` is true and `news` is empty.
 * If the API cannot be reached the three posts bundled with the site are shown (`fallback` is true).
 */
export function useNewsList() {
  const [state, setState] = useState({ news: [], loading: true, fallback: false })

  useEffect(() => {
    let cancelled = false
    loadList()
      .then((news) => !cancelled && setState({ news, loading: false, fallback: false }))
      .catch(() => !cancelled && setState({ news: bundledNews, loading: false, fallback: true }))
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

/**
 * One article by slug: { article, loading }. `article` is null once loaded when the post does not exist
 * (show the Not Found page). If the API cannot be reached, the bundled article with that slug is used, if any.
 */
export function useArticle(slug) {
  const [state, setState] = useState({ slug: null, article: null })

  useEffect(() => {
    let cancelled = false
    loadArticle(slug)
      .then((article) => !cancelled && setState({ slug, article }))
      .catch(
        () =>
          !cancelled && setState({ slug, article: bundledNews.find((item) => item.slug === slug) ?? null }),
      )
    return () => {
      cancelled = true
    }
  }, [slug])

  // State from an earlier slug is not shown for the new one.
  const loading = state.slug !== slug
  return { article: loading ? null : state.article, loading }
}
