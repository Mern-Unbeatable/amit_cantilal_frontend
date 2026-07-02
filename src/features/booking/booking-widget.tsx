import { useRef, useState } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import type {
  BookingFormState,
  ContactDetails,
  CreateBookingPayload,
  TripDetails,
  Vehicle,
  VehicleType,
} from '@/features/booking/booking.types.ts'
import Step1TripDetails from '@/features/booking/steps/trip-details.tsx'
import Step2VehicleSelect from '@/features/booking/steps/vehicle-select.tsx'
import Step3ContactInfo from '@/features/booking/steps/contact-info.tsx'
import Step4Payment from '@/features/booking/steps/payment.tsx'
import BookingSummaryCard from '@/features/booking/booking-summary-card.tsx'
import { useCreateBooking } from '@/features/booking/booking.hooks.ts'
import { getHourlyRate } from '@/features/booking/pricing.ts'


const STEPS = ['Trip Details', 'Select Vehicle', 'Contact Info', 'Payment']

const INITIAL_STATE: BookingFormState = {
  trip: {
    serviceType: 'transfer',
    pickup: '',
    dropoff: '',
    stops: [],
    passengers: 1,
    date: undefined,
    time: '',
    distanceKm: undefined,
    hours: 1,
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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

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
  const [state, setState] = useState<BookingFormState>(INITIAL_STATE)
  const [stripeError, setStripeError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const createBooking = useCreateBooking()
  const widgetRef = useRef<HTMLDivElement>(null)

  const updateTrip = (trip: TripDetails) => setState((s) => ({ ...s, trip }))
  const updateVehicle = (vehicle: Vehicle) => setState((s) => ({ ...s, vehicle }))
  const updateNotes = (notes: string) => setState((s) => ({ ...s, notes }))
  const updateContact = (contact: ContactDetails) => setState((s) => ({ ...s, contact }))

  const goToStep = (n: number) => {
    setStep(n)
    setTimeout(() => {
      widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50) // small delay lets React render first
  }

  const inferVehicleType = (vehicle: Vehicle | null): VehicleType | undefined => {
    if (!vehicle) return undefined
    const label = vehicle.name.toLowerCase()
    if (label.includes('sprinter')) return 'sprinter'
    if (label.includes('v-class') || label.includes('v class') || label.includes('van')) return 'van'
    if (label.includes('suv')) return 'suv'
    if (label.includes('sedan') || label.includes('e-class') || label.includes('e class') || label.includes('s-class') || label.includes('s class')) return 'sedan'
    if (vehicle.passengers > 8) return 'sprinter'
    if (vehicle.passengers > 6) return 'van'
    if (vehicle.passengers > 4) return 'suv'
    return 'sedan'
  }

  // const calculateAmount = (): number | null => {
  //   if (!state.vehicle) return null
  //   const baseRate = Number(state.vehicle.price)
  //   if (!Number.isFinite(baseRate) || baseRate <= 0) return null
  //   if (state.trip.serviceType === 'hourly') {
  //     const hours = state.trip.hours ?? 3
  //     return Math.max(1, Math.round(baseRate * hours))
  //   }
  //   const distanceKm = state.trip.distanceKm
  //   if (!distanceKm || distanceKm <= 0) return null
  //   return Math.max(1, Math.round(baseRate * distanceKm))
  // }

  const calculateAmount = (): number | null => {
    if (!state.vehicle) return null

    if (state.trip.serviceType === 'hourly') {
      const rate = getHourlyRate(state.vehicle.name)
      if (!rate) return null
      const hours = state.trip.hours ?? 1
      return rate * hours
    }

    // transfer — price already resolved by Step2VehicleSelect via getTransferPrice
    const basePrice = Number(state.vehicle.price)
    if (!Number.isFinite(basePrice) || basePrice <= 0) return null
    return Math.max(1, Math.round(basePrice))
  }

  const buildPayload = (): CreateBookingPayload | null => {
    // console.log("Building payload with state:", state)
    if (!state.trip.date || !state.vehicle) return null
    const amount = Math.round((calculateAmount() ?? 200) * 100)
    // console.log("Calculated amount:", amount)
    // if (!amount)

    const payload: CreateBookingPayload = {
      service_type: state.trip.serviceType,
      name: state.contact.fullName,
      email: state.contact.email,
      phone: `${state.contact.countryCode}${state.contact.phone}`,
      passengers: state.trip.passengers,
      date: format(state.trip.date, 'yyyy-MM-dd'),
      pickup_time: state.trip.time || undefined,
      notes: state.notes || undefined,
      amount,
      pickup_location: state.trip.pickup,
      vehicle_type: inferVehicleType(state.vehicle),
      vehicle_name: state.vehicle.name,
    }

    if (state.trip.serviceType === 'transfer') {
      payload.dropoff_location = state.trip.dropoff
      payload.flight_number = state.contact.flightNumber || undefined
    }

    if (state.trip.serviceType === 'hourly') {
      payload.hours = state.trip.hours ?? 1
    }

    return payload
  }

  // ── Called when user clicks Next on Step 3 (Contact Info) ──────────────────
  // Creates the booking + PaymentIntent on the backend, stores the clientSecret,
  // then advances to the payment step.
  const handleContactNext = async () => {
    const payload = buildPayload()

    if (!payload) {
      toast.error('Please complete your trip details before submitting.')
      return
    }

    setStripeError(null)

    try {
      const response = await createBooking.mutateAsync(payload)
      setClientSecret(response.client_secret)
      goToStep(3)
    } catch {
      toast.error('Failed to create booking. Please try again.')
    }
  }

  // ── Called by Step4Payment after the user fills in card details ─────────────
  // Receives the stripe + elements instances from the child so confirmPayment
  // can read the card details that were entered into the PaymentElement.
  const handleSubmit = async (
    stripe: ReturnType<typeof loadStripe> extends Promise<infer T> ? T : never,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    elements: import('@stripe/stripe-js').StripeElements,
  ) => {
    if (!stripe || !elements) return

    setStripeError(null)
    setIsConfirming(true)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setStripeError(submitError.message ?? 'Payment failed. Please try again.')
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,                         // ← card details live here
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirm`,
          payment_method_data: {
            billing_details: {
              name: state.contact.fullName,
              email: state.contact.email,
              phone: `${state.contact.countryCode}${state.contact.phone}`,
            },
          },
        },
      })

      // confirmPayment only returns here if it failed (successful payments
      // redirect away via return_url).
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (error) {
        setStripeError(error.message ?? 'Payment failed. Please try again.')
        toast.error(error.message ?? 'Payment failed.')
      }
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <div className="w-full" ref={widgetRef}>
      <StepIndicator current={step} total={STEPS.length} />

      <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-start min-w-0">
        <div className="md:col-span-2 min-w-0 overflow-hidden">
          {step === 0 && (
            <Step1TripDetails
              data={state.trip}
              onChange={updateTrip}
              onNext={() => goToStep(1)}
            />
          )}
          {step === 1 && (
            <Step2VehicleSelect
              trip={state.trip}
              selected={state.vehicle}
              notes={state.notes}
              onSelect={updateVehicle}
              onNotesChange={updateNotes}
              onNext={() => goToStep(2)}
              onBack={() => goToStep(0)}
            />
          )}
          {step === 2 && state.vehicle && (
            <Step3ContactInfo
              data={state.contact}
              trip={state.trip}
              vehicle={state.vehicle}
              onChange={updateContact}
              onNext={handleContactNext} // ← creates booking + moves to step 3
              onBack={() => goToStep(1)}
              isLoading={createBooking.isPending}
            />
          )}

          {/*
            Step 4: wrap in a *new* Elements instance that's initialised with
            the clientSecret. This is required for PaymentElement to render
            the correct payment form for this specific PaymentIntent.
          */}
          {step === 3 && clientSecret && state.vehicle && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#C9A84C',
                    colorBackground: '#111111',
                    colorText: '#F5F0E8',
                    colorDanger: '#E05C5C',
                    fontFamily: 'inherit',
                    borderRadius: '2px',
                  },
                },
              }}
            >
              <Step4Payment
                vehicle={state.vehicle}
                onBack={() => setStep(2)}
                onSubmit={handleSubmit}
                isSubmitting={isConfirming}
                stripeError={stripeError}
              />
            </Elements>
          )}
        </div>

        <BookingSummaryCard
          state={state}
          currentStep={step}
          amount={calculateAmount()}
        />
      </div>
    </div>
  )
}