import { useTranslation } from 'react-i18next'

export function CorporateQuote() {
  const { t } = useTranslation()
  return (
    <section className="py-32 md:py-40 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
        <div className="w-px h-16 bg-[#C9A84C]/40 mx-auto mb-12" />
        <p className="font-serif text-2xl md:text-4xl text-[#F5F0E8]/90 font-light italic leading-[1.4]">
          {t('corporateMobility.quote.text')}
        </p>
        <p className="mt-10 text-base md:text-lg text-[#F5F0E8]/55 leading-[1.85] font-light">
          {t('corporateMobility.quote.body')}
        </p>
      </div>
    </section>
  )
}
