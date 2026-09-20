import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Car, Globe, Plane, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import TransferServices from '@/components/sections/transfer-section.tsx'
import FeatureCards from '@/components/feature-card.tsx'
import { pageHead } from '@/lib/seo.ts'

const CARD_ICONS = [Plane, Shield, Globe, Car]

export const Route = createFileRoute('/_public/transfers/')({
  head: () =>
    pageHead({
      title: 'Airport Transfers',
      description:
        'Premium airport chauffeur transfers in Portugal — meet & greet at arrivals, luxury Mercedes fleet, and a smooth, stress-free ride tailored to your schedule.',
      path: '/transfers',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const transferCards = (
    t('transfersPage.cards', { returnObjects: true }) as Array<{
      title: string
      description: string
    }>
  ).map((c, idx) => ({ ...c, icon: CARD_ICONS[idx] }))
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/transfer-banner.PNG"
        title={t('transfersPage.heroTitle')}
        subtitle={t('transfersPage.heroSubtitle')}
      />

      <TransferServices />

      <section className="py-16 md:py-24 bg-[#0B0B0B]">
        <FeatureCards cards={transferCards} className="max-w-6xl mx-auto" />
      </section>
    </motion.div>
  )
}
