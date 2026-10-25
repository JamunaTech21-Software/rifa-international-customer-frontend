import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { TURNSTILE_SITE_KEY, captchaEnabled } from '@/features/captcha/captcha'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

// Cloudflare's script is added once, the first time a form needs it.
let scriptPromise = null
function loadTurnstile() {
  scriptPromise ??= new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile)
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => {
      scriptPromise = null // allow another try (for example when the visitor comes back online)
      reject(new Error('The Turnstile script could not be loaded.'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

/**
 * Cloudflare Turnstile "I am human" widget. Renders nothing while the captcha is off (no site key).
 *
 * onToken(token) — called with the token when the check passes, and with '' when it expires or fails.
 * error — message shown under the widget (for example the form's validation message).
 * ref — gives access to reset(): a token works once, so call it after every submit attempt.
 */
export default function Turnstile({ onToken, error, className, ref }) {
  const container = useRef(null)
  const widgetId = useRef(null)
  const latestOnToken = useRef(onToken)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    latestOnToken.current = onToken
  }, [onToken])

  useEffect(() => {
    if (!captchaEnabled) return undefined
    let cancelled = false
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return
        widgetId.current = turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          callback: (token) => latestOnToken.current?.(token),
          'expired-callback': () => latestOnToken.current?.(''),
          'error-callback': () => latestOnToken.current?.(''),
        })
      })
      .catch(() => !cancelled && setLoadFailed(true))
    return () => {
      cancelled = true
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current)
      widgetId.current = null
    }
  }, [])

  useImperativeHandle(ref, () => ({
    reset() {
      latestOnToken.current?.('')
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current)
    },
  }))

  if (!captchaEnabled) return null

  return (
    <div className={className}>
      {/* The widget is 65px tall; the space is reserved so the form does not jump when it appears. */}
      <div ref={container} className={cn('min-h-[4.0625rem]', loadFailed && 'hidden')} />
      {loadFailed && (
        <p role="alert" className="text-sm font-medium text-danger-600">
          The security check could not be loaded. Please check your internet connection and reload the page.
        </p>
      )}
      {error && (
        <p role="alert" data-captcha-error className="mt-1.5 text-sm font-medium text-danger-600">
          {error}
        </p>
      )}
    </div>
  )
}
