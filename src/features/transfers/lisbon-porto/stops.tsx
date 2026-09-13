import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { STOP_DESTINATIONS } from '@/features/transfers/lisbon-porto/stops-data.ts'
import { fadeUp, landingEase, landingViewport } from '@/features/transfers/shared/motion.ts'

export function LisbonPortoStops() {
  const { t } = useTranslation('lisbonPortoTransfer')

  return (
    <section className="bg-[#0B0B0B] py-20 md:py-32 border-t border-[#C9A84C]/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div className="max-w-3xl mx-auto text-center mb-14 md:mb-20" {...fadeUp}>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            {t('stops.title')}
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
          <div className="space-y-5 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
            <p>{t('stops.p1')}</p>
            <p>{t('stops.p2')}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {STOP_DESTINATIONS.map((destination, index) => (
            <motion.article
              key={destination.key}
              className="group bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 overflow-hidden transition-colors duration-300 flex flex-col"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={landingViewport}
              transition={{ duration: 0.55, ease: landingEase, delay: index * 0.07 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#1C1C1C]">
                <img
                  src={destination.image}
                  alt={t(`stops.destinations.${destination.key}.imageAlt`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-light text-[#F5F0E8] mb-3">
                  {t(`stops.destinations.${destination.key}.name`)}
                </h3>
                <p className="text-sm md:text-base text-[#F5F0E8]/60 font-light leading-relaxed">
                  {t(`stops.destinations.${destination.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-12 md:mt-16 text-center text-sm md:text-base text-[#F5F0E8]/50 font-light leading-relaxed max-w-3xl mx-auto"
          {...fadeUp}
        >
          {t('stops.note')}
        </motion.p>
      </div>
    </section>
  )
}
