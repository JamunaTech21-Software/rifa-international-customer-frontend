import { apiPost } from '@/api/client'

// Form field names (camelCase) → API field names (snake_case). Used both ways.
export const MESSAGE_FIELDS = {
  fullName: 'full_name',
  email: 'email',
  phone: 'phone',
  subject: 'subject',
  message: 'message',
  website: 'website',
  captchaToken: 'captcha_token',
}

/** POST /messages → { id, received_at }. Throws ApiError. */
export async function sendMessage(values) {
  const body = Object.fromEntries(
    Object.entries(MESSAGE_FIELDS)
      .filter(([key]) => key !== 'captchaToken' || values.captchaToken) // only sent while the captcha is on
      .map(([key, apiKey]) => [apiKey, String(values[key] ?? '').trim()]),
  )
  const response = await apiPost('/messages', body)
  return response.data
}
