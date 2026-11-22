import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonMadridHero } from '@/features/transfers/lisbon-madrid/hero.tsx'
import { LisbonMadridIntro } from '@/features/transfers/lisbon-madrid/intro.tsx'

import { LisbonMadridStops } from '@/features/transfers/lisbon-madrid/stops.tsx'
import { LisbonMadridCrossBorder } from '@/features/transfers/lisbon-madrid/cross-border.tsx'
import { LisbonMadridVehicles } from '@/features/transfers/lisbon-madrid/vehicles.tsx'
import { LisbonMadridIncluded } from '@/features/transfers/lisbon-madrid/included.tsx'
import { LisbonMadridAirportFaq } from '@/features/transfers/lisbon-madrid/airport-faq.tsx'
import { LisbonMadridCta } from '@/features/transfers/lisbon-madrid/cta.tsx'

const seo = TRANSFER_SEO.madrid

export const Route = createFileRoute(
  '/_public/transfers/lisbon-madrid-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image: 'https://offwego.pt/transfers/lisbon-madrid/HERO%20IMAGE%20LISBON%20MADRID.png',
      breadcrumbs: [
        { label: 'Home', path: '/' },
        { label: 'Transfers', path: '/transfers' },
      ],
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonMadridHero />
        <LisbonMadridIntro />
        <LisbonMadridStops />
        <LisbonMadridCrossBorder />
        <LisbonMadridVehicles />
        <LisbonMadridIncluded />
        <LisbonMadridAirportFaq />
        <LisbonMadridCta />
      </div>
    </motion.div>
  )
}
