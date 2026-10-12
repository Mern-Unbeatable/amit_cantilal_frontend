import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '@/features/transfers/shared/motion.ts'

export function PortoDouroJourney() {
  const { t } = useTranslation('portoDouroTransfer')
  const paragraphs = t('journey.paragraphs', {
    returnObjects: true,
  }) as Array<string>

  return (
    <section className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#C9A84C]/10">
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-4xl text-center"
        {...fadeUp}
      >
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
          {t('journey.title')}
        </h2>
        <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
        <div className="space-y-5 text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
