import { createFileRoute } from '@tanstack/react-router'
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { mainTransitionProps } from '@/lib/utils.ts'
import {BookingPoliciesSection} from "@/components/sections/booking-policy-section.tsx";
import { FaqSection } from '@/components/sections/faq-section.tsx'
import { PageHero } from '@/components/shared/page-hero.tsx'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/faq')({
  head: () =>
    pageHead({
      title: 'FAQ',
      description:
        'Everything you need to know about booking, payments, cancellations and our chauffeur service in Portugal.',
      path: '/faq',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/faq-banner.png"
        title={t('faqPage.heroTitle')}
        subtitle={t('faqPage.heroSubtitle')}
      />

      <BookingPoliciesSection/>

      <FaqSection/>

    </motion.div>
  )
}
