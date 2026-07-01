import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, MapPin, Plane } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

function TransferBlock({
  icon: Icon,
  label,
  title,
  description,
  features,
  image,
  imageAlt,
  reversed,
  bookNowLabel,
}: {
  icon: React.ElementType
  label: string
  title: string
  description: string
  features: Array<string>
  image: string
  imageAlt: string
  reversed?: boolean
  bookNowLabel: string
}) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Text */}
      <div className={reversed ? 'md:order-2' : ''}>
        {/* Icon + label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#0B0B0B]" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-medium tracking-[.25em] uppercase text-[#C9A84C]">
            {label}
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-gradient-gold mb-4">
          {title}
        </h2>

        <p className="text-[#9A9182] leading-relaxed mb-6 text-sm md:text-base">
          {description}
        </p>

        {/* Feature list */}
        <ul className="space-y-2 mb-8">
          {features.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-[#9A9182]"
            >
              <Check
                className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5"
                strokeWidth={2}
              />
              {item}
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="rounded-none h-11 px-8 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium"
        >
          <Link to="/booking">
            {bookNowLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Image */}
      <div className={reversed ? 'md:order-1' : ''}>
        <div className="overflow-hidden border border-[#C9A84C]/12">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TransferServices() {
  const { t } = useTranslation()
  const airportFeatures = t('transferServices.airport.features', { returnObjects: true }) as string[]
  const cityFeatures = t('transferServices.cityToCity.features', { returnObjects: true }) as string[]
  return (
    <section className="py-16 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 md:px-12 space-y-20 md:space-y-32">
        {/* Airport transfers */}
        <TransferBlock
          icon={Plane}
          label={t('transferServices.airport.label')}
          title={t('transferServices.airport.title')}
          description={t('transferServices.airport.description')}
          features={airportFeatures}
          image="/airport-transfer.png"
          imageAlt="Airport transfer service Portugal"
          bookNowLabel={t('transferServices.bookNow')}
        />

        {/* Divider */}
        <div className="max-w-6xl mx-auto">
          <div className="divider-gold" />
        </div>

        {/* City to city */}
        <TransferBlock
          icon={MapPin}
          label={t('transferServices.cityToCity.label')}
          title={t('transferServices.cityToCity.title')}
          description={t('transferServices.cityToCity.description')}
          features={cityFeatures}
          image="/city-to-city.png"
          imageAlt="City to city transfer service Portugal"
          reversed
          bookNowLabel={t('transferServices.bookNow')}
        />
      </div>
    </section>
  )
}
