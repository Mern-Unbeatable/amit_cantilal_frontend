import { Luggage, Shield, UserCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function ServiceList({
  items,
  gold = false,
}: {
  items: Array<string>
  gold?: boolean
}) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-4 text-sm md:text-[15px] text-[#F5F0E8]/80 font-light leading-relaxed"
        >
          <span
            className={`mt-[10px] w-3 h-px flex-shrink-0 ${gold ? 'bg-[#C9A84C]/70' : 'bg-[#C9A84C]/50'}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function VipConciergeServices() {
  const { t } = useTranslation()
  const meetAssistItems = t('vipConcierge.services.meetAssist.items', {
    returnObjects: true,
  }) as Array<string>
  const fastTrackItems = t('vipConcierge.services.fastTrack.items', {
    returnObjects: true,
  }) as Array<string>
  return (
    <section className="relative container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
          <UserCheck className="w-3 h-3" />
          {t('vipConcierge.services.tag')}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15]">
          {t('vipConcierge.services.title')}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="w-8 h-px bg-[#C9A84C]/30" />
          <span className="w-1 h-1 rotate-45 bg-[#C9A84C]/70" />
          <span className="w-8 h-px bg-[#C9A84C]/30" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
        {/* Meet & Assist */}
        <div className="relative p-10 md:p-14 backdrop-blur-sm border transition-all duration-700 group overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border-white/10 hover:border-[#C9A84C]/30">
          <span className="absolute top-0 left-0 w-6 h-px bg-[#C9A84C]/40" />
          <span className="absolute top-0 left-0 w-px h-6 bg-[#C9A84C]/40" />
          <span className="absolute bottom-0 right-0 w-6 h-px bg-[#C9A84C]/40" />
          <span className="absolute bottom-0 right-0 w-px h-6 bg-[#C9A84C]/40" />
          <span className="absolute top-8 right-10 font-serif text-2xl font-light tracking-tight text-[#C9A84C]/25">
            I
          </span>

          <div className="inline-flex items-center justify-center w-14 h-14 mb-8 rounded-full border transition-transform duration-700 group-hover:scale-105 border-[#C9A84C]/25 text-[#C9A84C] bg-white/[0.02]">
            <Luggage className="w-5 h-5" strokeWidth={1.25} />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5F0E8] mb-3 leading-tight">
            {t('vipConcierge.services.meetAssist.title')}
          </h3>
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#C9A84C] mb-10 font-light">
            {t('vipConcierge.services.meetAssist.subtitle')}
          </p>
          <div className="w-10 h-px mb-8 bg-[#C9A84C]/30" />
          <ServiceList items={meetAssistItems} />
        </div>

        {/* Meet & Assist + Fast Track */}
        <div className="relative p-10 md:p-14 backdrop-blur-sm border transition-all duration-700 group overflow-hidden bg-gradient-to-br from-[#C9A84C]/[0.06] via-transparent to-[#C9A84C]/[0.02] border-[#C9A84C]/40 hover:border-[#C9A84C]/70">
          <span className="absolute top-0 left-0 w-6 h-px bg-[#C9A84C]/60" />
          <span className="absolute top-0 left-0 w-px h-6 bg-[#C9A84C]/60" />
          <span className="absolute bottom-0 right-0 w-6 h-px bg-[#C9A84C]/60" />
          <span className="absolute bottom-0 right-0 w-px h-6 bg-[#C9A84C]/60" />
          <span className="absolute top-8 right-10 font-serif text-2xl font-light tracking-tight text-[#C9A84C]/40">
            II
          </span>

          <div className="inline-flex items-center justify-center w-14 h-14 mb-8 rounded-full border transition-transform duration-700 group-hover:scale-105 border-[#C9A84C]/50 text-[#C9A84C] bg-[#C9A84C]/[0.05]">
            <Shield className="w-5 h-5" strokeWidth={1.25} />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-light text-[#F5F0E8] mb-3 leading-tight">
            {t('vipConcierge.services.fastTrack.title')}
          </h3>
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#C9A84C] mb-10 font-light">
            {t('vipConcierge.services.fastTrack.subtitle')}
          </p>
          <div className="w-10 h-px mb-8 bg-[#C9A84C]/50" />
          <ServiceList items={fastTrackItems} gold />
        </div>
      </div>
    </section>
  )
}
