import { useTranslation } from 'react-i18next'

export function EventsIntro() {
  const { t } = useTranslation()
  return (
    <section className="py-28 md:py-40 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
        <div className="w-px h-16 bg-[#C9A84C]/40 mx-auto mb-12" />
        <p className="text-lg md:text-2xl text-[#F5F0E8]/80 leading-[1.7] font-light">
          {t('specialEvents.intro.lead')}
        </p>
        <p className="mt-10 text-base md:text-lg text-[#F5F0E8]/55 leading-[1.85] font-light">
          {t('specialEvents.intro.body1')}
        </p>
        <p className="mt-6 text-base md:text-lg text-[#F5F0E8]/55 leading-[1.85] font-light">
          {t('specialEvents.intro.body2')}
        </p>
      </div>
    </section>
  )
}
