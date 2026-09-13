import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonPortoHero } from '@/features/transfers/lisbon-porto/hero.tsx'
import { LisbonPortoIntro } from '@/features/transfers/lisbon-porto/intro.tsx'
import { LisbonPortoStops } from '@/features/transfers/lisbon-porto/stops.tsx'
import { LisbonPortoVehicles } from '@/features/transfers/lisbon-porto/vehicles.tsx'
import { LisbonPortoIncluded } from '@/features/transfers/lisbon-porto/included.tsx'
import { LisbonPortoAirportFaq } from '@/features/transfers/lisbon-porto/airport-faq.tsx'
import { LisbonPortoCta } from '@/features/transfers/lisbon-porto/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-porto-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon to Porto Private Transfer',
      description:
        'Private Lisbon to Porto and Porto to Lisbon transfers in a premium Mercedes. Professional chauffeur, door-to-door service and optional stops along the way.',
      path: '/transfers/lisbon-porto-private-transfer',
      image: 'https://offwego.pt/transfers/lisbon-porto/hero.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonPortoHero />
        <LisbonPortoIntro />
        <LisbonPortoStops />
        <LisbonPortoVehicles />
        <LisbonPortoIncluded />
        <LisbonPortoAirportFaq />
        <LisbonPortoCta />
      </div>
    </motion.div>
  )
}
