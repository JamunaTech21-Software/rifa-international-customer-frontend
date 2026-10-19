import { mockRequest } from '@/api/mock'

/**
 * Tiny fetch wrapper for the PHP API (backend/docs/api.md).
 *
 * - Base URL: VITE_API_BASE_URL (default "/api") + "/v1".
 * - VITE_API_MOCK=true answers from src/api/mock.js instead of the network.
 * - Errors become ApiError { status, code, message, fields } using the API's error format, so callers
 *   only deal with one error type (including network failures: status 0).
 */

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? '/api'}/v1`
const USE_MOCK = import.meta.env.VITE_API_MOCK === 'true'

export class ApiError extends Error {
  constructor({
    status = 0,
    code = 'network_error',
    message = 'Something went wrong.',
    fields = {},
    retryAfter = null,
  }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.fields = fields
    this.retryAfter = retryAfter
  }
}

async function request(method, path, { json, form } = {}) {
  if (USE_MOCK) return mockRequest(method, path, { json, form })

  const headers = { Accept: 'application/json' }
  let body
  if (form) {
    body = form // the browser sets the multipart boundary — do not set Content-Type
  } else if (json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(json)
  }

  let response
  try {
    response = await fetch(`${API_BASE}${path}`, { method, headers, body, credentials: 'same-origin' })
  } catch {
    throw new ApiError({ status: 0, code: 'network_error', message: 'Could not reach the server.' })
  }

  if (response.status === 204) return null

  let payload = null
  try {
    payload = await response.json()
  } catch {
    // not JSON (e.g. a proxy error page) — handled below
  }

  if (!response.ok) {
    const error = payload?.error ?? {}
    throw new ApiError({
      status: response.status,
      code: error.code ?? 'server_error',
      message: error.message ?? 'Something went wrong.',
      fields: error.fields ?? {},
      retryAfter: Number(response.headers.get('Retry-After')) || null,
    })
  }

  return payload
}

export const apiGet = (path) => request('GET', path)
export const apiPost = (path, json) => request('POST', path, { json })
export const apiPostForm = (path, form) => request('POST', path, { form })
