import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {areas} from "@/data";

const CoverageArea = () => {
  const { t } = useTranslation()
  const translatedAreas = t('coverageArea.areas', { returnObjects: true }) as Array<{ title: string; description: string }>
  const mergedAreas = areas.map((area, idx) => ({ ...area, ...translatedAreas[idx] }))
  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-6 md:mb-16">
            <div className="tag-gold mb-4">{t('coverageArea.tag')}</div>
            <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
              {t('coverageArea.title')}
            </h2>
            <p className="text-sm md:text-xl text-[#9A9182] max-w-3xl mx-auto">
              {t('coverageArea.subtitle')}
            </p>
          </div>

          {/* 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            {mergedAreas.map(({ title, description, cities }) => (
              <div
                key={title}
                className="group bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200 p-4 md:p-8 text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-[#C9A84C] mb-3 md:mb-6">
                  <MapPin className="w-5 h-5 md:w-7 md:h-7 text-[#0B0B0B]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm md:text-2xl font-light text-gradient-gold mb-2 md:mb-4">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed mb-3 md:mb-6">
                  {description}
                </p>

                {/* City pills */}
                <div className="hidden md:flex flex-wrap justify-center gap-2">
                  {cities.map((city) => (
                    <span
                      key={city}
                      className="text-[10px] font-medium tracking-[.15em] uppercase text-[#C9A84C] border border-[#C9A84C]/25 px-3 py-1"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>

  );
};

export default CoverageArea;