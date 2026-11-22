import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonPortoHero } from '@/features/transfers/lisbon-porto/hero.tsx'
import { LisbonPortoIntro } from '@/features/transfers/lisbon-porto/intro.tsx'
import { LisbonPortoStops } from '@/features/transfers/lisbon-porto/stops.tsx'
import { LisbonPortoVehicles } from '@/features/transfers/lisbon-porto/vehicles.tsx'
import { LisbonPortoIncluded } from '@/features/transfers/lisbon-porto/included.tsx'
import { LisbonPortoAirportFaq } from '@/features/transfers/lisbon-porto/airport-faq.tsx'
import { LisbonPortoCta } from '@/features/transfers/lisbon-porto/cta.tsx'

const seo = TRANSFER_SEO.porto

export const Route = createFileRoute(
  '/_public/transfers/lisbon-porto-private-transfer',
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
