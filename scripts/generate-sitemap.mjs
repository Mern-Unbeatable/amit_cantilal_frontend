// Generates public/sitemap.xml at build time from the live API (tours + blog
// posts) plus the static marketing pages. Runs before `vite build` so the
// result ends up in dist/ as a real static file — this app is a client-only
// SPA with no server-side route, so there's nowhere else to serve it from.
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SITE_URL = 'https://offwego.pt'
const API_BASE_URL = process.env.VITE_API_BASE_URL ?? 'https://api.offwego.pt/api/v1'

const STATIC_PATHS = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/tours', priority: '0.9', changefreq: 'weekly' },
  { path: '/transfers', priority: '0.8', changefreq: 'monthly' },
  { path: '/transfers/lisbon-porto-private-transfer', priority: '0.8', changefreq: 'monthly' },
  { path: '/transfers/lisbon-algarve-private-transfer', priority: '0.8', changefreq: 'monthly' },
  { path: '/hourly-service', priority: '0.8', changefreq: 'monthly' },
  { path: '/fleet', priority: '0.7', changefreq: 'monthly' },
  { path: '/vip-concierge', priority: '0.7', changefreq: 'monthly' },
  { path: '/special-events', priority: '0.7', changefreq: 'monthly' },
  { path: '/corporate-mobility', priority: '0.7', changefreq: 'monthly' },
  { path: '/b2b', priority: '0.6', changefreq: 'monthly' },
  { path: '/partnerships', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
]

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sitemap generation: ${url} responded ${res.status}`)
  }
  return res.json()
}

async function fetchTourEntries() {
  const redirectedHome = new Set([
    'fatima-private-half-day-tour-from-lisbon',
  ])
  const { data: tours } = await fetchJson(`${API_BASE_URL}/public/tours`)
  return (tours ?? [])
    .filter((tour) => tour.slug && !redirectedHome.has(tour.slug))
    .map((tour) => ({ path: `/tours/${tour.slug}`, priority: '0.8', changefreq: 'weekly' }))
}

async function fetchBlogEntries() {
  const entries = []
  let page = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await fetchJson(`${API_BASE_URL}/public/posts?page=${page}&per_page=100`)
    for (const post of data.data ?? []) {
      if (!post.slug) continue
      entries.push({
        path: `/blog/${post.slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: post.updated_at,
      })
    }
    if (page >= (data.pagination?.last_page ?? 1)) break
    page += 1
  }
  return entries
}

function toUrlXml({ path: urlPath, priority, changefreq, lastmod }) {
  const lines = [
    '  <url>',
    `    <loc>${SITE_URL}${urlPath}</loc>`,
  ]
  if (lastmod) lines.push(`    <lastmod>${lastmod.slice(0, 10)}</lastmod>`)
  lines.push(`    <changefreq>${changefreq}</changefreq>`)
  lines.push(`    <priority>${priority}</priority>`)
  lines.push('  </url>')
  return lines.join('\n')
}

async function main() {
  let dynamicEntries = []
  try {
    const [tourEntries, blogEntries] = await Promise.all([
      fetchTourEntries(),
      fetchBlogEntries(),
    ])
    dynamicEntries = [...tourEntries, ...blogEntries]
  } catch (err) {
    // Don't fail the whole production build because the API was briefly
    // unreachable — ship the static pages and let the next build pick up
    // new tours/posts.
    console.warn('[sitemap] Failed to fetch tours/posts, sitemap will only include static pages:', err.message)
  }

  const allEntries = [...STATIC_PATHS, ...dynamicEntries]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map(toUrlXml),
    '</urlset>',
    '',
  ].join('\n')

  const outPath = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../public/sitemap.xml')
  await writeFile(outPath, xml, 'utf-8')
  console.log(`[sitemap] Wrote ${allEntries.length} URLs to ${outPath}`)
}

main().catch((err) => {
  console.error('[sitemap] Failed:', err)
  process.exit(1)
})
