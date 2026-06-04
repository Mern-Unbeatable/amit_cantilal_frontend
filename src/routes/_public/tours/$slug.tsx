import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, CheckCircle, Clock, MapPin, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { mainTransitionProps } from '@/lib/utils.ts'
import { tourService } from '@/features/tour/tour.service.ts'
import { useCreateBooking } from '@/features/booking/booking.hooks.ts'
import { Spinner } from '@/components/ui/spinner.tsx'
import { BookingSummary } from '@/features/tour/public/booking-summary.tsx'
import { BookingDateStep } from '@/features/tour/public/booking-date-step.tsx'
import { BookingDetailsStep } from '@/features/tour/public/booking-details-step.tsx'
import { StripeCheckoutForm } from '@/features/tour/public/stripe-checkout-form.tsx'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TourFormState {
  date: Date | undefined
  time: string
  adults: number
  contact: {
    name: string
    email: string
    phone: string
    notes: string
  }
}

const INITIAL_STATE: TourFormState = {
  date: undefined,
  time: '',
  adults: 1,
  contact: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
}

type TourTab = 'description' | 'itinerary' | 'pickup'

// ─── Stripe ───────────────────────────────────────────────────────────────────

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// ─── Constants ────────────────────────────────────────────────────────────────

const STEPS = ['Date & Guests', 'Your Details', 'Payment']

// ─── Route skeleton ───────────────────────────────────────────────────────────

