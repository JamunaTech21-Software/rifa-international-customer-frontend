import { apiPost } from '@/api/client'
import { normalizeMobile } from '@/features/apply/schema'

/** Only case and spaces are fixed (the server ignores them too): "rifa-20261015-00042 " → "RIFA-20261015-00042". */
export const normalizeReference = (value) =>
  String(value ?? '')
    .replace(/\s+/g, '')
    .toUpperCase()

/**
 * POST /applications/status → { reference_no, job_category, submitted_at, status, status_label,
 * status_updated_at, history: [{ status, status_label, changed_at }] }. Throws ApiError
 * (404 no match · 422 field messages · 429 too many tries).
 * captchaToken — Cloudflare Turnstile token, sent only when the captcha widget is on.
 */
export async function checkApplicationStatus({ referenceNo, mobile, captchaToken }) {
  const body = {
    reference_no: normalizeReference(referenceNo),
    mobile: normalizeMobile(mobile) ?? String(mobile ?? '').trim(),
  }
  if (captchaToken) body.captcha_token = captchaToken
  const response = await apiPost('/applications/status', body)
  return response.data
}
