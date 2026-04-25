import { useState } from 'react'
import { Check } from 'lucide-react'
import type {
  BookingState,
  ContactDetails,
  TripDetails,
  Vehicle,
} from '@/features/booking/booking.types.ts'
import Step1TripDetails from '@/features/booking/steps/trip-details.tsx'
import Step2VehicleSelect from '@/features/booking/steps/vehicle-select.tsx'
import Step3ContactInfo from '@/features/booking/steps/contact-info.tsx'
import Step4Payment from '@/features/booking/steps/payment.tsx'
import BookingSummaryCard from '@/features/booking/booking-summary-card.tsx'

const STEPS = ['Trip Details', 'Select Vehicle', 'Contact Info', 'Payment']

const INITIAL_STATE: BookingState = {
  trip: {
    serviceType: 'transfer',
    pickup: '',
    dropoff: '',
    stops: [],
    date: undefined,
    time: '',
    hours: 3,
  },
  vehicle: null,
  notes: '',
  contact: {
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+351',
    flightNumber: '',
  },
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#9A9182] font-medium">
          Step {current + 1} of {total}
        </span>
      </div>
      <div className="flex gap-1.5 md:gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 transition-all duration-500 ${
              i <= current ? 'bg-[#C9A84C]' : 'bg-[#1C1C1C]'
            }`}
          />
        ))}
      </div>

      {/* Step labels */}
      <div className="flex items-center gap-0 mt-6 md:mt-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 flex items-center justify-center text-xs font-medium flex-shrink-0 transition-colors duration-200 ${
                  i < current
                    ? 'bg-[#C9A84C] text-[#0B0B0B]'
                    : i === current
                      ? 'border border-[#C9A84C] text-[#C9A84C]'
                      : 'border border-[#C9A84C]/20 text-[#9A9182]'
                }`}
              >
                {i < current ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={`text-xs hidden sm:block transition-colors duration-200 ${
                  i === current ? 'text-[#F5F0E8]' : 'text-[#9A9182]'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 transition-colors duration-200 ${
                  i < current ? 'bg-[#C9A84C]' : 'bg-[#C9A84C]/15'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export default function BookingWidget() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<BookingState>(INITIAL_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateTrip = (trip: TripDetails) => setState((s) => ({ ...s, trip }))
  const updateVehicle = (vehicle: Vehicle) => setState((s) => ({ ...s, vehicle }))
  const updateNotes = (notes: string) => setState((s) => ({ ...s, notes }))
  const updateContact = (contact: ContactDetails) => setState((s) => ({ ...s, contact }))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // TODO: integrate Stripe + POST /api/bookings
      await new Promise((r) => setTimeout(r, 1500)) // mock delay
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#141414] border border-[#C9A84C]/15 p-8 md:p-16 text-center space-y-4">
        <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#0B0B0B]" strokeWidth={2.5} />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">
          Booking Confirmed
        </h2>
        <p className="text-[#9A9182]">
          Thank you, {state.contact.fullName}! Your booking has been received. You'll get a confirmation email at {state.contact.email}.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <StepIndicator current={step} total={STEPS.length} />

      <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-start">

        {/* Step content */}
        <div className="md:col-span-2">
          {step === 0 && (
            <Step1TripDetails
              data={state.trip}
              onChange={updateTrip}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <Step2VehicleSelect
              trip={state.trip}
              selected={state.vehicle}
              notes={state.notes}
              onSelect={updateVehicle}
              onNotesChange={updateNotes}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && state.vehicle && (
            <Step3ContactInfo
              data={state.contact}
              trip={state.trip}
              vehicle={state.vehicle}
              onChange={updateContact}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && state.vehicle && (
            <Step4Payment
              vehicle={state.vehicle}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Sidebar */}
        <BookingSummaryCard state={state} currentStep={step} />
      </div>
    </div>
  )
}