const TourSkeleton = () => (
  <div className="min-h-screen bg-[#0B0B0B] pt-20 md:pt-24 pb-16 md:pb-24">
    <div className="container mx-auto px-4 md:px-12 max-w-5xl">
      <Spinner />
    </div>
  </div>
)

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/_public/tours/$slug')({
  loader: ({ context, params }) => {
    const { slug } = params
    return context.queryClient.ensureQueryData({
      queryKey: ['tours', slug],
      queryFn: () => tourService.bySlug(slug),
    })
  },
  pendingComponent: TourSkeleton,
  component: RouteComponent,
})

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#9A9182] font-medium">
          Step {current + 1} of {STEPS.length}
        </span>
      </div>
      <div className="flex gap-1.5 md:gap-2">
        {Array.from({ length: STEPS.length }).map((_, i) => (
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
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs font-medium transition-colors duration-200 flex-shrink-0 ${
                  i < current
                    ? 'bg-[#C9A84C] text-[#0B0B0B]'
                    : i === current
                      ? 'border border-[#C9A84C] text-[#C9A84C]'
                      : 'border border-[#C9A84C]/20 text-[#9A9182]'
                }`}
              >
                {i < current ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs md:text-sm hidden sm:block transition-colors duration-200 ${
                  i === current ? 'text-[#F5F0E8]' : 'text-[#9A9182]'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 md:mx-4 transition-colors duration-200 ${
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

// ─── Main component ───────────────────────────────────────────────────────────

function RouteComponent() {
  const tour = Route.useLoaderData()
  const createBooking = useCreateBooking()

  // Price is stored in cents — divide by 100 for display only
  const priceInCents = Number(tour.price)
  const price = priceInCents / 100

  const [step, setStep] = useState(0)
  const [state, setState] = useState<TourFormState>(INITIAL_STATE)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TourTab>('description')

  // ── State updaters ──────────────────────────────────────────────────────────

  const updateDate = (date: Date | undefined) =>
    setState((s) => ({ ...s, date, time: '' })) // reset time when date changes

  const updateTime = (time: string) =>
    setState((s) => ({ ...s, time }))

  const updateAdults = (adults: number) =>
    setState((s) => ({ ...s, adults }))

  const updateContact = (field: keyof TourFormState['contact'], value: string) =>
    setState((s) => ({
      ...s,
      contact: { ...s.contact, [field]: value },
    }))

  // ── Derived values ──────────────────────────────────────────────────────────

  const total = price          // display value (euros)
  const totalCents = priceInCents  // payment amount (cents)

  const tourImages = tour.images ?? []
  const images =
    tourImages.length > 0
      ? tourImages.map((image) => ({
        originalUrl: image.url,
        description: image.alt,
      }))
      : [{ originalUrl: '/cars/mercedes-vclass-2.webp', description: tour.title }]

  // ── Step 1 → 2: create booking + PaymentIntent, store clientSecret ──────────
  // Mirrors handleContactNext in BookingWidget exactly.

  const handleDetailsNext = async () => {
    if (!state.date) {
      toast.error('Please select a date before proceeding to payment.')
      return
    }

    try {
      const response = await createBooking.mutateAsync({
        tour_id: tour.id ? String(tour.id) : undefined,
        service_type: 'tour',
        name: state.contact.name.trim(),
        email: state.contact.email.trim(),
        phone: state.contact.phone.trim(),
        passengers: state.adults,
        date: format(state.date, 'yyyy-MM-dd'),
        pickup_time: state.time || undefined,
        notes: state.contact.notes.trim() || undefined,
        amount: Math.max(1, Math.round(totalCents)),
        pickup_location: `Tour booking: ${tour.title}`,
        hours: 1,
      })

      setClientSecret(response.client_secret)
      setStep(2)
    } catch {
      toast.error('Failed to create booking. Please try again.')
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-black pt-20 md:pt-24 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">

          {/* Back */}
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-xs text-white-dim hover:text-gold transition-colors mb-8 md:mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Tours
          </Link>

          {/* Page title */}
          <div className="mb-8 md:mb-10">
            <div className="tag-gold mb-3">Book Your Experience</div>
            <h1 className="font-serif text-2xl md:text-4xl font-light text-white leading-snug">
              {tour.title}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-white-dim">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                {tour.duration}
              </span>
            </div>
          </div>

          {/* Info tabs */}
          <div className="mb-10 md:mb-14">
            {/* Tab nav */}
            <div className="flex border-b border-[#C9A84C]/15">
              {(['description', 'itinerary', 'pickup'] as TourTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs tracking-[0.12em] uppercase font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-[#C9A84C] text-[#C9A84C]'
                      : 'border-transparent text-[#9A9182] hover:text-[#F5F0E8]'
                  }`}
                >
                  {tab === 'pickup' ? 'Pick-up' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="py-6 text-sm text-[#F5F0E8]/70 font-light leading-relaxed">
              {activeTab === 'description' && (
                <p>{tour.description}</p>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  {/* Inclusions */}
                  {tour.inclusions && tour.inclusions.length > 0 && (
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C] mb-3">Included</p>
                      <ul className="space-y-2">
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                            <span>{typeof item === 'string' ? item : item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Exclusions */}
                  {tour.exclusions && tour.exclusions.length > 0 && (
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C] mb-3">Not Included</p>
                      <ul className="space-y-2">
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-[#9A9182] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                            <span>{typeof item === 'string' ? item : item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'pickup' && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <p>{tour.pickup_info ?? 'Your driver will meet you at your hotel lobby or accommodation at the agreed time. Please provide your full address at booking.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Main layout */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-start">

            {/* Step content */}
            <div className="md:col-span-2">

              {/* Step 0: Date & Guests */}
              {step === 0 && (
                <BookingDateStep
                  date={state.date}
                  time={state.time}
                  adults={state.adults}
                  startTimes={tour.start_times}
                  onDateChange={updateDate}
                  onTimeChange={updateTime}
                  onAdultsChange={updateAdults}
                  onContinue={() => setStep(1)}
                />
              )}

              {/* Step 1: Contact Details
                  onContinue creates the booking + PaymentIntent before advancing */}
              {step === 1 && (
                <BookingDetailsStep
                  form={state.contact}
                  onChange={updateContact}
                  onBack={() => setStep(0)}
                  onContinue={handleDetailsNext}
                  isLoading={createBooking.isPending}
                />
              )}

              {/* Step 2: Payment
                  Wrap in a fresh Elements instance keyed to this PaymentIntent's
                  clientSecret — required for PaymentElement to render correctly. */}
              {step === 2 && clientSecret && (
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
                  <StripeCheckoutForm
                    onBack={() => setStep(1)}
                    returnUrl={`${window.location.origin}/booking/confirm`}
                  />
                </Elements>
              )}
            </div>

            {/* Booking summary sidebar */}
            <BookingSummary
              title={tour.title}
              date={state.date}
              time={state.time}
              adults={state.adults}
              price={price}
              total={total}
              images={images}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}