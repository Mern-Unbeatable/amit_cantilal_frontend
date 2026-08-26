import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { LogIn, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { mainTransitionProps } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '@/constants'
import WhyPartnerWithUs from "@/components/sections/why-partner.tsx";
import B2BFeatures from '@/components/sections/features.tsx'
import FleetSection from '@/components/sections/fleet-sections.tsx'
import CoverageArea from '@/components/sections/coverage-area.tsx'
import B2BRequestForm from '@/components/form/b2b-request-form.tsx'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/b2b')({
  head: () =>
    pageHead({
      title: 'B2B Partnerships',
      description:
        'Partner with Off We Go Portugal — hotels, DMCs and travel agencies can offer their clients premium chauffeur transfers and private tours across Lisbon, Porto & Algarve.',
      path: '/b2b',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const { data: fleet } = useFleet()

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end pb-12 md:pb-20">
        {/* Background image */}
        <img
          src="/b2b-hero-lisbon-mercedes-BHNBdxWS.webp"
          alt="OffWeGo B2B Corporate Chauffeur Service"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0B0B0B]" />

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            {/* Tag */}
            <div className="tag-gold mb-4 md:mb-6">{t('b2bPage.tag')}</div>

            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light italic text-[#C9A84C] mb-4 md:mb-6 drop-shadow-lg">
              {t('b2bPage.heading')}
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl lg:text-2xl text-[#F5F0E8] leading-relaxed italic max-w-4xl drop-shadow-md">
              {t('b2bPage.subtext')}
            </p>

            {/* CTAs */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 flex-wrap">
              {/* WhatsApp */}
              <Button
                asChild
                className="btn-gold rounded-none h-10 md:h-14 text-sm md:text-lg px-5 md:px-8"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {t('b2bPage.whatsapp')}
                </a>
              </Button>

              {/* Fill form */}
              <Button
                asChild
                variant="outline"
                className="rounded-none h-10 md:h-14 text-sm md:text-lg px-5 md:px-8 border-[#C9A84C]/30 text-[#F5F0E8] hover:bg-[#C9A84C]/10 hover:text-[#F5F0E8]"
              >
                <a href="#apply">{t('b2bPage.fillForm')}</a>
              </Button>

              {/* Partner login */}
              <Button
                asChild
                variant="ghost"
                className="rounded-none h-10 md:h-14 text-sm md:text-lg px-5 md:px-8 text-[#F5F0E8] hover:bg-[#C9A84C]/10 hover:text-[#F5F0E8]"
              >
                <Link to="/">
                  <LogIn className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {t('b2bPage.partnerLogin')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WhyPartnerWithUs/>

      <B2BFeatures/>

      <FleetSection fleet={fleet} />

      <CoverageArea/>

      <B2BRequestForm/>
    </motion.div>
  )
}
