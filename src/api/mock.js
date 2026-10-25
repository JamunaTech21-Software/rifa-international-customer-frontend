import { categories } from '@/data/categories'
import { jobs } from '@/data/jobs'
import { news } from '@/data/news'
import { fallbackLookups } from '@/data/lookups'
import { CAPTCHA_MESSAGE, captchaEnabled } from '@/features/captcha/captcha'

/**
 * In-browser stand-in for the API, used when VITE_API_MOCK=true. It answers like the real backend
 * (backend/docs/api.md) after a short delay, so the forms can be built and tested without it.
 *
 * Triggers for testing error states:
 *   - mobile 01911111111      → 422 with fields.mobile (01000000000 does too, but the form rejects that one itself)
 *   - full name "Rate Limit"  → 429
 *   - full name "Server Error"→ 500
 *   - status check: RIFA-20261015-00042 + 01712345678 → a result; mobile 01999999999 → 429; anything else → 404
 */

const DELAY_MS = 600
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function failure(status, code, message, fields = {}, retryAfter = null) {
  return { __mockError: { status, code, message, fields, retryAfter } }
}

// Like the backend with CAPTCHA_ENABLED=true: no token → 422 on captcha_token only.
const missingCaptcha = (token) =>
  captchaEnabled && !token
    ? failure(422, 'validation_failed', 'Please check the highlighted fields.', {
        captcha_token: CAPTCHA_MESSAGE,
      })
    : null

function dhakaTime() {
  // ISO-8601 with the Dhaka (+06:00) offset, like the real API.
  const now = new Date(Date.now() + 6 * 60 * 60 * 1000)
  return `${now.toISOString().slice(0, 19)}+06:00`
}

function applicationReference() {
  const today = dhakaTime().slice(0, 10).replaceAll('-', '')
  return `RIFA-${today}-00001`
}

const handlers = {
  'GET /lookups': () => ({
    data: {
      job_categories: fallbackLookups.jobCategories.map(({ value, label }) => ({ slug: value, name: label })),
      genders: fallbackLookups.genders,
      work_experience: fallbackLookups.workExperience,
      education_levels: fallbackLookups.educationLevels,
      passport_statuses: fallbackLookups.passportStatuses,
      contact_subjects: fallbackLookups.contactSubjects,
    },
  }),

  'GET /jobs': () => ({
    data: jobs.map((job, index) => ({
      id: index + 1,
      slug: job.id,
      title: job.title,
      employer_type: job.employerType,
      category: {
        slug: job.category,
        name: categories.find((category) => category.slug === job.category)?.name ?? '',
      },
      location: job.location,
      salary_min: job.salaryMin,
      salary_max: job.salaryMax,
      currency: 'MYR',
      description: null,
      image_public_id: null,
    })),
  }),

  'GET /news': () => ({
    data: news.map(({ slug, title, date, excerpt }, index) => ({
      id: index + 1,
      slug,
      title,
      published_on: date,
      excerpt,
      image_public_id: null,
    })),
  }),

  'POST /applications': ({ form }) => {
    const captchaProblem = missingCaptcha(form?.get('captcha_token'))
    if (captchaProblem) return captchaProblem
    const name = form?.get('full_name')
    if (name === 'Rate Limit') {
      return failure(429, 'rate_limited', 'Too many attempts. Please try again later.', {}, 3600)
    }
    if (name === 'Server Error') return failure(500, 'server_error', 'Something went wrong.')
    if (['01911111111', '01000000000'].includes(form?.get('mobile'))) {
      return failure(422, 'validation_failed', 'Please check the highlighted fields.', {
        mobile: 'Enter a valid Bangladeshi mobile number (01XXXXXXXXX).',
      })
    }
    return {
      data: {
        reference_no: applicationReference(),
        submitted_at: dhakaTime(),
        confirmation_email_sent: Boolean(form?.get('email')),
      },
    }
  },

  'POST /applications/status': ({ json }) => {
    const captchaProblem = missingCaptcha(json?.captcha_token)
    if (captchaProblem) return captchaProblem
    const reference = String(json?.reference_no ?? '').toUpperCase()
    // Test pair: RIFA-20261015-00042 with 01712345678. Anything else is "not found".
    if (json?.mobile === '01999999999') {
      return failure(429, 'rate_limited', 'Too many attempts. Please try again later.', {}, 900)
    }
    if (reference !== 'RIFA-20261015-00042' || json?.mobile !== '01712345678') {
      return failure(
        404,
        'not_found',
        'We could not find an application with these details. Please check your reference number and mobile number.',
      )
    }
    return {
      data: {
        reference_no: reference,
        job_category: 'Construction',
        submitted_at: '2026-10-15T09:30:00+06:00',
        status: 'shortlisted',
        status_label: 'Shortlisted',
        status_updated_at: '2026-10-18T15:45:00+06:00',
        history: [
          { status: 'received', status_label: 'Received', changed_at: '2026-10-15T09:30:00+06:00' },
          { status: 'under_review', status_label: 'Under Review', changed_at: '2026-10-16T11:00:00+06:00' },
          { status: 'shortlisted', status_label: 'Shortlisted', changed_at: '2026-10-18T15:45:00+06:00' },
        ],
      },
    }
  },

  'POST /messages': ({ json }) => {
    const captchaProblem = missingCaptcha(json?.captcha_token)
    if (captchaProblem) return captchaProblem
    if (json?.full_name === 'Rate Limit') {
      return failure(429, 'rate_limited', 'Too many attempts. Please try again later.', {}, 3600)
    }
    if (json?.full_name === 'Server Error') return failure(500, 'server_error', 'Something went wrong.')
    return { data: { id: 1, received_at: dhakaTime() } }
  },
}

// GET /news/{slug}: the post with its body, or a 404 like the real API.
function newsArticle(slug) {
  const post = news.find((item) => item.slug === decodeURIComponent(slug))
  if (!post) return failure(404, 'not_found', 'Not found.')
  return {
    data: {
      id: news.indexOf(post) + 1,
      slug: post.slug,
      title: post.title,
      published_on: post.date,
      excerpt: post.excerpt,
      image_public_id: null,
      body: post.body,
    },
  }
}

/** Resolves with the response payload, or throws the ApiError the real client would throw. */
export async function mockRequest(method, path, { json, form } = {}) {
  await wait(DELAY_MS)
  const handler =
    handlers[`${method} ${path}`] ??
    (method === 'GET' && path.startsWith('/news/') ? () => newsArticle(path.slice(6)) : null)
  if (!handler) {
    const { ApiError } = await import('@/api/client')
    throw new ApiError({ status: 404, code: 'not_found', message: 'Not found.' })
  }
  const result = handler({ json, form })
  if (result.__mockError) {
    const { ApiError } = await import('@/api/client')
    throw new ApiError(result.__mockError)
  }
  return result
}
