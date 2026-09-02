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

  // Google Consent Mode: without an explicit "default" consent state, gtag.js
  // can withhold hits for traffic it detects as EEA. There's no cookie-consent
  // banner on this site to gate this properly yet, so grant analytics_storage
  // by default; keep ad-related storage denied since nothing here does
  // ads/remarketing. (Tested reverting to the bare stock snippet without this
  // — made no difference, so this isn't what's blocking data collection, but
  // it's still correct to keep.)
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })

  // send_page_view: false — this is an SPA, we send page_view manually on
  // route changes via trackPageview() instead of relying on the initial load.
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })
}

export function trackPageview(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path })
}
