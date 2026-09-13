import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { toWhatsAppUrl } from '@/lib/utils.ts'
import { fadeUp } from '@/features/transfers/shared/motion.ts'

const INTERNAL_LINKS = [
  { key: 'fleet', to: '/fleet' },
  { key: 'transfers', to: '/transfers' },
  { key: 'tours', to: '/tours' },
  { key: 'booking', to: '/booking' },
] as const

interface TransferLandingCtaProps {
  ns: string
  imageSrc: string
}

export function TransferLandingCta({ ns, imageSrc }: TransferLandingCtaProps) {
  const { t } = useTranslation(ns)
  const { data: settings } = usePublicSettings()

  return (
    <section className="relative overflow-hidden border-t border-[#C9A84C]/10">
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={t('cta.imageAlt')}
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-[#0B0B0B]/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/70 to-[#0B0B0B]" />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-36 max-w-4xl text-center"
        {...fadeUp}
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-[1.1] mb-8">
          {t('cta.title')}
        </h2>
        <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
        <p className="text-base md:text-xl text-[#F5F0E8]/80 font-light leading-relaxed mb-6">
          {t('cta.lead')}
        </p>
        <p className="text-sm md:text-lg text-[#F5F0E8]/60 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {t('cta.body')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-14">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] text-[#0B0B0B] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-500"
          >
            {t('cta.primaryCta')} <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={toWhatsAppUrl(
              settings?.whatsapp_number ?? '+351914578214',
              t('cta.whatsappMessage'),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0B0B0B] transition-all duration-500"
          >
            {t('cta.secondaryCta')} <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5 font-light">
            {t('cta.linksLabel')}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {INTERNAL_LINKS.map((link, index) => (
              <span key={link.key} className="inline-flex items-center">
                {index > 0 && (
                  <span
                    className="mx-3 h-3 w-px bg-[#C9A84C]/30"
                    aria-hidden
                  />
                )}
                <Link
                  to={link.to}
                  className="text-sm text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-500 font-light"
                >
                  {t(`cta.links.${link.key}`)}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </motion.div>
    </section>
  )
}
