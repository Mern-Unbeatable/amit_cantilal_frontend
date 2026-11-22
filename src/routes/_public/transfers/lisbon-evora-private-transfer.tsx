import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonEvoraHero } from '@/features/transfers/lisbon-evora/hero.tsx'
import { LisbonEvoraIntro } from '@/features/transfers/lisbon-evora/intro.tsx'
import { LisbonEvoraExperiences } from '@/features/transfers/lisbon-evora/experiences.tsx'
import { LisbonEvoraExplore } from '@/features/transfers/lisbon-evora/explore.tsx'
import { LisbonEvoraVehicles } from '@/features/transfers/lisbon-evora/vehicles.tsx'
import { LisbonEvoraIncluded } from '@/features/transfers/lisbon-evora/included.tsx'
import { LisbonEvoraAirportFaq } from '@/features/transfers/lisbon-evora/airport-faq.tsx'
import { LisbonEvoraCta } from '@/features/transfers/lisbon-evora/cta.tsx'

const seo = TRANSFER_SEO.evora

export const Route = createFileRoute(
  '/_public/transfers/lisbon-evora-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image:
        'https://offwego.pt/transfers/lisbon-evora/HERO%20IMAGE%20_%20LISBON%20E%CC%81VORA%20(1).png',
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
        <LisbonEvoraHero />
        <LisbonEvoraIntro />
        <LisbonEvoraExperiences />
        <LisbonEvoraExplore />
        <LisbonEvoraVehicles />
        <LisbonEvoraIncluded />
        <LisbonEvoraAirportFaq />
        <LisbonEvoraCta />
      </div>
    </motion.div>
  )
}
