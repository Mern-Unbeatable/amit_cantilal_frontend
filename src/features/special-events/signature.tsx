import { useTranslation } from 'react-i18next'

export function EventsSignature() {
  const { t } = useTranslation()
  const items = t('specialEvents.signature.items', { returnObjects: true }) as string[]
  return (
    <section className="py-28 md:py-36 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
            {t('specialEvents.signature.tag')}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F0E8] font-light leading-tight">
            {t('specialEvents.signature.title')}
          </h2>
        </div>

        <ul className="grid md:grid-cols-2 gap-x-16 gap-y-0 max-w-3xl mx-auto">
          {items.map((text, idx) => (
            <li
              key={text}
              className="flex items-start gap-5 py-5 border-b border-[#C9A84C]/10"
            >
              <span className="text-[10px] tracking-[0.3em] text-[#C9A84C] mt-1.5 font-light shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[#F5F0E8]/75 font-light leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
