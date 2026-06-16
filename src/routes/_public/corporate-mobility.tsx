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

export const Route = createFileRoute('/_public/corporate-mobility')({
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
