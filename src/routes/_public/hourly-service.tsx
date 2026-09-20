import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, CircleCheckBig, Clock, Shield, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import { Button } from '@/components/ui/button.tsx'
import { pageHead } from '@/lib/seo.ts'

const FEATURE_ICONS = [Clock, Users, CircleCheckBig, Shield]

export const Route = createFileRoute('/_public/hourly-service')({
  head: () =>
    pageHead({
      title: 'Hourly Chauffeur Service',
      description:
        'Hire a professional chauffeur and vehicle by the hour in Portugal — flexible, tailor-made itineraries for as long as you need.',
      path: '/hourly-service',
      breadcrumbs: [
        { label: 'Home', path: '/' },
        { label: 'Hourly Service', path: '/hourly-service' },
      ],
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const features = (
    t('hourlyServicePage.features', { returnObjects: true }) as Array<{
      title: string
      description: string
    }>
  ).map((f, idx) => ({ ...f, icon: FEATURE_ICONS[idx] }))
  const reasons = (
    t('hourlyServicePage.reasons', { returnObjects: true }) as Array<{
      title: string
      description: string
    }>
  ).map((r, idx) => ({ ...r, num: String(idx + 1).padStart(2, '0') }))
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/hourly-banner.png"
        title={t('hourlyServicePage.heroTitle')}
        subtitle={t('hourlyServicePage.heroSubtitle')}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.hourlyService') },
        ]}
      />

      <section className="py-16 md:py-24 bg-[#0B0B0B]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* 2-col: image + text */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src="/hourly-chauffeur-service.png"
                  alt="Hourly chauffeur service"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div>
                <div className="tag-gold mb-4">
                  {t('hourlyServicePage.tag')}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-gradient-gold mb-6">
                  {t('hourlyServicePage.title')}
                </h2>
                <p className="text-[#9A9182] leading-relaxed mb-4">
                  {t('hourlyServicePage.body1')}
                </p>
                <p className="text-[#9A9182] leading-relaxed mb-8">
                  {t('hourlyServicePage.body2')}
                </p>
                <Button
                  asChild
                  className="rounded-none h-11 px-8 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium"
                >
                  <Link to="/booking">
                    {t('hourlyServicePage.bookNow')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* 4 feature cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200"
                >
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <Icon
                        className="w-6 h-6 text-[#C9A84C]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-serif font-light text-[#F5F0E8] mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-[#9A9182]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#141414]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left — heading + CTA */}
              <div className="lg:sticky lg:top-28 self-start">
                <div className="tag-gold mb-4">
                  {t('hourlyServicePage.whyTag')}
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-gradient-gold mb-6 leading-tight">
                  {t('hourlyServicePage.whyTitleLine1')}
                  <br />
                  <em className="italic">
                    {t('hourlyServicePage.whyTitleEmphasis')}
                  </em>
                </h2>
                <p className="text-[#9A9182] leading-relaxed mb-8 text-sm md:text-base">
                  {t('hourlyServicePage.whyBody')}
                </p>
                <Button
                  asChild
                  className="rounded-none h-12 md:h-14 px-8 md:px-10 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-base md:text-lg"
                >
                  <Link to="/booking">
                    {t('hourlyServicePage.bookNow')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Right — numbered cards */}
              <div className="space-y-4">
                {reasons.map(({ num, title, description }) => (
                  <div
                    key={num}
                    className="group flex gap-5 md:gap-6 p-5 md:p-6 bg-[#0B0B0B] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200"
                  >
                    {/* Number */}
                    <span className="font-serif text-3xl md:text-4xl font-light text-[#C9A84C]/20 group-hover:text-[#C9A84C]/40 transition-colors leading-none flex-shrink-0 w-10">
                      {num}
                    </span>

                    {/* Text */}
                    <div>
                      <h3 className="font-serif text-base md:text-xl font-light text-[#F5F0E8] mb-1.5">
                        {title}
                      </h3>
                      <p className="text-sm text-[#9A9182] leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
