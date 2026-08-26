export const SITE_URL = 'https://offwego.pt'
export const SITE_NAME = 'Off We Go Portugal'
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/118dab1d-996a-4565-bc16-7c458b7d64c5.png`

interface PageHeadInput {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}

/**
 * Builds the { meta, links } shape TanStack Router's head() / <HeadContent />
 * expects, so every route gets its own <title>, description and canonical URL
 * instead of the single static one baked into index.html.
 */
export function pageHead({ title, description, path, image, noindex }: PageHeadInput) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const ogImage = image ?? DEFAULT_IMAGE

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ]

  if (noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  return {
    meta,
    links: [{ rel: 'canonical', href: url }],
  }
}
