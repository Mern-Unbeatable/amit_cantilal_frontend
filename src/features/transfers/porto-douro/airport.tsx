import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '@/features/transfers/shared/motion.ts'

export function PortoDouroAirport() {
  const { t } = useTranslation('portoDouroTransfer')

  return (
    <section className="bg-[#0F0F0F] py-20 md:py-28 border-t border-[#C9A84C]/10">
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-4xl text-center"
        {...fadeUp}
      >
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
          {t('airport.title')}
        </h2>
        <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
        <div className="space-y-5 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed mb-10">
          <p>{t('airport.p1')}</p>
          <p>{t('airport.p2')}</p>
        </div>
        <Link
          to="/booking"
          className="inline-flex items-center justify-center gap-3 bg-[#C9A84C] text-[#0B0B0B] px-8 py-4 md:px-10 md:py-5 text-[11px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-500"
        >
          {t('airport.cta')} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  )
}
