import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Calendar, Clock, CreditCard, FileText, User, Users } from 'lucide-react'
import type { BookingStatus } from '@/features/booking/booking.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useGetBooking, useUpdateBookingStatus } from '@/features/booking/booking.hooks.ts'
import { formatCurrency } from '@/lib/utils.ts'

export const Route = createFileRoute('/_authenticated/admin/bookings/$id')({
  component: RouteComponent,
})

const statusVariant: Record<BookingStatus, 'default' | 'secondary' | 'destructive'> = {
  pending:   'secondary',
  confirmed: 'default',
  cancelled: 'destructive',
}

const paymentStatusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  succeeded:  'default',
  created:    'secondary',
  processing: 'secondary',
  failed:     'destructive',
  cancelled:  'destructive',
}

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: booking, isLoading } = useGetBooking(id)
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus()
  const [status, setStatus] = useState<BookingStatus | ''>('')

  if (isLoading) return <AppWrapper><div className="p-8 text-muted-foreground">Loading...</div></AppWrapper>
  if (!booking) return <AppWrapper><div className="p-8 text-muted-foreground">Booking not found.</div></AppWrapper>

  const currentStatus = status || booking.status

  const handleStatusChange = (val: string) => {
    setStatus(val as BookingStatus)
    updateStatus({ id: booking.id, status: val as BookingStatus })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle={`Booking ${booking.reference}`}
        pageSubtitle="View booking details and manage status"
      />

      <div className="mb-4">
        <Link to="/admin/bookings" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: main details */}
        <div className="lg:col-span-2 space-y-6">

          {/* Guest info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="w-4 h-4" /> Guest Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{booking.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{booking.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{booking.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Passengers</p>
                <p className="font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {booking.passengers}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trip info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4" /> Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Service Type</p>
                <p className="font-medium capitalize">{booking.service_type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(booking.date).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>
              {booking.pickup_time && (
                <div>
                  <p className="text-muted-foreground">Pickup Time</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {booking.pickup_time}
                  </p>
                </div>
              )}
              {booking.notes && (
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground flex items-center gap-1 mb-1">
                    <FileText className="w-3.5 h-3.5" /> Notes
                  </p>
                  <p className="text-foreground">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          {booking.payment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CreditCard className="w-4 h-4" /> Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">
                    {(booking.payment.amount / 100).toLocaleString('en', {
                      style: 'currency',
                      currency: booking.payment.currency,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Status</p>
                  <Badge variant={paymentStatusVariant[booking.payment.status] ?? 'secondary'}>
                    {booking.payment.status}
                  </Badge>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground mb-1">Stripe Payment Intent</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                    {booking.payment.stripe_payment_intent_id}
                  </code>
                </div>
                {booking.payment.processed_at && (
                  <div>
                    <p className="text-muted-foreground">Processed At</p>
                    <p className="font-medium">
                      {new Date(booking.payment.processed_at).toLocaleString('en-GB')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: status + summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Booking Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current</span>
                <Badge variant={statusVariant[booking.status]}>
                  {booking.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Update status</p>
                <Select
                  value={currentStatus}
                  onValueChange={handleStatusChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono font-medium">{booking.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {formatCurrency(booking.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(booking.created_at).toLocaleDateString('en-GB')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppWrapper>
  )
}