import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonAirportHero } from '@/features/transfers/lisbon-airport/hero.tsx'
import { LisbonAirportIntro } from '@/features/transfers/lisbon-airport/intro.tsx'
import { LisbonAirportDestinations } from '@/features/transfers/lisbon-airport/destinations.tsx'
import { LisbonAirportService } from '@/features/transfers/lisbon-airport/service.tsx'
import { LisbonAirportVehicles } from '@/features/transfers/lisbon-airport/vehicles.tsx'
import { LisbonAirportWhyChoose } from '@/features/transfers/lisbon-airport/why-choose.tsx'
import { LisbonAirportFaq } from '@/features/transfers/lisbon-airport/faq.tsx'
import { LisbonAirportCta } from '@/features/transfers/lisbon-airport/cta.tsx'

const seo = TRANSFER_SEO.airport

export const Route = createFileRoute(
  '/_public/transfers/lisbon-airport-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image:
        'https://offwego.pt/transfers/lisbon-airport/HERO%20IMAGE%20_%20LISBON%20PRIVATE%20AIRPORT%20TRANSFERS.png',
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
