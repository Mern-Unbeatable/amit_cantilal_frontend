import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

export const TRANSFER_LANDING_VEHICLES = [
  {
    key: 'eClass',
    image: '/mercedes-e-class-BIO35KIp.webp',
  },
  {
    key: 'sClass',
    image: '/mercedes-s-class-B4viU9i3.webp',
  },
  {
    key: 'vClass',
    image: '/mercedes-v-class-C116sv8v.webp',
  },
] as const

export interface TransferLandingVehicleCard {
  key: string
  image: string
}

interface TransferLandingVehiclesProps {
  ns: string
  vehicles?: ReadonlyArray<TransferLandingVehicleCard>
}

export function TransferLandingVehicles({
  ns,
  vehicles = TRANSFER_LANDING_VEHICLES,
}: TransferLandingVehiclesProps) {
  const { t, i18n } = useTranslation(ns)
  const hasIntro = i18n.exists('vehicles.intro', { ns })

  return (
    <section className="bg-[#0F0F0F] py-20 md:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white-cream leading-[1.15] mb-8">
            {t('vehicles.title')}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          {hasIntro && (
            <p className="text-base md:text-lg text-white-cream/70 font-light leading-relaxed">
              {t('vehicles.intro')}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.article
              key={vehicle.key}
              className="group bg-black-2 border border-gold/12 hover:border-gold/35 overflow-hidden transition-colors duration-300"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={landingViewport}
              transition={{
                duration: 0.55,
                ease: landingEase,
                delay: index * 0.1,
              }}
            >
              <div className="aspect-4/3 overflow-hidden bg-black-3">
                <img
                  src={vehicle.image}
                  alt={t(`vehicles.${vehicle.key}.imageAlt`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl font-light text-white-cream mb-4">
                  {t(`vehicles.${vehicle.key}.name`)}
                </h3>
                <p className="text-sm md:text-base text-white-cream/60 font-light leading-relaxed">
                  {t(`vehicles.${vehicle.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-12 md:mt-16 text-center text-sm md:text-base text-white-cream/55 font-light leading-relaxed max-w-2xl mx-auto"
          {...fadeUp}
        >
          {t('vehicles.note')}
        </motion.p>
      </div>
    </section>
  )
}
