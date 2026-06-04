import { createFileRoute } from '@tanstack/react-router'
import {motion} from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import {BookingPoliciesSection} from "@/components/sections/booking-policy-section.tsx";
import { FaqSection } from '@/components/sections/faq-section.tsx'
import { PageHero } from '@/components/shared/page-hero.tsx'

export const Route = createFileRoute('/_public/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/faq-banner.png"
        title="FAQ"
        subtitle="Everything you need to know about our services"
      />

      <BookingPoliciesSection/>

      <FaqSection/>

    </motion.div>
  )
}
