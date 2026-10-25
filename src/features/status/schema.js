import { z } from 'zod'
import { captchaTokenSchema } from '@/features/captcha/captcha'
import { normalizeReference } from '@/api/status'
import { normalizeMobile } from '@/features/apply/schema'

/**
 * Validation for the "Check your application" form. Rules and messages mirror the backend
 * (backend/docs/api.md → POST /applications/status).
 */
export const statusSchema = z.object({
  referenceNo: z
    .string()
    .trim()
    .min(1, 'Please enter your reference number.')
    .refine(
      (value) => !value || /^RIFA-\d{8}-\d{5}$/.test(normalizeReference(value)),
      'Enter the reference number from your confirmation, e.g. RIFA-20261015-00042.',
    ),
  mobile: z
    .string()
    .trim()
    .min(1, 'Please enter your mobile number.')
    .refine(
      (value) => !value || normalizeMobile(value) !== null,
      'Enter a valid Bangladeshi mobile number (01XXXXXXXXX).',
    ),
  captchaToken: captchaTokenSchema,
})

export const statusDefaults = { referenceNo: '', mobile: '', captchaToken: '' }
