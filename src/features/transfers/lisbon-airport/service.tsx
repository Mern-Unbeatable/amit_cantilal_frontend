import {
  Briefcase,
  Car,
  Clock,
  Headphones,
  MapPin,
  Plane,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

const SERVICE_ICONS: Array<LucideIcon> = [
  Plane,
  UserCheck,
  Clock,
  Briefcase,
  Car,
  MapPin,
  Headphones,
]

export function LisbonAirportService() {
  const { t } = useTranslation('lisbonAirportTransfer')
  const items = t('airportService.items', {
    returnObjects: true,
  }) as Array<{
    title: string
    description: string
  }>

  return (
    <section className="bg-[#0B0B0B] py-20 md:py-32 border-t border-[#C9A84C]/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            {t('airportService.title')}
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto" />
        </motion.div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {Array.isArray(items) &&
            items.map((item, index) => {
              const Icon = SERVICE_ICONS[index] ?? UserCheck
              return (
                <motion.li
                  key={item.title}
                  className="bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-300 p-6 md:p-7 flex flex-col justify-start"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={landingViewport}
                  transition={{
                    duration: 0.5,
                    ease: landingEase,
                    delay: index * 0.05,
                  }}
                >
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-light text-[#F5F0E8] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F5F0E8]/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.li>
              )
            })}
        </ul>
      </div>
    </section>
  )
}
