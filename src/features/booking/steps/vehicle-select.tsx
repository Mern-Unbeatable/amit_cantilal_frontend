import {
  Briefcase,
  Car,
  ChevronLeft,
  ChevronRight,
  Users,

} from 'lucide-react'
import type { TripDetails, Vehicle } from '../booking.types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'
import { getHourlyRate, getTransferPrice } from '@/features/booking/pricing.ts'

interface Props {
  trip: TripDetails
  selected: Vehicle | null
  notes: string
  onSelect: (v: Vehicle) => void
  onNotesChange: (n: string) => void
  onNext: () => void
  onBack: () => void
}

// ─── Vehicle category label ───────────────────────────────────────────────────

function categoryLabel(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('sprinter')) return 'MINIBUS'
  if (lower.includes('v-class') || lower.includes('v class')) return 'MINIVAN'
  if (lower.includes('s-class') || lower.includes('s class')) return 'FIRST'
  if (lower.includes('e-class') || lower.includes('e class')) return 'BUSINESS'
  if (lower.includes('suv')) return 'SUV'
  if (lower.includes('tesla')) return 'ELECTRIC'
  return 'EXECUTIVE'
}

// ─── Vehicle Card — Rolzo-style list item ─────────────────────────────────────

function VehicleCard({
  vehicle,
  selected,
  onSelect,
  serviceType,
  hours,
  hourlyRate,
}: {
  vehicle: Vehicle
  selected: boolean
  onSelect: () => void
  serviceType: TripDetails['serviceType']
  hours?: number
  hourlyRate: number | null
}) {
  const isHourly = serviceType === 'hourly'
  const tripPrice = vehicle.price
  const extraHourPrice = hourlyRate

  return (
    <div
      onClick={onSelect}
      className={`
        group relative cursor-pointer flex flex-col md:flex-row transition-all duration-200
        border-b border-[#C9A84C]/10 last:border-b-0 overflow-hidden
        ${selected ? 'bg-[#111008]' : 'bg-[#0B0B0B] hover:bg-[#0f0f0f]'}
      `}
      style={{ minHeight: 160 }}
    >
      {/* Selected accent bar */}
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A84C] z-10" />
      )}

      {/* LEFT — image, edge-to-edge, no padding */}
      <div className="w-full md:w-3/5 flex-shrink-0 relative overflow-hidden">
        <img
          src={vehicle.image ?? ''}
          alt={vehicle.name}
          className="relative md:absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* RIGHT — all info, padded */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-5">
        {/* Top: category + specs */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-[10px] tracking-[.15em] text-[#6B6460] font-medium">
              {categoryLabel(vehicle.name)}
            </p>
            {vehicle.is_electric && (
              <span className="text-[10px] text-green-500 font-medium tracking-wide flex-shrink-0">
                ELECTRIC
              </span>
            )}
          </div>

          <h3 className="font-serif font-light text-[#F5F0E8] text-sm md:text-base leading-tight mb-3">
            {vehicle.name}
          </h3>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-[#6B6460]">
              <Users className="w-3 h-3" strokeWidth={1.5} />
              {vehicle.passengers}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#6B6460]">
              <Briefcase className="w-3 h-3" strokeWidth={1.5} />
              {vehicle.suitcases}
            </span>
          </div>
        </div>

        {/* Bottom: price */}
        <div className="mt-3 pt-3 border-t border-[#C9A84C]/10">
          {isHourly ? (
            <>
              <p className="text-sm md:text-base font-medium text-[#F5F0E8] tabular-nums">
                €{tripPrice.toFixed(2)}
                <span className="text-xs text-[#6B6460] font-normal"> /hr</span>
              </p>
              <p className="text-xs text-[#6B6460] mt-0.5 tabular-nums">
                Est. total: €{(tripPrice * (hours ?? 1)).toFixed(2)}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm md:text-base font-medium text-[#F5F0E8] tabular-nums">
                {tripPrice > 0 ? `€${tripPrice.toFixed(2)}` : '—'}
              </p>
              {extraHourPrice && (
                <p className="text-xs text-[#6B6460] mt-0.5 tabular-nums">
                  Extra hour: €{extraHourPrice.toFixed(2)}
                </p>
              )}
            </>
          )}

          {/* Select indicator */}
          {selected && (
            <p className="text-[10px] text-[#C9A84C] tracking-[.1em] uppercase mt-2 font-medium">
              Selected ✓
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Fleet section ────────────────────────────────────────────────────────────

function FleetSection({
  label,
  icon,
  labelColor,
  badge,
  vehicles,
  selected,
  trip,
  resolvePrice,
  onSelect,
}: {
  label: string
  icon: React.ReactNode
  labelColor: string
  badge?: string
  vehicles: Array<Vehicle>
  selected: Vehicle | null
  trip: TripDetails
  resolvePrice: (v: Vehicle) => number
  onSelect: (v: Vehicle) => void
}) {
  if (vehicles.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b border-[#C9A84C]/10">
        <span className={labelColor}>{icon}</span>
        <h3 className={`font-serif text-sm font-light ${labelColor}`}>
          {label}
        </h3>
        {badge && (
          <span className={`text-[10px] ${labelColor} opacity-60 italic`}>
            {badge}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4 md:px-6 py-4">
        {vehicles.map((v) => {
          const price = resolvePrice(v)
          const hourlyRate = getHourlyRate(v.name)
          return (
            <VehicleCard
              key={v.id}
              vehicle={{ ...v, price }}
              selected={selected?.id === v.id}
              onSelect={() => onSelect({ ...v, price })}
              serviceType={trip.serviceType}
              hours={trip.hours}
              hourlyRate={hourlyRate}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Step2VehicleSelect({
  trip,
  selected,
  notes,
  onSelect,
  onNotesChange,
  onNext,
  onBack,
}: Props) {
  const { data: fleet = [], isFetching } = useFleet()
  const eligibleFleet = fleet.filter((v) => v.passengers >= trip.passengers)

  const isElectric = (v: Vehicle) =>
    v.fuel_type === 'electric' ||
    v.category === 'electric' ||
    Boolean(v.is_electric)

  const VEHICLE_ORDER = ['eqe', 'eqv', 'eqs', 'e-class', 'e class', 'v-class', 'v class', 's-class', 's class', 'sprinter']
  const vehicleSortIndex = (name: string) => {
    const lower = name.toLowerCase()
    const idx = VEHICLE_ORDER.findIndex((k) => lower.includes(k))
    return idx === -1 ? 99 : idx
  }

  const combustion = eligibleFleet
    .filter((v) => !isElectric(v))
    .sort((a, b) => vehicleSortIndex(a.name) - vehicleSortIndex(b.name))

  const resolvePrice = (v: Vehicle): number => {
    if (trip.serviceType === 'hourly') {
      return getHourlyRate(v.name) ?? v.price
    }
    return (
      getTransferPrice(
        trip.pickupCoords,
        trip.pickup,
        trip.dropoffCoords,
        trip.dropoff,
        v.name,
      ) ?? v.price
    )
  }

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 space-y-0">
      {/* Header */}
      <div className="p-5 md:p-8 pb-0">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold mb-6">
          Select Vehicle
        </h2>

        {/* Trip summary pill */}
        <div className="bg-[#0B0B0B] border border-[#C9A84C]/15 p-4 space-y-1.5 mb-6">
          <p className="text-xs font-medium text-[#C9A84C] flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
            Booking Summary
          </p>
          {[
            {
              label: 'Type',
              value:
                trip.serviceType === 'transfer' ? 'Transfer' : 'Hourly Service',
            },
            { label: 'Pickup', value: trip.pickup },
            ...(trip.serviceType === 'transfer'
              ? [{ label: 'Destination', value: trip.dropoff }]
              : [
                  {
                    label: 'Duration',
                    value: `${trip.hours ?? 1} hour${(trip.hours ?? 1) !== 1 ? 's' : ''}`,
                  },
                ]),
            { label: 'Passengers', value: String(trip.passengers) },
            {
              label: 'Date',
              value:
                trip.date?.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }) ?? '—',
            },
            { label: 'Time', value: trip.time || '—' },
          ].map(({ label, value }) => (
            <p key={label} className="text-xs text-[#9A9182]">
              <span className="text-[#F5F0E8] font-medium">{label}:</span>{' '}
              {value}
            </p>
          ))}
        </div>

        <p className="text-sm text-[#9A9182] pb-5 border-b border-[#C9A84C]/10">
          Select a vehicle that fits your group. All prices are fixed — no surprises.
        </p>
      </div>

      {/* Fleet list */}
      <div className="bg-[#0B0B0B] border-y border-[#C9A84C]/10">
        {isFetching ? (
          <div className="flex items-center justify-center gap-3 p-8 text-[#9A9182]">
            <div className="w-4 h-4 border border-gold/40 border-t-gold rounded-full animate-spin" />
            <span className="text-sm">Loading fleet...</span>
          </div>
        ) : (
          <>
            {/* <FleetSection*/}
            {/*  label="Electric Fleet"*/}
            {/*  icon={<Zap className="w-4 h-4" strokeWidth={1.5} />}*/}
            {/*  labelColor="text-green-500"*/}
            {/*  badge="Zero Emissions"*/}
            {/*  vehicles={electric}*/}
            {/*  selected={selected}*/}
            {/*  trip={trip}*/}
            {/*  resolvePrice={resolvePrice}*/}
            {/*  onSelect={onSelect}*/}
            {/* />*/}
            <FleetSection
              label="Combustion Fleet"
              icon={<Car className="w-4 h-4" strokeWidth={1.5} />}
              labelColor="text-[#9A9182]"
              badge="Long-distance"
              vehicles={combustion}
              selected={selected}
              trip={trip}
              resolvePrice={resolvePrice}
              onSelect={onSelect}
            />
            {eligibleFleet.length === 0 && (
              <p className="text-sm text-[#9A9182] p-6">
                No vehicles available for {trip.passengers} passengers...
              </p>
            )}
          </>
        )}
      </div>

      {/* Special requests + policy + nav */}
      <div className="p-5 md:p-8 space-y-6">
        {/* Special requests */}
        <div className="space-y-2">
          <Label className="text-sm text-[#9A9182]">
            Special Requests & Notes
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Child seats, wheelchair accessibility, special assistance, luggage requirements..."
            className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50 min-h-[100px] resize-none"
          />
        </div>

        {/* Cancellation policy */}
        <div className="bg-[#0B0B0B] border border-[#C9A84C]/10 p-4 text-xs space-y-3">
          <p className="font-medium text-[#F5F0E8]">Cancellation Policy</p>
          <div className="grid grid-cols-2 gap-4 text-[#9A9182]">
            <div>
              <p className="font-medium text-[#F5F0E8]/70 mb-1">Sedan & Van</p>
              <p>Less than 24 hours: 100% charged</p>
              <p>Less than 48 hours: 50% charged</p>
              <p>More than 48 hours: Full refund</p>
            </div>
            <div>
              <p className="font-medium text-red-400 mb-1">Sprinter</p>
              <p className="text-red-400/80">100% charged for any cancellation</p>
              <p className="text-[#9A9182]/60 italic mt-1">Non-refundable. No refunds after booking confirmation.</p>
            </div>
          </div>
          <p className="italic text-[#9A9182]/60">
            All bookings are subject to availability confirmation
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-14 rounded-none border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/40 text-base"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!selected}
            className="flex-1 h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-base tracking-[.08em] uppercase disabled:opacity-40"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}