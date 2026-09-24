import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonMadridHero } from '@/features/transfers/lisbon-madrid/hero.tsx'
import { LisbonMadridIntro } from '@/features/transfers/lisbon-madrid/intro.tsx'

import { LisbonMadridStops } from '@/features/transfers/lisbon-madrid/stops.tsx'
import { LisbonMadridCrossBorder } from '@/features/transfers/lisbon-madrid/cross-border.tsx'
import { LisbonMadridVehicles } from '@/features/transfers/lisbon-madrid/vehicles.tsx'
import { LisbonMadridIncluded } from '@/features/transfers/lisbon-madrid/included.tsx'
import { LisbonMadridAirportFaq } from '@/features/transfers/lisbon-madrid/airport-faq.tsx'
import { LisbonMadridCta } from '@/features/transfers/lisbon-madrid/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-madrid-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon to Madrid Private Transfer | Off We Go Portugal',
      description:
        'Private transfer between Lisbon and Madrid in a premium Mercedes. Door-to-door Portugal-Spain chauffeur service with optional stops along the journey.',
      path: '/transfers/lisbon-madrid-private-transfer',
      image: 'https://offwego.pt/transfers/lisbon-madrid/HERO%20IMAGE%20LISBON%20MADRID.png',
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
