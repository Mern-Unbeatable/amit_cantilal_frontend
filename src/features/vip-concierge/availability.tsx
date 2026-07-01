import { MapPin, Plane } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function VipConciergeAvailability() {
  const { t } = useTranslation()
  const AIRPORTS = [
    { name: t('vipConcierge.availability.lisbonName'), code: t('vipConcierge.availability.lisbonCode') },
    { name: t('vipConcierge.availability.portoName'), code: t('vipConcierge.availability.portoCode') },
  ]
  return (
    <section className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-5">
          <Plane className="w-3 h-3" />
          {t('vipConcierge.availability.tag')}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15]">
          {t('vipConcierge.availability.title')}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {AIRPORTS.map((airport) => (
          <div
            key={airport.name}
            className="relative p-10 md:p-12 border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm text-center hover:border-[#C9A84C]/40 transition-all duration-700 group"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#C9A84C]/40" />
            <MapPin
              className="w-5 h-5 text-[#C9A84C] mx-auto mb-5 transition-transform duration-700 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
            />
            <h3 className="font-serif text-xl md:text-2xl font-light text-[#F5F0E8] mb-2">
              {airport.name}
            </h3>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]/70">
              {airport.code}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs md:text-sm text-[#F5F0E8]/45 italic font-light mt-10 max-w-2xl mx-auto">
        {t('vipConcierge.availability.footnote')}
      </p>
    </section>
  )
}
