import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowLeft, Calendar, Car, Clock, Compass, CreditCard,
  FileText, MapPin, User, Users,
} from 'lucide-react'
import type { BookingStatus } from '@/features/booking/booking.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { Card } from '@/components/ui/card.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useGetBooking, useUpdateBookingStatus } from '@/features/booking/booking.hooks.ts'
import { formatCurrency } from '@/lib/utils.ts'
import { StatusPill } from '@/components/status-pill.tsx'

export const Route = createFileRoute('/_authenticated/admin/bookings/$id')({
  component: RouteComponent,
})

function SectionCard({
  icon, title, children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-7 gap-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/25 text-primary flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-serif text-xl text-foreground">{title}</h3>
      </div>
      {children}
    </Card>
  )
}

function Field({
  label, value, icon, full,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
        {label}
      </p>
      <p className="text-sm text-foreground flex items-center gap-1.5">
        {icon}
        {value}
      </p>
    </div>
  )
}

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: booking, isLoading } = useGetBooking(id)
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus()
  const [status, setStatus] = useState<BookingStatus | ''>('')

  if (isLoading) return <AppWrapper><div className="p-8 text-muted-foreground">Loading...</div></AppWrapper>
  if (!booking) return <AppWrapper><div className="p-8 text-muted-foreground">Booking not found.</div></AppWrapper>

  const currentStatus = status || booking.status
  const details = booking.details as Record<string, string> | null

  const handleStatusChange = (val: string) => {
    setStatus(val as BookingStatus)
    updateStatus({ id: booking.id, status: val as BookingStatus })
  }

  return (
    <AppWrapper>
      <Link
        to="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-7"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Bookings
      </Link>

      {/* Hero */}
      <div className="flex flex-wrap items-end justify-between gap-5 pb-7 mb-8 border-b border-border">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-medium mb-2">
            Booking Detail
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground">
              {booking.reference}
            </h1>
            <StatusPill status={booking.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-foreground font-medium">{booking.name}</span>
            {' · '}
            <span className="capitalize">{booking.service_type}</span>
            {' · '}
            {new Date(booking.date).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric',
            })}
            {booking.pickup_time && ` at ${booking.pickup_time}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Total Paid
          </p>
          <p className="font-serif text-3xl text-primary">
            {formatCurrency(booking.amount / 100)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: main details */}
        <div className="lg:col-span-2 space-y-6">

          <SectionCard icon={<User className="w-4 h-4" />} title="Guest Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Name" value={booking.name} />
              <Field label="Email" value={booking.email} />
              <Field label="Phone" value={booking.phone} />
              <Field label="Passengers" value={booking.passengers} icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />} />
            </div>
          </SectionCard>

          <SectionCard icon={<Calendar className="w-4 h-4" />} title="Trip Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Service Type" value={<span className="capitalize">{booking.service_type}</span>} />
              <Field
                label="Date"
                value={new Date(booking.date).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
                icon={<Calendar className="w-3.5 h-3.5 text-muted-foreground" />}
              />
              {booking.pickup_time && (
                <Field label="Pickup Time" value={booking.pickup_time} icon={<Clock className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {booking.service_type === 'tour' && details?.tour_title && (
                <Field full label="Tour" value={details.tour_title} icon={<Compass className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {booking.service_type === 'tour' && details?.adults && (
                <Field label="Adults" value={details.adults} icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {details?.pickup_location && (
                <Field full label="Pickup Location" value={details.pickup_location} icon={<MapPin className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {details?.dropoff_location && (
                <Field full label="Drop-off Location" value={details.dropoff_location} icon={<MapPin className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {(details?.vehicle_name || details?.vehicle_type) && (
                <Field label="Vehicle" value={details.vehicle_name ?? details.vehicle_type} icon={<Car className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
              {booking.service_type === 'hourly' && details?.hours && (
                <Field label="Duration" value={`${details.hours} hour${Number(details.hours) > 1 ? 's' : ''}`} />
              )}
              {details?.flight_number && (
                <Field label="Flight Number" value={details.flight_number} />
              )}
              {booking.notes && (
                <Field full label="Notes" value={booking.notes} icon={<FileText className="w-3.5 h-3.5 text-muted-foreground" />} />
              )}
            </div>
          </SectionCard>

          {booking.payment && (
            <SectionCard icon={<CreditCard className="w-4 h-4" />} title="Payment">
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between py-3 first:pt-0">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm text-foreground font-medium">
                    {(booking.payment.amount / 100).toLocaleString('en', {
                      style: 'currency',
                      currency: booking.payment.currency,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Payment Status</span>
                  <StatusPill status={booking.payment.status} />
                </div>
                <div className="flex items-center justify-between py-3 gap-4">
                  <span className="text-sm text-muted-foreground flex-shrink-0">Stripe Payment Intent</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all text-right">
                    {booking.payment.stripe_payment_intent_id}
                  </code>
                </div>
                {booking.payment.processed_at && (
                  <div className="flex items-center justify-between py-3 last:pb-0">
                    <span className="text-sm text-muted-foreground">Processed At</span>
                    <span className="text-sm text-foreground font-medium">
                      {new Date(booking.payment.processed_at).toLocaleString('en-GB')}
                    </span>
                  </div>
                )}
              </div>
            </SectionCard>
          )}
        </div>

        {/* Right: status + summary */}
        <div className="space-y-6">
          <SectionCard icon={<span className="text-xs">●</span>} title="Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current</span>
                <StatusPill status={booking.status} />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Update Status
                </p>
                <Select
                  value={currentStatus}
                  onValueChange={handleStatusChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" disabled>Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<span className="text-xs">◎</span>} title="Summary">
            <div className="bg-[#F7F1E6] rounded-sm px-5 py-1">
              <div className="flex items-center justify-between py-3 border-b border-black/10">
                <span className="text-[11px] uppercase tracking-wider text-[#6b5f45]">Reference</span>
                <span className="text-sm font-mono font-semibold text-[#1a1a1a]">{booking.reference}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-black/10">
                <span className="text-[11px] uppercase tracking-wider text-[#6b5f45]">Amount</span>
                <span className="text-base font-semibold text-[#8a6d1f]">
                  {formatCurrency(booking.amount / 100)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[11px] uppercase tracking-wider text-[#6b5f45]">Created</span>
                <span className="text-sm font-medium text-[#1a1a1a]">
                  {new Date(booking.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppWrapper>
  )
}
