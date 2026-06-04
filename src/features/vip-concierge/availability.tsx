import { MapPin, Plane } from 'lucide-react'

const AIRPORTS = [
  { name: 'Lisbon Airport', code: 'LIS · Humberto Delgado' },
  { name: 'Porto Airport', code: 'OPO · Francisco Sá Carneiro' },
]

export function VipConciergeAvailability() {
  return (
    <section className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-5">
          <Plane className="w-3 h-3" />
          Availability
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15]">
          Available at
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {AIRPORTS.map((airport) => (
          <div
            key={airport.name}
            className="relative p-10 md:p-12 border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm text-center hover:border-[#C9A84C]/40 transition-all duration-700 group"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#C9A84C]/40" />
            <MapPin
              className="w-5 h-5 text-[#C9A84C] mx-auto mb-5 transition-transform duration-700 group-hover:-translate-y-0.5"
              strokeWidth={1.25}
            />
            <h3 className="font-serif text-xl md:text-2xl font-light text-[#F5F0E8] mb-2">
              {airport.name}
            </h3>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C]/70">
              {airport.code}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs md:text-sm text-[#F5F0E8]/45 italic font-light mt-10 max-w-2xl mx-auto">
        Services are coordinated through our trusted aviation hospitality partners.
      </p>
    </section>
  )
}
