import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { toWhatsAppUrl } from '@/lib/utils.ts'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  title: string
  items: Array<FaqItem>
}

interface FaqSectionProps {
  data?: Array<FaqCategory>
  whatsappNumber?: string
}

export function FaqSection({ data, whatsappNumber }: FaqSectionProps) {
  const { t } = useTranslation()
  const { data: settings } = usePublicSettings()
  const faqData =
    data ?? (t('faq.categories', { returnObjects: true }) as Array<FaqCategory>)
  const resolvedWhatsappNumber =
    whatsappNumber ?? settings?.whatsapp_number ?? '+351914578214'

  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-14">
          {faqData.map((category, i) => (
            <div key={category.title}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-3 md:mb-4">
                <div className="tag-gold">{category.title}</div>
                <div className="flex-1 h-px bg-[#C9A84C]/10" />
              </div>

              {/* Accordion */}
              <Accordion
                type="single"
                collapsible
                className="bg-[#141414] border border-[#C9A84C]/12"
              >
                {category.items.map((item, j) => (
                  <AccordionItem
                    key={j}
                    value={`${i}-${j}`}
                    className="border-b border-[#C9A84C]/10 last:border-0 px-5 md:px-8"
                  >
                    <AccordionTrigger className="font-serif text-sm md:text-lg font-light text-white/80 hover:text-white hover:no-underline py-4 md:py-5 [&[data-state=open]]:text-[#C9A84C] gap-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs md:text-sm text-[#9A9182] leading-relaxed pb-5 md:pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* CTA */}
          <div className="border border-[#C9A84C]/15 bg-[#141414] p-6 md:p-14">
            <div className="w-12 h-0.5 bg-[#C9A84C] mb-6 md:mb-8" />
            <h3 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
              {t('faq.ctaTitle')}
            </h3>
            <p className="text-xs md:text-base text-[#9A9182] mb-6 md:mb-10 max-w-lg leading-relaxed">
              {t('faq.ctaBody')}
            </p>

            <a
              href={toWhatsAppUrl(resolvedWhatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 md:gap-3 text-xs md:text-sm px-6 py-3 md:px-8 md:py-4"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              {t('faq.ctaButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
