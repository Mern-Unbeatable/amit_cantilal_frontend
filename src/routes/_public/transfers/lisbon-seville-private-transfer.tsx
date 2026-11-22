import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { LisbonSevilleHero } from '@/features/transfers/lisbon-seville/hero.tsx'
import { LisbonSevilleIntro } from '@/features/transfers/lisbon-seville/intro.tsx'
import { LisbonSevilleStops } from '@/features/transfers/lisbon-seville/stops.tsx'
import { LisbonSevilleCrossBorder } from '@/features/transfers/lisbon-seville/cross-border.tsx'
import { LisbonSevilleVehicles } from '@/features/transfers/lisbon-seville/vehicles.tsx'
import { LisbonSevilleIncluded } from '@/features/transfers/lisbon-seville/included.tsx'
import { LisbonSevilleAirportFaq } from '@/features/transfers/lisbon-seville/airport-faq.tsx'
import { LisbonSevilleCta } from '@/features/transfers/lisbon-seville/cta.tsx'

const seo = TRANSFER_SEO.seville

export const Route = createFileRoute(
  '/_public/transfers/lisbon-seville-private-transfer',
)({
  head: () =>
    pageHead({
      title: seo.title,
      description: seo.description,
      path: seo.path,
      image: 'https://offwego.pt/transfers/lisbon-seville/hero.png',
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
      <div className="min-h-screen bg-black text-white-cream">
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
