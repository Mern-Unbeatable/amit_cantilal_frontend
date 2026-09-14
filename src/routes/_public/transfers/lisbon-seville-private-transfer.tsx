import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { LisbonSevilleHero } from '@/features/transfers/lisbon-seville/hero.tsx'
import { LisbonSevilleIntro } from '@/features/transfers/lisbon-seville/intro.tsx'
import { LisbonSevilleStops } from '@/features/transfers/lisbon-seville/stops.tsx'
import { LisbonSevilleCrossBorder } from '@/features/transfers/lisbon-seville/cross-border.tsx'
import { LisbonSevilleVehicles } from '@/features/transfers/lisbon-seville/vehicles.tsx'
import { LisbonSevilleIncluded } from '@/features/transfers/lisbon-seville/included.tsx'
import { LisbonSevilleAirportFaq } from '@/features/transfers/lisbon-seville/airport-faq.tsx'
import { LisbonSevilleCta } from '@/features/transfers/lisbon-seville/cta.tsx'

export const Route = createFileRoute(
  '/_public/transfers/lisbon-seville-private-transfer',
)({
  head: () =>
    pageHead({
      title: 'Lisbon to Seville Private Transfer',
      description:
        'Private Lisbon to Seville and Seville to Lisbon transfers in a premium Mercedes. Door-to-door chauffeur service with optional stops across Portugal and Spain.',
      path: '/transfers/lisbon-seville-private-transfer',
      image: 'https://offwego.pt/transfers/lisbon-seville/hero.png',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F0E8]">
        <LisbonSevilleHero />
        <LisbonSevilleIntro />
        <LisbonSevilleStops />
        <LisbonSevilleCrossBorder />
        <LisbonSevilleVehicles />
        <LisbonSevilleIncluded />
        <LisbonSevilleAirportFaq />
        <LisbonSevilleCta />
      </div>
    </motion.div>
  )
}
