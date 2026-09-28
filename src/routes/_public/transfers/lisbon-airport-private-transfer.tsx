import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonAirportHero } from '@/features/transfers/lisbon-airport/hero.tsx'
import { LisbonAirportIntro } from '@/features/transfers/lisbon-airport/intro.tsx'
import { LisbonAirportDestinations } from '@/features/transfers/lisbon-airport/destinations.tsx'
import { LisbonAirportService } from '@/features/transfers/lisbon-airport/service.tsx'
import { LisbonAirportVehicles } from '@/features/transfers/lisbon-airport/vehicles.tsx'
import { LisbonAirportWhyChoose } from '@/features/transfers/lisbon-airport/why-choose.tsx'
import { LisbonAirportFaq } from '@/features/transfers/lisbon-airport/faq.tsx'
import { LisbonAirportCta } from '@/features/transfers/lisbon-airport/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-airport-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon Airport Private Transfer | Off We Go Portugal',
      description:
        'Private Lisbon Airport transfer in a premium Mercedes. Meet & Greet, flight monitoring, professional chauffeur and door-to-door service in Lisbon and beyond.',
      path: '/transfers/lisbon-airport-private-transfer',
      image:
        'https://offwego.pt/transfers/lisbon-airport/HERO%20IMAGE%20_%20LISBON%20PRIVATE%20AIRPORT%20TRANSFERS.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonAirportHero />
        <LisbonAirportIntro />
        <LisbonAirportDestinations />
        <LisbonAirportService />
        <LisbonAirportVehicles />
        <LisbonAirportWhyChoose />
        <LisbonAirportFaq />
        <LisbonAirportCta />
      </div>
    </motion.div>
  )
}
