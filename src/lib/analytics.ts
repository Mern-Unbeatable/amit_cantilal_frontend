declare global {
  interface Window {
    dataLayer?: Array<unknown>
    gtag?: (...args: Array<unknown>) => void
  }
}

let initialized = false

/**
 * Loads gtag.js and configures GA4, but only if a measurement ID is set —
 * never sends anything to Google when the env var is missing (local dev,
 * or before the client's real ID is added to .env.production).
 */
export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId || initialized) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: Array<unknown>) {
    window.dataLayer?.push(args)
  }

  // TEMPORARY: stripped down to the exact stock snippet from GA4's own
  // "Install manually" setup page (no consent call, no send_page_view:
  // false, automatic page_view instead of our manual SPA tracking) — a
  // clean-room test to see if the bare, unmodified official pattern
  // actually reaches Google in this environment at all, since our
  // customized version hasn't despite everything checking out correctly.
  // Revert to the consent-mode + manual-SPA-tracking version once this
  // confirms one way or the other.
  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

export function trackPageview(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path })
}
