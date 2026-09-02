import ReactGA from 'react-ga4'

let initialized = false

/**
 * Initializes GA4 via react-ga4, but only if a measurement ID is set —
 * never sends anything to Google when the env var is missing (local dev,
 * or before the client's real ID is added to .env.production).
 */
export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId || initialized) return
  initialized = true

  ReactGA.initialize(measurementId, {
    // send_page_view: false — this is an SPA, we send page_view manually on
    // route changes via trackPageview() instead of relying on the initial load.
    gtagOptions: { send_page_view: false },
  })

  // Google Consent Mode: without an explicit "default" consent state, gtag.js
  // can withhold hits for traffic it detects as EEA. There's no cookie-consent
  // banner on this site to gate this properly yet, so grant analytics_storage
  // by default; keep ad-related storage denied since nothing here does
  // ads/remarketing.
  ReactGA.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
}

export function trackPageview(path: string) {
  if (!initialized) return
  ReactGA.send({ hitType: 'pageview', page: path })
}
