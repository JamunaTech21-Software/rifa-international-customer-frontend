import { z } from 'zod'

/**
 * Cloudflare Turnstile settings (backend/docs/api.md → "Captcha on Apply + Contact").
 * The site key comes from VITE_TURNSTILE_SITE_KEY. Without it the captcha is off: no widget is shown and the
 * forms do not ask for a token (the backend only checks it while CAPTCHA_ENABLED=true).
 */
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
export const captchaEnabled = Boolean(TURNSTILE_SITE_KEY)

// Same wording as the backend, so a missing token looks the same whether the browser or the server notices it.
export const CAPTCHA_MESSAGE = 'Please complete the security check and try again.'

/** Schema for the form's `captchaToken` value: required while the captcha is on, otherwise ignored. */
export const captchaTokenSchema = captchaEnabled ? z.string().min(1, CAPTCHA_MESSAGE) : z.string().optional()
