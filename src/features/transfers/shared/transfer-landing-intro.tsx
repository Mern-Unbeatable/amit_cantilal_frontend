import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '@/features/transfers/shared/motion.ts'

interface TransferLandingIntroProps {
  ns: string
  imageSrc: string
  fromKey?: string
  toKey?: string
}

export function TransferLandingIntro({
  ns,
  imageSrc,
  fromKey = 'from',
  toKey = 'to',
}: TransferLandingIntroProps) {
  const { t } = useTranslation(ns)

  return (
    <>
      <section className="bg-[#0B0B0B] py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
                {t('intro.title')}
              </h2>
              <div className="w-12 h-px bg-[#C9A84C]/40 mb-8" />
              <div className="space-y-6 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
                <p>{t('intro.p1')}</p>
                <p>{t('intro.p2')}</p>
                <p>{t('intro.p3')}</p>
                <p>{t('intro.p4')}</p>
              </div>
            </motion.div>

            <motion.div
              className="w-full"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={imageSrc}
                  alt={t('intro.imageAlt')}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  width={1672}
                  height={941}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F0F0F] py-16 md:py-24 border-t border-[#C9A84C]/10">
        <motion.div
          className="container mx-auto px-6 md:px-12 max-w-4xl text-center"
          {...fadeUp}
        >
          <h2 className="font-serif text-2xl md:text-4xl font-light text-[#F5F0E8] leading-[1.2] mb-10">
            {t('directions.title')}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10">
            <div className="inline-flex items-center gap-3 text-[#F5F0E8] tracking-wide">
              <span className="text-sm md:text-base font-light">
                {t(`directions.${fromKey}`)}
              </span>
              <ArrowRight
                className="w-4 h-4 text-[#C9A84C]"
                strokeWidth={1.5}
              />
              <span className="text-sm md:text-base font-light">
                {t(`directions.${toKey}`)}
              </span>
            </div>
            <span
              className="hidden sm:block h-4 w-px bg-[#C9A84C]/30"
              aria-hidden
            />
            <div className="inline-flex items-center gap-3 text-[#F5F0E8] tracking-wide">
              <span className="text-sm md:text-base font-light">
                {t(`directions.${toKey}`)}
              </span>
              <ArrowRight
                className="w-4 h-4 text-[#C9A84C]"
                strokeWidth={1.5}
              />
              <span className="text-sm md:text-base font-light">
                {t(`directions.${fromKey}`)}
              </span>
            </div>
          </div>

          <p className="text-base md:text-lg text-[#F5F0E8]/60 font-light leading-relaxed max-w-2xl mx-auto">
            {t('directions.body')}
          </p>
        </motion.div>
      </section>
    </>
  )
}
