import { useTranslation } from 'react-i18next'

export function EventsExperience() {
  const { t } = useTranslation()
  const pillars = t('specialEvents.experience.pillars', { returnObjects: true }) as Array<{ title: string; desc: string }>
  return (
    <section className="py-28 md:py-32 border-y border-[#C9A84C]/10 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-16 font-light">
          {t('specialEvents.experience.tag')}
        </p>
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          {pillars.map((p, idx) => (
            <div key={p.title} className="text-center md:text-left">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-5 font-light leading-tight">
                {p.title}
              </h2>
              <p className="text-[#F5F0E8]/60 leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
