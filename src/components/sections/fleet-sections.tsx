import { Car, Zap } from 'lucide-react'
import type {FleetCardProps} from '@/features/fleet/fleet-card.tsx';
import FleetCard from '@/features/fleet/fleet-card.tsx'

// ─── Static data (replace with useQuery call when backend is ready) ───────────

const electricFleet: Array<FleetCardProps> = [
  {
    name: 'Mercedes-Benz EQE',
    image: '/mercedes-eqe-hotel-clean-Bu__kXyP.webp',
    passengers: 2,
    suitcases: 2,
  },
  {
    name: 'Mercedes-Benz EQS',
    image: '/mercedes-eqs-premium-CZqyaYaU.webp',
    passengers: 2,
    suitcases: 2,
  },
  {
    name: 'Mercedes-Benz EQV',
    image: '/mercedes-eqv-luxury-clean-lg8pM9c8.webp',
    passengers: 6,
    suitcases: 6,
  },
]

const dieselFleet: Array<FleetCardProps> = [
  {
    name: 'Mercedes-Benz E-Class',
    image: '/e-class.png',
    passengers: 2,
    suitcases: 2,
  },
  {
    name: 'Mercedes-Benz S-Class',
    image: '/s-class.png',
    passengers: 2,
    suitcases: 2,
  },
  {
    name: 'Mercedes-Benz V-Class',
    image: '/v-class.png',
    passengers: 6,
    suitcases: 6,
  },
  {
    name: 'Mercedes-Benz Sprinter',
    image: '/mercedes-sprinter-VcRR1Ns-.webp',
    passengers: 9,
    suitcases: 9,
  },
]

// ─── Sub-component ─────────────────────────────────────────────────────────────

interface FleetGroupProps {
  label: string
  icon: React.ReactNode
  vehicles: Array<FleetCardProps>
}

function FleetGroup({ label, icon, vehicles }: FleetGroupProps) {
  return (
    <div className="mb-8 md:mb-16">
      {/* Group label */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
        {icon}
        <h3 className="font-serif text-lg md:text-2xl font-light text-gradient-gold">
          {label}
        </h3>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {vehicles.map((vehicle) => (
          <FleetCard key={vehicle.name} {...vehicle} />
        ))}
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function FleetSection() {
  return (
    <section className="py-10 md:py-24 bg-[#141414] border-y border-[#C9A84C]/10">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-16">
            <div className="tag-gold mb-4">The Fleet</div>
            <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
              Our Premium &amp; First Class Fleet
            </h2>
            <p className="text-sm md:text-xl text-[#9A9182] max-w-3xl mx-auto">
              Luxury vehicles matching the highest market standards
            </p>
          </div>

          {/* Electric fleet */}
          <FleetGroup
            label="Electric Fleet"
            icon={
              <Zap
                className="w-4 h-4 md:w-6 md:h-6 text-green-500"
                strokeWidth={1.5}
              />
            }
            vehicles={electricFleet}
          />

          {/* Diesel fleet */}
          <FleetGroup
            label="Diesel Fleet (Long Distance)"
            icon={
              <Car
                className="w-4 h-4 md:w-6 md:h-6 text-[#9A9182]"
                strokeWidth={1.5}
              />
            }
            vehicles={dieselFleet}
          />
        </div>
      </div>
    </section>
  )
}
