import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Calendar,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  XCircle,
} from 'lucide-react'
import type { BookingState } from '@/features/booking/booking.types.ts'
import { capitalize, formatCurrency, mainTransitionProps } from '@/lib/utils.ts'
import { useGetBookingByPaymentIntent } from '@/features/booking/booking.hooks.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'

export const Route = createFileRoute('/_public/booking/confirm')({
  component: RouteComponent,
})

type RedirectStatus = 'succeeded' | 'failed' | 'processing' | string

// ─── Status screens ───────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: RedirectStatus }) {
  if (status === 'succeeded')
    return (
      <CheckCircle className="w-14 h-14 text-[#C9A84C]" strokeWidth={1.5} />
    )
  if (status === 'processing')
    return <Clock className="w-14 h-14 text-white-dim" strokeWidth={1.5} />
  return <XCircle className="w-14 h-14 text-red-400" strokeWidth={1.5} />
}

function StatusHeading({ status }: { status: RedirectStatus }) {
  if (status === 'succeeded')
    return (
      <h1 className="font-serif text-3xl md:text-4xl font-light text-gradient-gold">
        Booking Confirmed
      </h1>
    )
  if (status === 'processing')
    return (
      <h1 className="font-serif text-3xl md:text-4xl font-light text-[#F5F0E8]">
        Payment Processing
      </h1>
    )
  return (
    <h1 className="font-serif text-3xl md:text-4xl font-light text-red-400">
      Payment Failed
    </h1>
  )
}

function StatusMessage({
  status,
  booking,
}: {
  status: RedirectStatus
  booking: BookingState | null
}) {
  if (status === 'succeeded' && booking)
    return (
      <p className="text-[#9A9182] text-sm leading-relaxed">
        Your ride has been booked successfully. A confirmation has been sent to{' '}
        <span className="text-[#F5F0E8]">{booking.email}</span>.
      </p>
    )
  if (status === 'processing')
    return (
      <p className="text-[#9A9182] text-sm leading-relaxed">
        Your payment is being processed. We'll send you a confirmation email
        once it's complete.
      </p>
    )
  return (
    <p className="text-[#9A9182] text-sm leading-relaxed">
      Your payment could not be completed. No charge has been made. Please try
      again or contact support.
    </p>
  )
}

// ─── Booking detail card ──────────────────────────────────────────────────────

function BookingDetail({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-[#C9A84C]/10 last:border-0">
      <span className="text-xs text-white-dim uppercase tracking-widest shrink-0">
        {label}
      </span>
      <span className="text-sm text-white-cream text-right">{value}</span>
    </div>
  )
}

function BookingCard({ booking }: { booking: BookingState }) {
  const details = booking.details as Record<string, string> | null

  return (
    <div className="border border-gold/15 bg-[#0F0F0F] rounded-sm p-6 space-y-1">
      {/* Reference */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white-dim uppercase tracking-widest">
          Booking Reference
        </span>
        <span className="font-mono text-gold text-sm font-medium">
          {booking.reference}
        </span>
      </div>

      <div className="h-px bg-gold/10 mb-4" />

      {/* Trip details */}
      <div className="space-y-0">
        <BookingDetail
          label="Service"
          value={(booking.service_type)}
        />
        <BookingDetail
          label="Date"
          value={
            <span className="flex items-center gap-1.5 justify-end">
              <Calendar className="w-3.5 h-3.5 text-white-dim" />
              {booking.date}
            </span>
          }
        />
        {details?.pickup_location && (
          <BookingDetail
            label="Pickup"
            value={
              <span className="flex items-center gap-1.5 justify-end">
                <MapPin className="w-3.5 h-3.5 text-[#9A9182]" />
                {details.pickup_location}
              </span>
            }
          />
        )}
        {details?.dropoff_location && (
          <BookingDetail
            label="Drop-off"
            value={
              <span className="flex items-center gap-1.5 justify-end">
                <MapPin className="w-3.5 h-3.5 text-[#9A9182]" />
                {details.dropoff_location}
              </span>
            }
          />
        )}
        {booking.service_type === 'hourly' && details?.hours && (
          <BookingDetail
            label="Duration"
            value={`${details.hours} hour${Number(details.hours) > 1 ? 's' : ''}`}
          />
        )}
        <BookingDetail
          label="Passengers"
          value={
            <span className="flex items-center gap-1.5 justify-end">
              <Users className="w-3.5 h-3.5 text-[#9A9182]" />
              {booking.passengers}
            </span>
          }
        />
        {details?.vehicle_type && (
          <BookingDetail
            label="Vehicle"
            value={
              <span className="flex items-center gap-1.5 justify-end">
                <Car className="w-3.5 h-3.5 text-[#9A9182]" />
                {capitalize(details.vehicle_type)}
              </span>
            }
          />
        )}
      </div>

      <div className="h-px bg-[#C9A84C]/10 my-2" />

      {/* Amount */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-[#9A9182] uppercase tracking-widest">
          Total Paid
        </span>
        <span className="font-serif text-xl text-[#C9A84C] font-light">
          {formatCurrency(booking.amount)}
        </span>
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 bg-[#1C1C1C] rounded-sm" />
      ))}
    </div>
  )
}

// ─── Route component ──────────────────────────────────────────────────────────

function RouteComponent() {
  const search = new URLSearchParams(window.location.search)
  const paymentIntentId = search.get('payment_intent') ?? 0
  const redirectStatus = search.get('redirect_status') ?? 'failed'

  const { data: booking, isLoading } =
    useGetBookingByPaymentIntent(paymentIntentId)

  if (isLoading)
    return (
      <AppWrapper>
        <div className="p-8 text-muted-foreground">Loading...</div>
      </AppWrapper>
    )
  if (!booking)
    return (
      <AppWrapper>
        <div className="p-8 text-muted-foreground">Booking not found.</div>
      </AppWrapper>
    )

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-[#0B0B0B] overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              redirectStatus === 'succeeded'
                ? 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(201,168,76,0.06) 0%, transparent 70%)'
                : redirectStatus === 'failed'
                  ? 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(224,92,92,0.05) 0%, transparent 70%)'
                  : 'none',
          }}
        />

        <div className="container mx-auto px-4 md:px-12 py-20 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center gap-5 mb-10"
          >
            <StatusIcon status={redirectStatus} />
            <StatusHeading status={redirectStatus} />
            <StatusMessage status={redirectStatus} booking={booking} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {isLoading && <Skeleton />}

            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {booking && !isLoading &&
              redirectStatus === 'succeeded' && (
                <BookingCard booking={booking} />
              )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            {redirectStatus === 'failed' ? (
              <Link
                to="/booking"
                className="flex-1 py-3 px-6 bg-[#C9A84C] text-[#0B0B0B] text-sm font-medium
                           text-center hover:bg-[#D4B55A] transition-colors duration-200"
              >
                Try Again
              </Link>
            ) : (
              <Link
                to="/"
                className="flex-1 py-3 px-6 border border-[#C9A84C]/30 text-[#9A9182] text-sm
                           text-center hover:border-[#C9A84C]/60 hover:text-[#F5F0E8]
                           transition-colors duration-200"
              >
                Back to Home
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
