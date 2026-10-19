import { z } from 'zod'
import { ageFromDob } from '@/lib/age'

/**
 * Validation for the Apply form. Rules and messages mirror the backend (backend/docs/api.md → POST /applications),
 * so a message looks the same whether the browser or the server produced it.
 */

export const MAX_FILE_MB = 5
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024
const NAME_PATTERN = /^[\p{L}\p{M}\s.'’-]+$/u

/**
 * Bangladeshi mobile → "01XXXXXXXXX", or null when invalid. Accepts "1712345678" (the form's +880 field),
 * "01712345678", "8801712345678" and "+8801712345678".
 */
export function normalizeMobile(value) {
  let digits = String(value ?? '').replace(/[\s()-]/g, '')
  digits = digits.replace(/^\+/, '')
  if (!/^\d+$/.test(digits)) return null
  if (digits.startsWith('880')) digits = digits.slice(3)
  if (digits.startsWith('0')) digits = digits.slice(1)
  return /^1[3-9]\d{8}$/.test(digits) ? `0${digits}` : null
}

// Problem with an uploaded file, or null when it is fine (or absent).
function fileProblem(file, label) {
  if (!file) return null
  if (!/\.(pdf|jpe?g|png)$/i.test(file.name)) return `${label} must be a PDF, JPG or PNG file.`
  if (file.size > MAX_FILE_BYTES) return `${label} must be ${MAX_FILE_MB} MB or smaller.`
  return null
}

const personName = (requiredMessage, invalidMessage) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine(
      (value) => !value || (value.length >= 2 && value.length <= 100 && NAME_PATTERN.test(value)),
      invalidMessage,
    )

export const applySchema = z
  .object({
    fullName: personName('Please enter your full name.', 'Full name must be 2–100 letters.'),
    fatherName: personName("Please enter your father's name.", "Father's name must be 2–100 letters."),
    dateOfBirth: z
      .string()
      .min(1, 'Please enter your date of birth.')
      .superRefine((value, context) => {
        if (!value) return
        const date = new Date(`${value}T00:00:00`)
        if (Number.isNaN(date.getTime())) {
          context.addIssue({ code: 'custom', message: 'Enter a valid date (YYYY-MM-DD).' })
        } else if (date >= new Date()) {
          context.addIssue({ code: 'custom', message: 'Date of birth must be in the past.' })
        } else if ((ageFromDob(value) ?? 0) < 18) {
          context.addIssue({ code: 'custom', message: 'You must be at least 18 years old.' })
        }
      }),
    gender: z.enum(['male', 'female'], { error: 'Please select your gender.' }),
    nidNo: z
      .string()
      .trim()
      .refine(
        (value) => !value || /^(\d{10}|\d{13}|\d{17})$/.test(value),
        'NID number must be 10, 13 or 17 digits.',
      ),
    mobile: z
      .string()
      .trim()
      .min(1, 'Please enter your mobile number.')
      .refine(
        (value) => !value || normalizeMobile(value) !== null,
        'Enter a valid Bangladeshi mobile number (01XXXXXXXXX).',
      ),
    email: z
      .string()
      .trim()
      .refine(
        (value) => !value || (value.length <= 150 && z.email().safeParse(value).success),
        'Enter a valid email address.',
      ),
    presentAddress: z
      .string()
      .trim()
      .min(1, 'Please enter your present address.')
      .refine(
        (value) => !value || (value.length >= 5 && value.length <= 255),
        'Present address must be 5–255 characters.',
      ),
    jobCategory: z.string().min(1, 'Please select a job category.'),
    workExperience: z.string().optional(),
    educationLevel: z.string().optional(),
    passportStatus: z.enum(['have_passport', 'will_apply'], { error: 'Please select your passport status.' }),
    cv: z.any().optional(),
    passportCopy: z.any().optional(),
    declaration: z.literal(true, { error: 'Please confirm that the information is true and correct.' }),
    website: z.string().optional(), // honeypot — real visitors never fill it
  })
  .superRefine((values, context) => {
    const cvProblem = fileProblem(values.cv, 'CV')
    if (cvProblem) context.addIssue({ code: 'custom', path: ['cv'], message: cvProblem })

    const passportProblem = values.passportCopy
      ? fileProblem(values.passportCopy, 'Passport copy')
      : values.passportStatus === 'have_passport'
        ? 'Please upload your passport copy.'
        : null
    if (passportProblem)
      context.addIssue({ code: 'custom', path: ['passportCopy'], message: passportProblem })
  })

export const applyDefaults = {
  fullName: '',
  fatherName: '',
  dateOfBirth: '',
  nidNo: '',
  mobile: '',
  email: '',
  presentAddress: '',
  jobCategory: '',
  workExperience: '',
  educationLevel: '',
  cv: null,
  passportCopy: null,
  declaration: false,
  website: '',
}
