import {
  Briefcase,
  Car,
  ChevronLeft,
  ChevronRight,
  Users,
  Zap,
} from 'lucide-react'
import type { TripDetails, Vehicle } from '../booking.types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'

interface Props {
  trip: TripDetails
  selected: Vehicle | null
  notes: string
  onSelect: (v: Vehicle) => void
  onNotesChange: (n: string) => void
  onNext: () => void
  onBack: () => void
}

function VehicleCard({
  vehicle,
  selected,
  onSelect,
}: {
  vehicle: Vehicle
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer bg-[#0B0B0B] border-2 overflow-hidden flex flex-col transition-all duration-200 ${
        selected
          ? 'border-[#C9A84C]'
          : 'border-[#C9A84C]/12 hover:border-[#C9A84C]/50'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1C1C]">
        <img
          src={vehicle.image ?? ''}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Electric badge */}
        {vehicle.is_electric && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 font-medium">
            Electric
          </span>
        )}

        {/* Selected indicator */}
        {selected && (
          <div className="absolute inset-0 bg-[#C9A84C]/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#C9A84C] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#0B0B0B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <h3 className="font-serif font-light text-gradient-gold text-sm md:text-lg leading-tight mb-1 md:mb-3">
          {vehicle.name}
        </h3>
        <p className="text-xs text-[#9A9182] mb-3">{vehicle.description}</p>

        {/* Specs */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#9A9182] bg-[#141414] px-2.5 py-1">
            <Users className="w-3.5 h-3.5 text-[#C9A84C]" strokeWidth={1.5} />
            {vehicle.passengers}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#9A9182] bg-[#141414] px-2.5 py-1">
            <Briefcase
              className="w-3.5 h-3.5 text-[#C9A84C]"
              strokeWidth={1.5}
            />
            {vehicle.suitcases}
          </span>
        </div>

        {/* Price + select */}
        <div className="mt-auto border-t border-[#C9A84C]/12 pt-3">
          <p className="text-xs text-[#9A9182] mb-1">Price per trip</p>
          <p className="font-serif text-xl font-light text-gradient-gold mb-3">
            €{vehicle.price}
          </p>
          <Button
            onClick={onSelect}
            className={`w-full h-9 rounded-none text-sm font-medium ${
              selected
                ? 'bg-[#C9A84C] text-[#0B0B0B]'
                : 'bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0B0B0B]'
            } transition-colors`}
          >
            {selected ? 'Selected ✓' : 'Select'}
            {!selected && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Step2VehicleSelect({
  trip,
  selected,
  notes,
  onSelect,
  onNotesChange,
  onNext,
  onBack,
}: Props) {
  const { data: fleet = [] } = useFleet()
  const eligibleFleet = fleet.filter((vehicle) => vehicle.passengers >= trip.passengers)
  const isElectricVehicle = (vehicle: Vehicle) =>
    vehicle.fuel_type === 'electric' || vehicle.category === 'electric' || Boolean(vehicle.is_electric)

  const electric = eligibleFleet.filter(isElectricVehicle)
  const combustion = eligibleFleet.filter((v) => !isElectricVehicle(v))

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-8">
      <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">
        Select Vehicle
      </h2>

      {/* Trip summary pill */}
      <div className="bg-[#0B0B0B] border border-[#C9A84C]/15 p-4 space-y-1.5">
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
          { label: 'Destination', value: trip.dropoff },
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
            <span className="text-[#F5F0E8] font-medium">{label}:</span> {value}
          </p>
        ))}
      </div>

      <p className="text-sm text-[#9A9182]">
        Our fleet is primarily electric (Mercedes-Benz EQ series & Tesla).
        Combustion vehicles available for long-distance journeys.
      </p>

      {/* Electric fleet */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap
            className="w-4 h-4 md:w-5 md:h-5 text-green-500"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-lg md:text-xl font-light text-green-500">
            Electric Fleet
          </h3>
          <span className="text-xs text-green-500/60 italic">
            Zero Emissions
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {electric.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              selected={selected?.id === v.id}
              onSelect={() => onSelect(v)}
            />
          ))}
        </div>
      </div>

      {/* Combustion fleet */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Car
            className="w-4 h-4 md:w-5 md:h-5 text-[#9A9182]"
            strokeWidth={1.5}
          />
          <h3 className="font-serif text-lg md:text-xl font-light text-[#9A9182]">
            Combustion Fleet
          </h3>
          <span className="text-xs text-[#9A9182]/60 italic">
            Long-distance
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {combustion.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              selected={selected?.id === v.id}
              onSelect={() => onSelect(v)}
            />
          ))}
        </div>
      </div>

      {eligibleFleet.length === 0 && (
        <p className="text-sm text-[#9A9182] border border-[#C9A84C]/15 bg-[#0B0B0B] p-4">
          No vehicles are currently available for {trip.passengers} passengers.
          Please reduce passenger count or try again later.
        </p>
      )}

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
            <p>Less than 12 hours: 100% charged</p>
            <p>Less than 48 hours: 50% charged</p>
            <p>More than 48 hours: Full refund</p>
          </div>
          <div>
            <p className="font-medium text-[#F5F0E8]/70 mb-1">Sprinter</p>
            <p>Less than 48 hours: 100% charged</p>
            <p>Less than 4 days: 50% charged</p>
            <p>More than 4 days: Full refund</p>
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
  )
}
