import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { VipConciergeHero } from '@/features/vip-concierge/hero.tsx'
import { VipConciergeExperience } from '@/features/vip-concierge/experience.tsx'
import { VipConciergeServices } from '@/features/vip-concierge/services.tsx'
import { VipConciergeAvailability } from '@/features/vip-concierge/availability.tsx'
import { VipConciergeForWhom } from '@/features/vip-concierge/for-whom.tsx'
import { GreetAssistBookingWidget } from '@/features/greet-assist/greet-assist-booking-widget.tsx'
import { VipConciergeForm } from '@/features/vip-concierge/concierge-form.tsx'
import { VipConciergeCta } from '@/features/vip-concierge/cta.tsx'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/airport-greet-and-assist')({
  head: () =>
    pageHead({
      title: 'Airport Greet & Assist | VIP Airport Services in Portugal',
      description:
        'Personalized airport meet & greet, priority fast track, luggage assistance, and bespoke airport coordination at Lisbon (LIS) and Porto (OPO) airports.',
      path: '/airport-greet-and-assist',
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
        {/* Instant Online Booking Engine */}
        <GreetAssistBookingWidget id="book" />
        {/* Custom / Bespoke Inquiry Form */}
        <VipConciergeForm />
        <VipConciergeCta />
      </div>
    </motion.div>
  )
}
