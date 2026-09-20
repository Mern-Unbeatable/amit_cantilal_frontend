import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { toWhatsAppUrl } from '@/lib/utils.ts'
import { fadeIn, heroCopy } from '@/features/transfers/shared/motion.ts'

interface TransferLandingHeroProps {
  ns: string
  imageSrc: string
}

export function TransferLandingHero({
  ns,
  imageSrc,
}: TransferLandingHeroProps) {
  const { t } = useTranslation(ns)
  const { data: settings } = usePublicSettings()
  const whatsappMessage = t('hero.whatsappMessage')
  const benefits = t('hero.benefits', { returnObjects: true }) as Array<string>

  return (
    <>
      <section className="relative min-h-[78vh] md:min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={imageSrc}
            alt={t('hero.imageAlt')}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[#0B0B0B]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(0,0,0,0.55)_100%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-32">
          <motion.div className="max-w-4xl" {...heroCopy}>
            <Link
              to="/transfers"
              className="uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-[11px] text-[#C9A84C] mb-6 md:mb-8 block font-medium hover:text-[#E2C97E] transition-colors duration-500"
            >
              {t('hero.tag')}
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-6 md:mb-10 text-[#F5F0E8]">
              {t('hero.title')}
            </h1>
            <p className="text-base md:text-xl text-[#F5F0E8]/80 leading-relaxed font-light max-w-3xl mb-8 md:mb-12 whitespace-pre-line">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] text-[#0B0B0B] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-500"
              >
                {t('hero.primaryCta')} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={toWhatsAppUrl(
                  settings?.whatsapp_number ?? '+351914578214',
                  whatsappMessage,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0B0B0B] transition-all duration-500"
              >
                {t('hero.secondaryCta')} <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        className="bg-[#0F0F0F] border-y border-[#C9A84C]/15"
        {...fadeIn}
      >
        <div className="container mx-auto px-6 md:px-12 py-5 md:py-6">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center justify-center gap-3 sm:gap-x-0 sm:gap-y-3">
            {benefits.map((benefit, index) => (
              <li
                key={benefit}
                className="flex items-center text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[#F5F0E8]/75 font-light"
              >
                {index > 0 && (
                  <span
                    className="hidden sm:inline-block mx-4 md:mx-5 h-3 w-px bg-[#C9A84C]/35"
                    aria-hidden
                  />
                )}
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  )
}
