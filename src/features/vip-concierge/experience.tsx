import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function VipConciergeExperience() {
  const { t } = useTranslation()
  return (
    <section className="container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
            <Sparkles className="w-3 h-3" />
            {t('vipConcierge.experience.tag')}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            {t('vipConcierge.experience.title')}
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mb-8" />
          <p className="text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
            {t('vipConcierge.experience.p1')}
          </p>
          <p className="mt-6 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
            {t('vipConcierge.experience.p2')}
          </p>
          <p className="mt-6 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
            {t('vipConcierge.experience.p3')}
          </p>
        </div>

        <div className="order-1 lg:order-2 w-full max-w-md lg:max-w-sm lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/airport-transfer.png"
              alt="Airport travel, quietly reimagined"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={1500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
