import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { EventsHero } from '@/features/special-events/hero.tsx'
import { EventsIntro } from '@/features/special-events/intro.tsx'
import { EventsExperience } from '@/features/special-events/experience.tsx'
import { EventsSignature } from '@/features/special-events/signature.tsx'
import { EventsGallery } from '@/features/special-events/gallery.tsx'
import { EventsQuote } from '@/features/special-events/quote.tsx'
import { EventsCta } from '@/features/special-events/cta.tsx'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/special-events')({
  head: () =>
    pageHead({
      title: 'Special Events',
      description:
        'Chauffeur transport for weddings, galas and private celebrations in Portugal — arrive in style with our Mercedes-Benz fleet.',
      path: '/special-events',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-black text-white-cream">
        <EventsHero />
        <EventsIntro />
        <EventsExperience />
        <EventsSignature />
        <EventsGallery />
        <EventsQuote />
        <EventsCta />
      </div>
    </motion.div>
  )
}
