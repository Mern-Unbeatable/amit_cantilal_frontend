import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { CorporateHero } from '@/features/corporate-mobility/hero.tsx'
import { CorporateIntro } from '@/features/corporate-mobility/intro.tsx'
import { CorporateExperience } from '@/features/corporate-mobility/experience.tsx'
import { CorporateSignature } from '@/features/corporate-mobility/signature.tsx'
import { CorporateGallery } from '@/features/corporate-mobility/gallery.tsx'
import { CorporateQuote } from '@/features/corporate-mobility/quote.tsx'
import { CorporateCta } from '@/features/corporate-mobility/cta.tsx'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/corporate-mobility')({
  head: () =>
    pageHead({
      title: 'Corporate Mobility',
      description:
        'Reliable, discreet chauffeur transport for business travel in Portugal — executive transfers, roadshows and recurring corporate accounts with dedicated account management.',
      path: '/corporate-mobility',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-black text-white-cream">
        <CorporateHero />
        <CorporateIntro />
        <CorporateExperience />
        <CorporateSignature />
        <CorporateGallery />
        <CorporateQuote />
        <CorporateCta />
      </div>
    </motion.div>
  )
}
