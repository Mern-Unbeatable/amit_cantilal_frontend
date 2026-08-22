import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { toWhatsAppUrl } from '@/lib/utils.ts'

export function VipConciergeHero() {
  const { t } = useTranslation()
  const { data: settings } = usePublicSettings()
  return (
    <section className="relative min-h-[78vh] md:min-h-[92vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/airport-transfer.png"
          alt="Elite Ride airport greet and assist concierge"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-28 pt-32">
        <div className="max-w-4xl">
          <span className="uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-[11px] text-[#C9A84C] mb-6 md:mb-8 block font-medium">
            {t('vipConcierge.hero.tag')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-6 md:mb-10 text-[#F5F0E8]">
            {t('vipConcierge.hero.title')}
          </h1>
          <p className="text-base md:text-xl text-[#F5F0E8]/80 leading-relaxed italic max-w-3xl font-light mb-8 md:mb-12">
            {t('vipConcierge.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#concierge"
              className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] text-[#0B0B0B] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-500"
            >
              {t('vipConcierge.hero.contactButton')} <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={toWhatsAppUrl(settings?.whatsapp_number ?? '+351914578214')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-[#C9A84C]/60 text-[#C9A84C] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0B0B0B] transition-all duration-500"
            >
              {t('vipConcierge.hero.requestButton')} <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
