import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { VipConciergeHero } from '@/features/vip-concierge/hero.tsx'
import { VipConciergeExperience } from '@/features/vip-concierge/experience.tsx'
import { VipConciergeServices } from '@/features/vip-concierge/services.tsx'
import { VipConciergeAvailability } from '@/features/vip-concierge/availability.tsx'
import { VipConciergeForWhom } from '@/features/vip-concierge/for-whom.tsx'
import { VipConciergeForm } from '@/features/vip-concierge/concierge-form.tsx'
import { VipConciergeCta } from '@/features/vip-concierge/cta.tsx'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/vip-concierge')({
  head: () =>
    pageHead({
      title: 'VIP Concierge',
      description:
        'Beyond the drive — restaurant reservations, itinerary planning and bespoke arrangements from our VIP concierge team in Portugal.',
      path: '/vip-concierge',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-black text-white-cream">
        <VipConciergeHero />
        <VipConciergeExperience />
        <VipConciergeServices />
        <VipConciergeAvailability />
        <VipConciergeForWhom />
        <VipConciergeForm />
        <VipConciergeCta />
      </div>
    </motion.div>
  )
}
