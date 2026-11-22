import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonAlgarveHero } from '@/features/transfers/lisbon-algarve/hero.tsx'
import { LisbonAlgarveIntro } from '@/features/transfers/lisbon-algarve/intro.tsx'
import { LisbonAlgarveDestinations } from '@/features/transfers/lisbon-algarve/destinations.tsx'
import { LisbonAlgarveVehicles } from '@/features/transfers/lisbon-algarve/vehicles.tsx'
import { LisbonAlgarveIncluded } from '@/features/transfers/lisbon-algarve/included.tsx'
import { LisbonAlgarveAirportFaq } from '@/features/transfers/lisbon-algarve/airport-faq.tsx'
import { LisbonAlgarveCta } from '@/features/transfers/lisbon-algarve/cta.tsx'

const seo = TRANSFER_SEO.algarve

export const Route = createFileRoute(
  '/_public/transfers/lisbon-algarve-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image: 'https://offwego.pt/transfers/lisbon-porto/hero.png',
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
