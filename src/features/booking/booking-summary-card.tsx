import type { BookingFormState } from './booking.types'

interface Props {
  state: BookingFormState
  currentStep: number
  amount: number | null
}

export default function BookingSummaryCard({ state, currentStep, amount }: Props) {
  const { trip, vehicle } = state

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-6 space-y-4 sticky top-28">
      <div className="w-8 h-0.5 bg-[#C9A84C] mb-2" />
      <p className="font-serif text-sm text-[#C9A84C]">Booking Summary</p>

      <div className="space-y-2 text-xs">
        {/* Service type */}
        <div className="flex justify-between">
          <span className="text-[#9A9182]">Service</span>
          <span className="text-[#F5F0E8] capitalize">{trip.serviceType}</span>
        </div>

        {/* Route */}
        {trip.pickup && (
          <div className="flex justify-between gap-4">
            <span className="text-[#9A9182] flex-shrink-0">From</span>
            <span className="text-[#F5F0E8] text-right truncate">{trip.pickup}</span>
          </div>
        )}
        {trip.dropoff && (
          <div className="flex justify-between gap-4">
            <span className="text-[#9A9182] flex-shrink-0">To</span>
            <span className="text-[#F5F0E8] text-right truncate">{trip.dropoff}</span>
          </div>
        )}

        {/* Date + time */}
        {trip.date && (
          <div className="flex justify-between">
            <span className="text-[#9A9182]">Date</span>
            <span className="text-[#F5F0E8]">
              {trip.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        )}
        {trip.time && (
          <div className="flex justify-between">
            <span className="text-[#9A9182]">Time</span>
            <span className="text-[#F5F0E8]">{trip.time}</span>
          </div>
        )}

        {trip.serviceType === 'transfer' && trip.distanceKm && (
          <div className="flex justify-between">
            <span className="text-[#9A9182]">Distance</span>
            <span className="text-[#F5F0E8]">{trip.distanceKm.toFixed(1)} km</span>
          </div>
        )}

        {/* Hourly duration */}
        {trip.serviceType === 'hourly' && trip.hours && (
          <div className="flex justify-between">
            <span className="text-[#9A9182]">Duration</span>
            <span className="text-[#F5F0E8]">{trip.hours}h</span>
          </div>
        )}

        {/* Passengers */}
        {trip.passengers > 0 && (
          <div className="flex justify-between">
            <span className="text-[#9A9182]">Passengers</span>
            <span className="text-[#F5F0E8]">{trip.passengers}</span>
          </div>
        )}

        {/* Vehicle */}
        {vehicle && currentStep >= 2 && (
          <>
            <div className="border-t border-[#C9A84C]/10 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-[#9A9182]">Vehicle</span>
                <span className="text-[#F5F0E8] text-right">{vehicle.name}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Total */}
      {vehicle && amount && (
        <div className="border-t border-[#C9A84C]/10 pt-3 flex justify-between items-center">
          <span className="text-xs text-[#9A9182]">Total</span>
          <span className="font-serif text-lg text-gradient-gold">€{amount.toFixed(2)}</span>
        </div>
      )}

      {!vehicle && (
        <div className="border-t border-[#C9A84C]/10 pt-3">
          <p className="text-xs text-[#9A9182]/60 italic">Select a vehicle to see pricing</p>
        </div>
      )}
    </div>
  )
}