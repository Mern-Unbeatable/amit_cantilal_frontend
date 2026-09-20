import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Calendar, Car, MapPin, Users, XCircle } from 'lucide-react'
import type {
  BookingState,
  CreateBookingResponse,
} from '@/features/booking/booking.types.ts'
import { mainTransitionProps } from '@/lib/utils.ts'
import { useRefreshPaymentIntent } from '@/features/booking/booking.hooks.ts'
import { Button } from '@/components/ui/button'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/booking/pay/$reference')({
  head: ({ params }) =>
    pageHead({
      title: 'Complete Your Payment',
      description: 'Complete payment for your booking.',
      path: `/booking/pay/${params.reference}`,
      noindex: true,
    }),
  component: RouteComponent,
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// ─── Payment form ─────────────────────────────────────────────────────────────

function PaymentForm({
  booking,
  onBack,
}: {
  booking: BookingState
  onBack: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePay = async () => {
    if (!stripe || !elements) return
    setError(null)
    setIsSubmitting(true)

    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirm`,
          payment_method_data: {
            billing_details: {
              name: booking.name,
              email: booking.email,
              phone: booking.phone,
            },
          },
        },
      })
      if (stripeError)
        setError(stripeError.message ?? 'Payment failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-[#C9A84C]/15 p-4 bg-[#111111]">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          variant="outline"
          className="flex-1 h-14 rounded-none border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/40"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handlePay}
          disabled={!stripe || !elements || isSubmitting}
          className="flex-[2] h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium tracking-[.1em] uppercase disabled:opacity-40"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay €${(booking.amount / 100).toFixed(2)}`
          )}
        </Button>
      </div>

      <p className="text-xs text-[#9A9182]/60 text-center">
        Your payment is secured by Stripe. By completing payment you agree to
        our terms of service.
      </p>
    </div>
  )
}

// ─── Booking summary ──────────────────────────────────────────────────────────

function BookingSummary({ booking }: { booking: BookingState }) {
  const details = booking.details as Record<string, string> | null

  return (
    <div className="bg-[#0B0B0B] border border-[#C9A84C]/15 p-5 space-y-3 mb-6">
      <p className="text-xs font-medium text-[#C9A84C] flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
        Booking Summary — {booking.reference}
      </p>

      <div className="space-y-2 text-xs">
        {details?.pickup_location && (
          <div className="flex items-start gap-2 text-[#9A9182]">
            <MapPin
              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
              strokeWidth={1.5}
            />
            <span>{details.pickup_location}</span>
          </div>
        )}
        {details?.dropoff_location && (
          <div className="flex items-start gap-2 text-[#9A9182]">
            <MapPin
              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#C9A84C]"
              strokeWidth={1.5}
            />
            <span>{details.dropoff_location}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[#9A9182]">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span>
            {booking.date}{' '}
            {booking.pickup_time ? `• ${booking.pickup_time}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#9A9182]">
          <Users className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span>
            {booking.passengers} passenger{booking.passengers !== 1 ? 's' : ''}
          </span>
        </div>
        {details?.vehicle_type && (
          <div className="flex items-center gap-2 text-[#9A9182]">
            <Car className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
            <span className="capitalize">{details.vehicle_type}</span>
          </div>
        )}
      </div>

      <div className="border-t border-[#C9A84C]/10 pt-3 flex justify-between items-center">
        <span className="text-xs text-[#9A9182]">Total Due</span>
        <span className="font-serif text-lg text-gradient-gold">
          €{(booking.amount / 100).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

// ─── Route component ──────────────────────────────────────────────────────────

function RouteComponent() {
  const { reference } = Route.useParams()
  const search = new URLSearchParams(window.location.search)
  const email = search.get('email') ?? ''

  const refresh = useRefreshPaymentIntent()
  const [data, setData] = useState<CreateBookingResponse | null>(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!email) {
      setLoadError(
        'Missing email. Please use the link from your booking email or try the lookup page.',
      )
      return
    }

    refresh
      .mutateAsync({ reference, email })
      .then(setData)
      .catch(() =>
        setLoadError(
          'Unable to load your booking. Please check your link or use the lookup page.',
        ),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, email])

  if (loadError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
        <div className="text-center space-y-5 max-w-sm mx-auto px-4">
          <XCircle
            className="w-12 h-12 text-red-400 mx-auto"
            strokeWidth={1.5}
          />
          <p className="text-[#9A9182] text-sm">{loadError}</p>
          <Link
            to="/booking/lookup"
            className="inline-block px-6 py-3 bg-[#C9A84C] text-[#0B0B0B] text-sm font-medium hover:bg-[#E2C97E] transition-colors"
          >
            Look Up Booking
          </Link>
        </div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin" />
          <span className="text-sm text-[#9A9182]">
            Loading your booking...
          </span>
        </div>
      </section>
    )
  }

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-[#0B0B0B] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(201,168,76,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-4 py-20 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-light text-gradient-gold mb-2">
                Complete Payment
              </h1>
              <p className="text-sm text-[#9A9182]">
                Secure payment powered by Stripe
              </p>
            </div>

            <BookingSummary booking={data.booking} />

            <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: data.client_secret,
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
                <PaymentForm
                  booking={data.booking}
                  onBack={() => window.history.back()}
                />
              </Elements>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
