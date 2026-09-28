import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { STOP_DESTINATIONS } from '@/features/transfers/lisbon-porto/stops-data.ts'
import { cn } from '@/lib/utils.ts'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

export function LisbonPortoStops() {
  const { t } = useTranslation('lisbonPortoTransfer')

  return (
    <section className="bg-black py-20 md:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white-cream leading-[1.15] mb-8">
            {t('stops.title')}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <div className="space-y-5 text-base md:text-lg text-white-cream/70 font-light leading-relaxed">
            <p>{t('stops.p1')}</p>
            <p>{t('stops.p2')}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
          {STOP_DESTINATIONS.map((destination, index) => {
            const isFourth = index === 3
            const isFifth = index === 4
            return (
              <motion.article
                key={destination.key}
                className={cn(
                  'group bg-black-2 border border-gold/12 hover:border-gold/35 overflow-hidden transition-colors duration-300 flex flex-col',
                  'col-span-1 sm:col-span-1 lg:col-span-2',
                  isFourth && 'lg:col-start-2',
                  isFifth &&
                    'sm:col-span-2 sm:w-full sm:max-w-[calc(50%-0.625rem)] sm:mx-auto lg:max-w-none lg:col-span-2',
                )}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={landingViewport}
                transition={{
                  duration: 0.55,
                  ease: landingEase,
                  delay: index * 0.07,
                }}
              >
              <div className="aspect-4/3 overflow-hidden bg-black-3">
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
                <h3 className="font-serif text-xl md:text-2xl font-light text-white-cream mb-3">
                  {t(`stops.destinations.${destination.key}.name`)}
                </h3>
                <p className="text-sm md:text-base text-white-cream/60 font-light leading-relaxed">
                  {t(`stops.destinations.${destination.key}.description`)}
                </p>
              </div>
            </motion.article>
          )})}
        </div>

        <motion.p
          className="mt-12 md:mt-16 text-center text-sm md:text-base text-white-cream/50 font-light leading-relaxed max-w-3xl mx-auto"
          {...fadeUp}
        >
          {t('stops.note')}
        </motion.p>
      </div>
    </section>
  )
}
