import { useEffect, useState } from 'react'
import { fetchJobs } from '@/api/jobs'
import { jobs as bundledJobs } from '@/data/jobs'

// The list is small and changes rarely, so it is fetched once per visit and shared by every page that needs it.
let request = null
const load = () => {
  request ??= fetchJobs().catch((error) => {
    request = null // try again on the next visit to a page that needs the jobs
    throw error
  })
  return request
}

/**
 * Published job listings from the API. While they load `loading` is true and `jobs` is empty.
 * If the API cannot be reached the original six-plus-six listings bundled with the site are shown instead
 * (`fallback` is true), so the page is never empty because of a network problem.
 */
export default function useJobs() {
  const [state, setState] = useState({ jobs: [], loading: true, fallback: false })

  useEffect(() => {
    let cancelled = false
    load()
      .then((jobs) => !cancelled && setState({ jobs, loading: false, fallback: false }))
      .catch(() => !cancelled && setState({ jobs: bundledJobs, loading: false, fallback: true }))
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
