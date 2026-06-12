import { Link } from '@tanstack/react-router'
import { ArrowRight, Check, MapPin, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'

const airportFeatures = [
  '60 min complimentary wait from landing',
  'Real-time flight tracking',
  'Meet & greet with name board at arrivals',
  'Luggage assistance included',
  'All major Portuguese airports covered',
]

const cityFeatures = [
  'Lisbon ↔ Porto, Lisbon ↔ Algarve and more',
  'Fixed price — no surge or meter running',
  'Door-to-door service across Portugal',
  'Available for Spain cross-border routes',
  'Comfortable for long distances — Mercedes S-Class & Sprinter',
]

function TransferBlock({
  icon: Icon,
  label,
  title,
  description,
  features,
  image,
  imageAlt,
  reversed,
}: {
  icon: React.ElementType
  label: string
  title: string
  description: string
  features: Array<string>
  image: string
  imageAlt: string
  reversed?: boolean
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
            Book Now
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
  return (
    <section className="py-16 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 md:px-12 space-y-20 md:space-y-32">
        {/* Airport transfers */}
        <TransferBlock
          icon={Plane}
          label="Airport Transfer"
          title="Airport Transfers"
          description="Seamless airport pickups and drop-offs across Portugal. We include up to 60 minutes of complimentary waiting time from landing, with real-time flight tracking so your chauffeur is always ready. Our drivers meet you at arrivals with a name board, handle your luggage, and take you to your destination in a premium Mercedes-Benz vehicle."
          features={airportFeatures}
          image="/airport-transfer.png"
          imageAlt="Airport transfer service Portugal"
        />

        {/* Divider */}
        <div className="max-w-6xl mx-auto">
          <div className="divider-gold" />
        </div>

        {/* City to city */}
        <TransferBlock
          icon={MapPin}
          label="City to City"
          title="City to City Transfers"
          description="Travel between Portugal's major cities in total comfort. Whether it's Lisbon to Porto, Lisbon to the Algarve, or a cross-border route into Spain, we provide fixed-price transfers with no surprises — door to door, in executive vehicles built for long distances."
          features={cityFeatures}
          image="/city-to-city.png"
          imageAlt="City to city transfer service Portugal"
          reversed
        />
      </div>
    </section>
  )
}
