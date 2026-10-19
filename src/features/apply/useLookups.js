import { useEffect, useState } from 'react'
import { fallbackLookups } from '@/data/lookups'

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? '/api'}/v1`
const TIMEOUT_MS = 4000

// One request per page load is enough: the backend caches lookups for an hour anyway.
let cached = null

// API shape (snake_case) → the shape the forms use.
function normalize(data) {
  const pick = (list, fallback) => (Array.isArray(list) && list.length ? list : fallback)
  return {
    jobCategories: pick(
      data.job_categories?.map(({ slug, name }) => ({ value: slug, label: name })),
      fallbackLookups.jobCategories,
    ),
    genders: pick(data.genders, fallbackLookups.genders),
    workExperience: pick(data.work_experience, fallbackLookups.workExperience),
    educationLevels: pick(data.education_levels, fallbackLookups.educationLevels),
    passportStatuses: pick(data.passport_statuses, fallbackLookups.passportStatuses),
    contactSubjects: pick(data.contact_subjects, fallbackLookups.contactSubjects),
  }
}

/**
 * Form options from GET /lookups. Returns the built-in fallback immediately and swaps in the server's
 * lists when they arrive; if the request fails or times out the fallback simply stays.
 */
export default function useLookups() {
  const [lookups, setLookups] = useState(cached ?? fallbackLookups)

  useEffect(() => {
    if (cached || import.meta.env.VITE_API_MOCK === 'true') return undefined

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    fetch(`${API_BASE}/lookups`, { signal: controller.signal, credentials: 'same-origin' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
      .then((json) => {
        cached = normalize(json.data ?? {})
        setLookups(cached)
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer))

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  return lookups
}
