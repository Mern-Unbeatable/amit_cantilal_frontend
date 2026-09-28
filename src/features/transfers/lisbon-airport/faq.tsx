import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { fadeUp } from '@/features/transfers/shared/motion.ts'

export function LisbonAirportFaq() {
  const { t } = useTranslation('lisbonAirportTransfer')
  const faqItems = t('faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <section
      id="faq"
      className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#C9A84C]/10"
    >
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-4xl"
        {...fadeUp}
      >
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            {t('faq.title')}
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto" />
        </div>

        <Accordion
          type="single"
          collapsible
          className="bg-[#141414] border border-[#C9A84C]/12"
        >
          {Array.isArray(faqItems) &&
            faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-b border-[#C9A84C]/10 last:border-0 px-5 md:px-8"
              >
                <AccordionTrigger className="font-serif text-sm md:text-lg font-light text-[#F5F0E8]/80 hover:text-[#F5F0E8] hover:no-underline py-4 md:py-5 data-[state=open]:text-[#C9A84C] gap-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-[#F5F0E8]/60 leading-relaxed pb-5 md:pb-6 font-light">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
