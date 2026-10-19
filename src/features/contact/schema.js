import { z } from 'zod'

/**
 * Validation for the Contact form. Rules and messages mirror the backend
 * (backend/docs/api.md → POST /messages).
 */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .refine(
      (value) => !value || (value.length >= 2 && value.length <= 100),
      'Name must be 2–100 characters.',
    ),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .refine((value) => !value || z.email().safeParse(value).success, 'Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number.')
    .refine(
      (value) => !value || (value.length >= 7 && value.length <= 20 && /^[\d\s+-]+$/.test(value)),
      'Enter a valid phone number.',
    ),
  subject: z.string().min(1, 'Please select a subject.'),
  message: z
    .string()
    .trim()
    .min(1, 'Please write your message.')
    .refine(
      (value) => !value || (value.length >= 10 && value.length <= 5000),
      'Message must be 10–5000 characters.',
    ),
  website: z.string().optional(), // honeypot — real visitors never fill it
})

export const contactDefaults = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '',
}
