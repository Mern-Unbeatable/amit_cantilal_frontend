/** Tour slugs that should permanently leave the site graph (redirect to home). */
export const TOUR_SLUGS_REDIRECT_HOME = [
  'fatima-private-half-day-tour-from-lisbon',
] as const

/**
 * Normalize tour slugs from the URL.
 * Search Console / bad backlinks sometimes append a trailing `+`.
 */
export function normalizeTourSlug(slug: string): string {
  try {
    slug = decodeURIComponent(slug)
  } catch {
    // keep raw slug if decode fails
  }

  return slug.trim().replace(/\++$/g, '')
}

export function shouldRedirectTourSlugToHome(slug: string): boolean {
  const normalized = normalizeTourSlug(slug)
  return (TOUR_SLUGS_REDIRECT_HOME as ReadonlyArray<string>).includes(
    normalized,
  )
}
