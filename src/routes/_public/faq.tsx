import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { mainTransitionProps } from '@/lib/utils.ts'
import { BookingPoliciesSection } from '@/components/sections/booking-policy-section.tsx'
import { FaqSection } from '@/components/sections/faq-section.tsx'
import { PageHero } from '@/components/shared/page-hero.tsx'
import { pageHead } from '@/lib/seo.ts'
import { TRANSFER_SEO } from '@/features/transfers/seo-worksheet.ts'
import { SeoInboundNote } from '@/features/transfers/seo-inbound-link.tsx'

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

      <BookingPoliciesSection />

      <section className="bg-[#0B0B0B] pb-8">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <SeoInboundNote
            to={TRANSFER_SEO.seville.path}
            anchorText={TRANSFER_SEO.seville.inbound.anchorText}
            before="Crossing the border? Book a "
            after=" in a premium Mercedes with Off We Go Portugal."
          />
        </div>
      </section>

      <FaqSection />
    </motion.div>
  )
}
