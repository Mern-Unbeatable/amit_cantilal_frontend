import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonComportaHero } from '@/features/transfers/lisbon-comporta/hero.tsx'

import { LisbonComportaIntro } from '@/features/transfers/lisbon-comporta/intro.tsx'
import { LisbonComportaDestinations } from '@/features/transfers/lisbon-comporta/destinations.tsx'
import { LisbonComportaVehicles } from '@/features/transfers/lisbon-comporta/vehicles.tsx'
import { LisbonComportaIncluded } from '@/features/transfers/lisbon-comporta/included.tsx'
import { LisbonComportaStopover } from '@/features/transfers/lisbon-comporta/stopover.tsx'
import { LisbonComportaAirportFaq } from '@/features/transfers/lisbon-comporta/airport-faq.tsx'
import { LisbonComportaCta } from '@/features/transfers/lisbon-comporta/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-comporta-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon to Comporta Private Transfer | Off We Go Portugal',
      description:
        'Private transfer from Lisbon to Comporta in a premium Mercedes. Door-to-door chauffeur service to Comporta, Carvalhal, Melides and surrounding resorts and villas.',
      path: '/transfers/lisbon-comporta-private-transfer',
      image: 'https://offwego.pt/transfers/lisbon-comporta/HERO%20IMAGE%20_%20LISBON%20COMPORTA.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonComportaHero />
        <LisbonComportaIntro />
        <LisbonComportaDestinations />
        <LisbonComportaVehicles />
        <LisbonComportaIncluded />
        <LisbonComportaStopover />
        <LisbonComportaAirportFaq />
        <LisbonComportaCta />
      </div>
    </motion.div>
  )
}
