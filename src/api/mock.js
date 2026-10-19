import { fallbackLookups } from '@/data/lookups'

/**
 * In-browser stand-in for the API, used when VITE_API_MOCK=true. It answers like the real backend
 * (backend/docs/api.md) after a short delay, so the forms can be built and tested without it.
 *
 * Triggers for testing error states:
 *   - mobile 01911111111      → 422 with fields.mobile (01000000000 does too, but the form rejects that one itself)
 *   - full name "Rate Limit"  → 429
 *   - full name "Server Error"→ 500
 */

const DELAY_MS = 600
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function failure(status, code, message, fields = {}, retryAfter = null) {
  return { __mockError: { status, code, message, fields, retryAfter } }
}

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

  'POST /applications': ({ form }) => {
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

  'POST /messages': ({ json }) => {
    if (json?.full_name === 'Rate Limit') {
      return failure(429, 'rate_limited', 'Too many attempts. Please try again later.', {}, 3600)
    }
    if (json?.full_name === 'Server Error') return failure(500, 'server_error', 'Something went wrong.')
    return { data: { id: 1, received_at: dhakaTime() } }
  },
}

/** Resolves with the response payload, or throws the ApiError the real client would throw. */
export async function mockRequest(method, path, { json, form } = {}) {
  await wait(DELAY_MS)
  const handler = handlers[`${method} ${path}`]
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
