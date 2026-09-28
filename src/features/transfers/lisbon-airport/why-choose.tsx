import { Car, Clock, MapPin, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

const WHY_ICONS: Array<LucideIcon> = [UserCheck, Clock, Car, MapPin]

export function LisbonAirportWhyChoose() {
  const { t } = useTranslation('lisbonAirportTransfer')
  const whyChoose = t('whyChoose.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <section className="bg-[#0F0F0F] py-20 md:py-28 border-t border-[#C9A84C]/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-16"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            {t('whyChoose.title')}
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {Array.isArray(whyChoose) &&
            whyChoose.map((item, index) => {
              const Icon = WHY_ICONS[index] ?? UserCheck
              return (
                <motion.div
                  key={item.title}
                  className="text-center sm:text-left"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={landingViewport}
                  transition={{
                    duration: 0.5,
                    ease: landingEase,
                    delay: index * 0.08,
                  }}
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-[#C9A84C]/35 text-[#C9A84C]">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4 font-light">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#F5F0E8] mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#F5F0E8]/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
