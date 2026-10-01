import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils.ts'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

export interface TransferDestinationCard {
  key: string
  image: string
}

interface TransferLandingDestinationsProps {
  ns: string
  destinations: ReadonlyArray<TransferDestinationCard>
  sectionKey?: string
  gridClassName?: string
}

export function TransferLandingDestinations({
  ns,
  destinations,
  sectionKey = 'destinations',
  gridClassName,
}: TransferLandingDestinationsProps) {
  const { t, i18n } = useTranslation(ns)
  const p2Key = `${sectionKey}.p2`
  const noteKey = `${sectionKey}.note`
  const hasP2 = i18n.exists(p2Key, { ns })
  const hasNote = i18n.exists(noteKey, { ns })

  /**
   * Centers any leftover cards in the last row, for any number of cards.
   *
   * Desktop (lg): a 6-column grid where each card spans 2 columns, so 3 cards per row.
   *   - 1 leftover card  -> starts at column 3, so it sits in the middle.
   *   - 2 leftover cards -> the first one starts at column 2, so the pair is centered.
   *
   * Tablet (sm/md): 2 cards per row. With an odd number of cards, the last one
   *   spans both columns but is capped at half width (minus half the gap) and centered.
   *
   * Only applies when no `gridClassName` is passed. Pages that pass their own grid
   * (e.g. 4 columns) keep that layout unchanged.
   */
  const total = destinations.length
  const centerOrphans = !gridClassName
  const lgRemainder = total % 3
  const smHasOrphan = total % 2 === 1
  const resolvedGridClass =
    gridClassName ??
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6'

  return (
    <section className="bg-black py-20 md:py-32 border-t border-gold/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
          {...fadeUp}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white-cream leading-[1.15] mb-8">
            {t(`${sectionKey}.title`)}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <div className="space-y-5 text-base md:text-lg text-white-cream/70 font-light leading-relaxed">
            <p>{t(`${sectionKey}.p1`)}</p>
            {hasP2 && <p>{t(p2Key)}</p>}
          </div>
        </motion.div>

        <div className={resolvedGridClass}>
          {destinations.map((destination, index) => {
            const isLast = index === total - 1
            const isSecondLast = index === total - 2
            return (
              <motion.article
                key={destination.key}
                className={cn(
                  'group bg-black-2 border border-gold/12 hover:border-gold/35 overflow-hidden transition-colors duration-300 flex flex-col',
                  centerOrphans && [
                    'lg:col-span-2',
                    lgRemainder === 1 && isLast && 'lg:col-start-3',
                    lgRemainder === 2 && isSecondLast && 'lg:col-start-2',
                    smHasOrphan &&
                      isLast &&
                      'sm:col-span-2 sm:w-full sm:max-w-[calc(50%-0.625rem)] md:max-w-[calc(50%-0.75rem)] sm:mx-auto lg:max-w-none lg:col-span-2',
                  ],
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
                  alt={t(`${sectionKey}.items.${destination.key}.imageAlt`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h3 className="font-serif text-xl md:text-2xl font-light text-white-cream mb-3">
                  {t(`${sectionKey}.items.${destination.key}.name`)}
                </h3>
                <p className="text-sm md:text-base text-white-cream/60 font-light leading-relaxed">
                  {t(`${sectionKey}.items.${destination.key}.description`)}
                </p>
              </div>
            </motion.article>
          )})}
        </div>

        {hasNote && (
          <motion.p
            className="mt-12 md:mt-16 text-center text-sm md:text-base text-white-cream/50 font-light leading-relaxed max-w-3xl mx-auto"
            {...fadeUp}
          >
            {t(noteKey)}
          </motion.p>
        )}
      </div>
    </section>
  )
}
