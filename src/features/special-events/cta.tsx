import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function EventsCta() {
  const { t } = useTranslation()
  return (
    <section className="py-40 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-8 font-light">
          {t('specialEvents.cta.tag')}
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-[#F5F0E8] mb-10 font-light leading-tight">
          {t('specialEvents.cta.title')}
        </h2>
        <p className="text-[#F5F0E8]/60 mb-14 font-light text-lg leading-relaxed max-w-xl mx-auto">
          {t('specialEvents.cta.body')}
        </p>
        <Link
          to="/booking"
          className="inline-flex items-center gap-4 bg-[#C9A84C] text-[#0B0B0B] px-12 py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-700 font-medium"
        >
          {t('specialEvents.cta.button')}{' '}
          <ArrowUpRight className="w-3 h-3" strokeWidth={1} />
        </Link>
        <div className="mt-8 text-sm text-[#F5F0E8]/40">
          <Link
            to="/vip-concierge"
            className="hover:text-[#C9A84C] transition-colors duration-500"
          >
            {t('specialEvents.cta.concierge')}
          </Link>
        </div>
      </div>
    </section>
  )
}
