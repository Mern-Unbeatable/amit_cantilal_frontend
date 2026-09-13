import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonAlgarveHero } from '@/features/transfers/lisbon-algarve/hero.tsx'
import { LisbonAlgarveIntro } from '@/features/transfers/lisbon-algarve/intro.tsx'
import { LisbonAlgarveDestinations } from '@/features/transfers/lisbon-algarve/destinations.tsx'
import { LisbonAlgarveVehicles } from '@/features/transfers/lisbon-algarve/vehicles.tsx'
import { LisbonAlgarveIncluded } from '@/features/transfers/lisbon-algarve/included.tsx'
import { LisbonAlgarveAirportFaq } from '@/features/transfers/lisbon-algarve/airport-faq.tsx'
import { LisbonAlgarveCta } from '@/features/transfers/lisbon-algarve/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-algarve-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon to Algarve Private Transfer',
      description:
        'Private transfers between Lisbon and the Algarve in a premium Mercedes. Door-to-door chauffeur service to Lagos, Albufeira, Vilamoura, Quinta do Lago, Faro and more.',
      path: '/transfers/lisbon-algarve-private-transfer',
      image: 'https://offwego.pt/transfers/lisbon-porto/hero.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonAlgarveHero />
        <LisbonAlgarveIntro />
        <LisbonAlgarveDestinations />
        <LisbonAlgarveVehicles />
        <LisbonAlgarveIncluded />
        <LisbonAlgarveAirportFaq />
        <LisbonAlgarveCta />
      </div>
    </motion.div>
  )
}
