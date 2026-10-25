import { useCallback, useRef } from 'react'

/**
 * Connects a <Turnstile> widget to a react-hook-form form that has a `captchaToken` field.
 *
 *   const captcha = useCaptcha(form)
 *   <Turnstile {...captcha.widgetProps} />
 *   …after every submit attempt (success or failure): captcha.reset()
 *
 * The token is stored in the form as `captchaToken`, so the form's validation asks for it; the message under
 * the widget is the form's error for that field (the browser's, or the server's 422 `captcha_token`).
 */
export default function useCaptcha({ setValue, formState }) {
  const widget = useRef(null)

  const onToken = useCallback(
    (token) => setValue('captchaToken', token, { shouldValidate: Boolean(token) }),
    [setValue],
  )
  const reset = useCallback(() => widget.current?.reset(), [])

  return { reset, widgetProps: { ref: widget, onToken, error: formState.errors.captchaToken?.message } }
}

/** After a failed submit with only the captcha wrong, bring its message into view (there is no input to focus). */
export function scrollToCaptchaError() {
  document.querySelector('[data-captcha-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
