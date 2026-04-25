import { Briefcase, Users } from 'lucide-react'

export interface FleetCardProps {
  name: string
  image: string
  passengers: number
  suitcases: number
}

export default function FleetCard({ name, image, passengers, suitcases }: FleetCardProps) {
  return (
    <div className="group bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 overflow-hidden transition-colors duration-200">

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-[#1C1C1C]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={300}
        />
      </div>

      {/* Info */}
      <div className="p-2 md:p-4">
        <h4 className="font-serif font-light text-gradient-gold text-xs md:text-base mb-1 md:mb-2">
          {name}
        </h4>
        <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-sm text-[#9A9182]">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3 md:w-4 md:h-4" strokeWidth={1.5} />
            {passengers}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 md:w-4 md:h-4" strokeWidth={1.5} />
            {suitcases} suitcases
          </span>
        </div>
      </div>

    </div>
  )
}