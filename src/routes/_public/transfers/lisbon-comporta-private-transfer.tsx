import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonComportaHero } from '@/features/transfers/lisbon-comporta/hero.tsx'

import { LisbonComportaIntro } from '@/features/transfers/lisbon-comporta/intro.tsx'
import { LisbonComportaDestinations } from '@/features/transfers/lisbon-comporta/destinations.tsx'
import { LisbonComportaVehicles } from '@/features/transfers/lisbon-comporta/vehicles.tsx'
import { LisbonComportaIncluded } from '@/features/transfers/lisbon-comporta/included.tsx'
import { LisbonComportaStopover } from '@/features/transfers/lisbon-comporta/stopover.tsx'
import { LisbonComportaAirportFaq } from '@/features/transfers/lisbon-comporta/airport-faq.tsx'
import { LisbonComportaCta } from '@/features/transfers/lisbon-comporta/cta.tsx'

const seo = TRANSFER_SEO.comporta

export const Route = createFileRoute(
  '/_public/transfers/lisbon-comporta-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image: 'https://offwego.pt/transfers/lisbon-comporta/HERO%20IMAGE%20_%20LISBON%20COMPORTA.png',
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
