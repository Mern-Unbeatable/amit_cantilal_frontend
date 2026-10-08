import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { PortoDouroHero } from '@/features/transfers/porto-douro/hero.tsx'
import { PortoDouroIntro } from '@/features/transfers/porto-douro/intro.tsx'
import { PortoDouroDestinations } from '@/features/transfers/porto-douro/destinations.tsx'
import { PortoDouroJourney } from '@/features/transfers/porto-douro/journey.tsx'
import { PortoDouroAirport } from '@/features/transfers/porto-douro/airport.tsx'
import { PortoDouroVehicles } from '@/features/transfers/porto-douro/vehicles.tsx'
import { PortoDouroIncluded } from '@/features/transfers/porto-douro/included.tsx'
import { PortoDouroFaq } from '@/features/transfers/porto-douro/faq.tsx'
import { PortoDouroCta } from '@/features/transfers/porto-douro/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/porto-douro-valley-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Porto to Douro Valley Private Transfer | Off We Go Portugal',
      description:
        'Private transfer between Porto and the Douro Valley in a premium Mercedes. Door-to-door chauffeur service to hotels, wine estates and private accommodation.',
      path: '/transfers/porto-douro-valley-private-transfer',
      image:
        'https://offwego.pt/transfers/porto-douro/HERO%20IMAGE%20-%20LISBON%20DOURO%20VALLEY.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <PortoDouroHero />
        <PortoDouroIntro />
        <PortoDouroDestinations />
        <PortoDouroJourney />
        <PortoDouroAirport />
        <PortoDouroVehicles />
        <PortoDouroIncluded />
        <PortoDouroFaq />
        <PortoDouroCta />
      </div>
    </motion.div>
  )
}
