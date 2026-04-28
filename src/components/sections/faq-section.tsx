import { MessageCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  title: string
  items: Array<FaqItem>
}

const DEFAULT_FAQ_DATA: Array<FaqCategory> = [
  {
    title: 'Booking & Reservations',
    items: [
      {
        question: 'How do I book a transfer or tour?',
        answer:
          "You can book directly through our website or contact us on WhatsApp for a personalised quote. Once we confirm availability, you'll receive a booking confirmation by email.",
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 48 hours in advance for standard transfers and 4+ days for Sprinter/group bookings. Same-day requests can be handled via WhatsApp subject to availability.',
      },
      {
        question: 'Can I modify my booking after confirmation?',
        answer:
          "Yes — modifications are welcome subject to availability. Contact us as early as possible and we'll do our best to accommodate changes at no extra charge.",
      },
    ],
  },
  {
    title: 'Payment & Pricing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept major credit/debit cards, bank transfers, and PayPal. Cash payment on the day is also available for certain services — confirm at time of booking.',
      },
      {
        question: 'Are your prices fixed or can they change?',
        answer:
          'All quoted prices are fixed and inclusive of VAT. There are no hidden fees — tolls, parking, and waiting time within the included grace period are all covered.',
      },
      {
        question: 'How does PayPal payment work?',
        answer:
          "After booking confirmation, we'll send a PayPal payment request to your email. You can pay with your PayPal balance or any linked card — no PayPal account required.",
      },
    ],
  },
  {
    title: 'Cancellation Policy',
    items: [
      {
        question: 'What is your cancellation policy?',
        answer:
          'Cancellations more than 48 hours before your Sedan/Van transfer receive a full refund. Under 48 hours, 50% is charged; under 24 hours, 100% is charged. Sprinter bookings have extended windows — see our Booking Policies page for full details.',
      },
    ],
  },
  {
    title: 'Service Details',
    items: [
      {
        question: 'How much waiting time is included?',
        answer:
          'Airport pickups include 60 minutes of complimentary waiting time after the flight lands. All other pickups include 15 minutes. Additional waiting time is billed at an hourly rate.',
      },
      {
        question: 'Are your vehicles electric?',
        answer:
          "Our fleet includes hybrid and electric Mercedes-Benz models. If you have a preference, let us know at the time of booking and we'll do our best to accommodate.",
      },
      {
        question: 'Do your drivers speak English?',
        answer:
          'Yes — all our chauffeurs are fluent in English and Portuguese. Some also speak French and Spanish. Language preference can be noted at the time of booking.',
      },
      {
        question: 'What is included in the tour price?',
        answer:
          'All tours include the chauffeur, vehicle, fuel, tolls, and any planned stops. Entrance fees to attractions and meals are not included unless explicitly stated in your quote.',
      },
      {
        question: 'Do you have vehicles for longer routes?',
        answer:
          'Absolutely. We serve routes across Portugal and into Spain. Our Sprinter is ideal for groups or extended itineraries. Contact us for a custom quote.',
      },
    ],
  },
]

interface FaqSectionProps {
  data?: Array<FaqCategory>
  whatsappNumber?: string
}

export function FaqSection({
  data = DEFAULT_FAQ_DATA,
  whatsappNumber = '351914578214',
}: FaqSectionProps) {
  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-14">
          {data.map((category, i) => (
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
              Still have <em className="italic">questions?</em>
            </h3>
            <p className="text-xs md:text-base text-[#9A9182] mb-6 md:mb-10 max-w-lg leading-relaxed">
              Our team is available 24/7. Reach out on WhatsApp and we'll get
              back to you right away.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 md:gap-3 text-xs md:text-sm px-6 py-3 md:px-8 md:py-4"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
