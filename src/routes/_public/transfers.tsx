import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Car, Globe, Plane, Shield } from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import TransferServices from '@/components/sections/transfer-section.tsx'
import FeatureCards from '@/components/feature-card.tsx'

const transferCards = [
  {
    icon: Plane,
    title: 'Airport Pickup',
    description:
      '60 minutes free waiting time from landing. Flight tracking included.',
  },
  {
    icon: Shield,
    title: 'Fixed Prices',
    description: 'Transparent pricing with no hidden fees or surge charges.',
  },
  {
    icon: Globe,
    title: 'Multilingual Drivers',
    description:
      'Professional chauffeurs fluent in English, Portuguese, Spanish and more.',
  },
  {
    icon: Car,
    title: 'Premium Fleet',
    description: 'Mercedes-Benz and Tesla vehicles with immaculate interiors.',
  },
]

export const Route = createFileRoute('/_public/transfers')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/chauffeur-service-Bb4E-ZAm.webp"
        title="Premium Airport Chauffeur Services"
        subtitle="Experience first-class airport transportation with Off We Go Portugal. Meet & greet at arrivals, luxury Mercedes fleet, and a smooth, stress-free transfer tailored to your schedule."
      />

      <TransferServices />

      <section className="py-16 md:py-24 bg-[#0B0B0B]">
        <FeatureCards cards={transferCards} className="max-w-6xl mx-auto" />
      </section>
    </motion.div>
  )
}
