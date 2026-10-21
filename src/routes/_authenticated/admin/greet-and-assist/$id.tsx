import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Plane,
  Trash2,
  User,
  XCircle,
} from 'lucide-react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { AdminGreetAssistBooking } from '@/features/greet-assist/greet-assist-admin.types.ts'
import { greetAssistAdminService } from '@/features/greet-assist/greet-assist-admin.service.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute(
  '/_authenticated/admin/greet-and-assist/$id',
)({
  component: RouteComponent,
})

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-6 md:p-7 bg-[#121212] border-[#2A2A2A] text-[#D1C7B7] rounded-sm shadow-xs">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#222222]">
        <div className="w-9 h-9 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h3 className="font-serif text-lg text-[#F5F0E8] font-light">{title}</h3>
      </div>
      {children}
    </Card>
  )
}

function Field({
  label,
  value,
  full,
}: {
  label: string
  value: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <p className="text-[10px] uppercase tracking-wider text-[#9A9182] font-mono mb-1">
        {label}
      </p>
      <div className="text-sm text-[#F5F0E8] font-medium break-words">
        {value ?? '—'}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-900/40 text-green-300 border-green-800',
    pending: 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
    cancelled: 'bg-gray-800 text-gray-400 border-gray-700',
    payment_failed: 'bg-red-900/40 text-red-300 border-red-800',
  }
  const cls = styles[status] || 'bg-gray-800 text-gray-300 border-gray-700'
  return (
    <span className={`inline-block px-3 py-1 text-[11px] rounded-sm border uppercase font-mono ${cls}`}>
      {status}
    </span>
  )
}

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState<AdminGreetAssistBooking | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  const loadBooking = async (bookingId: string | number) => {
    setIsLoading(true)
    try {
      const data = await greetAssistAdminService.getBooking(bookingId)
      setBooking(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load booking.'
      Swal.fire({
        title: 'Error',
        text: msg,
        icon: 'error',
        background: '#141414',
        color: '#F5F0E8',
        iconColor: '#ef4444',
        confirmButtonColor: '#C9A84C',
        customClass: {
          popup: 'border border-[#2A2A2A] rounded-sm',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadBooking(id)
    }
  }, [id])

  const handleAction = async (action: 'confirm' | 'cancel' | 'delete') => {
    if (!booking) return

    const configs = {
      confirm: {
        title: 'Confirm Booking?',
        text: 'The customer will receive the confirmation email.',
        icon: 'question' as const,
        confirmButtonText: 'Yes, Confirm',
        confirmButtonColor: '#166534',
      },
      cancel: {
        title: 'Cancel Booking?',
        text: 'Are you sure you want to cancel this booking?',
        icon: 'warning' as const,
        confirmButtonText: 'Yes, Cancel',
        confirmButtonColor: '#92400e',
      },
      delete: {
        title: 'Delete Booking?',
        text: 'This booking will be permanently removed from the system.',
        icon: 'error' as const,
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: '#991b1b',
      },
    }

    const result = await Swal.fire({
      ...configs[action],
      showCancelButton: true,
      cancelButtonText: 'Dismiss',
      cancelButtonColor: '#262626',
      background: '#141414',
      color: '#F5F0E8',
      iconColor:
        action === 'confirm'
          ? '#22c55e'
          : action === 'cancel'
            ? '#f59e0b'
            : '#ef4444',
      customClass: {
        popup: 'border border-[#2A2A2A] rounded-sm text-[#D1C7B7]',
        title: 'font-serif text-[#F5F0E8]',
        confirmButton:
          'text-xs uppercase tracking-wider px-4 py-2 font-medium rounded-sm',
        cancelButton:
          'text-xs uppercase tracking-wider px-4 py-2 font-medium rounded-sm text-gray-300',
      },
    })

    if (!result.isConfirmed) return

    setActionInProgress(action)

    try {
      if (action === 'delete') {
        await greetAssistAdminService.deleteBooking(booking.id)
        await Swal.fire({
          title: 'Deleted!',
          text: 'The booking has been permanently removed.',
          icon: 'success',
          timer: 1600,
          showConfirmButton: false,
          background: '#141414',
          color: '#F5F0E8',
          iconColor: '#C9A84C',
          customClass: {
            popup: 'border border-[#2A2A2A] rounded-sm',
          },
        })
        navigate({ to: '/admin/greet-and-assist' })
        return
      } else if (action === 'confirm') {
        const res = await greetAssistAdminService.confirmBooking(booking.id)
        await Swal.fire({
          title: 'Confirmed!',
          text: res.message || 'Booking confirmed successfully.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
          background: '#141414',
          color: '#F5F0E8',
          iconColor: '#22c55e',
          customClass: {
            popup: 'border border-[#2A2A2A] rounded-sm',
          },
        })
      } else if (action === 'cancel') {
        const res = await greetAssistAdminService.cancelBooking(booking.id)
        await Swal.fire({
          title: 'Cancelled',
          text: res.message || 'Booking has been cancelled.',
          icon: 'info',
          timer: 1800,
          showConfirmButton: false,
          background: '#141414',
          color: '#F5F0E8',
          iconColor: '#f59e0b',
          customClass: {
            popup: 'border border-[#2A2A2A] rounded-sm',
          },
        })
      }

      await loadBooking(booking.id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Action failed.'
      Swal.fire({
        title: 'Error',
        text: msg,
        icon: 'error',
        background: '#141414',
        color: '#F5F0E8',
        iconColor: '#ef4444',
        confirmButtonColor: '#C9A84C',
        customClass: {
          popup: 'border border-[#2A2A2A] rounded-sm',
        },
      })
    } finally {
      setActionInProgress(null)
    }
  }

  if (isLoading) {
    return (
      <AppWrapper>
        <div className="py-24 text-center text-sm text-[#9A9182]">
          Loading booking details...
        </div>
      </AppWrapper>
    )
  }

  if (!booking) {
    return (
      <AppWrapper>
        <div className="space-y-4 py-16 text-center">
          <p className="text-sm text-red-400">Booking not found.</p>
          <Link
            to="/admin/greet-and-assist"
            className="inline-flex items-center gap-2 text-xs text-[#C9A84C] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Greet &amp; Assist Bookings
          </Link>
        </div>
      </AppWrapper>
    )
  }

  const d = booking.details || {}
  const pricing = d.pricing
  const services = d.services || {}

  return (
    <AppWrapper>
      <div className="space-y-6 w-full">
        {/* Back Link */}
        <div>
          <Link
            to="/admin/greet-and-assist"
            className="inline-flex items-center gap-2 text-xs text-[#9A9182] hover:text-[#C9A84C] transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to bookings
          </Link>
        </div>

        {/* Page Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#121212] border border-[#2A2A2A] rounded-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-mono">
                Airport Greet &amp; Assist
              </span>
              <StatusBadge status={booking.status} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] font-light">
              {booking.reference}
            </h1>
            <p className="text-xs text-[#9A9182] mt-1 font-mono">
              Created on {new Date(booking.created_at).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right sm:mr-4">
              <span className="text-[10px] uppercase tracking-wider text-[#9A9182] block font-mono">
                Total Amount
              </span>
              <span className="text-2xl font-serif text-[#C9A84C] font-normal">
                €{(booking.amount / 100).toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
              <Button
                size="sm"
                onClick={() => handleAction('confirm')}
                disabled={actionInProgress !== null}
                className="bg-green-900/40 text-green-300 border border-green-700 hover:bg-green-800/50 text-xs uppercase tracking-wider h-9"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                {actionInProgress === 'confirm' ? 'Confirming...' : 'Confirm'}
              </Button>
            )}

            {booking.status !== 'cancelled' && (
              <Button
                size="sm"
                onClick={() => handleAction('cancel')}
                disabled={actionInProgress !== null}
                className="bg-yellow-900/30 text-yellow-300 border border-yellow-700 hover:bg-yellow-800/40 text-xs uppercase tracking-wider h-9"
              >
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
                {actionInProgress === 'cancel' ? 'Cancelling...' : 'Cancel'}
              </Button>
            )}

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleAction('delete')}
              disabled={actionInProgress !== null}
              className="bg-red-950/40 text-red-400 border border-red-800 hover:bg-red-900/50 text-xs uppercase tracking-wider h-9"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              {actionInProgress === 'delete' ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        {/* 2-Column Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Information */}
          <SectionCard icon={<User className="w-4 h-4" />} title="Customer Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" value={booking.name} />
              <Field label="Email" value={booking.email} />
              <Field label="Phone" value={booking.phone} />
              <Field label="Service Type" value="Greet & Assist" />
              <Field label="Special Requests / Notes" value={booking.notes} full />
            </div>
          </SectionCard>

          {/* Flight & Airport Service */}
          <SectionCard icon={<Plane className="w-4 h-4" />} title="Flight &amp; Service">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Airport"
                value={
                  d.airport
                    ? `${d.airport} (${d.airport === 'LIS' ? 'Lisbon Airport' : 'Porto Airport'})`
                    : '—'
                }
              />
              <Field
                label="Assistance Type"
                value={
                  d.greet_service_type
                    ? d.greet_service_type.toUpperCase()
                    : 'ARRIVAL'
                }
              />
              <Field label="Flight Date" value={booking.date} />
              <Field
                label="Flight Time"
                value={
                  booking.pickup_time
                    ? String(booking.pickup_time).slice(0, 5)
                    : '—'
                }
              />
              <Field label="Flight Number" value={d.flight_number} />
              <Field label="Terminal" value={d.terminal} />
              <Field
                label="Passengers"
                value={`${booking.passengers} total (${d.adults ?? 1} adults, ${d.children ?? 0} children)`}
              />
              <Field
                label="Luggage &amp; Pets"
                value={`${d.bags ?? 0} bags, ${d.pets ?? 0} pets`}
              />
            </div>
          </SectionCard>
        </div>

        {/* Additional Services */}
        {services && (
          <SectionCard
            icon={<CheckCircle2 className="w-4 h-4" />}
            title="Additional Services &amp; Fast Track"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#171717] border border-[#222222] rounded-sm">
                <p className="text-[10px] uppercase tracking-wider text-[#9A9182] mb-1 font-mono">
                  Fast Track Immigration
                </p>
                <p className="text-sm font-semibold">
                  {services.fast_track_immigration ? (
                    <span className="text-green-400">Included</span>
                  ) : (
                    <span className="text-gray-500">Not selected</span>
                  )}
                </p>
              </div>

              <div className="p-3 bg-[#171717] border border-[#222222] rounded-sm">
                <p className="text-[10px] uppercase tracking-wider text-[#9A9182] mb-1 font-mono">
                  Security Fast Track
                </p>
                <p className="text-sm font-semibold">
                  {services.security_fast_track ? (
                    <span className="text-green-400">Included</span>
                  ) : (
                    <span className="text-gray-500">Not selected</span>
                  )}
                </p>
              </div>

              <div className="p-3 bg-[#171717] border border-[#222222] rounded-sm">
                <p className="text-[10px] uppercase tracking-wider text-[#9A9182] mb-1 font-mono">
                  Board to Board (Transit)
                </p>
                <p className="text-sm font-semibold">
                  {services.board_to_board_transit ? (
                    <span className="text-green-400">Included</span>
                  ) : (
                    <span className="text-gray-500">Not selected</span>
                  )}
                </p>
              </div>

              <div className="p-3 bg-[#171717] border border-[#222222] rounded-sm">
                <p className="text-[10px] uppercase tracking-wider text-[#9A9182] mb-1 font-mono">
                  Tax Free Escort
                </p>
                <p className="text-sm font-semibold">
                  {services.tax_free_escort ? (
                    <span className="text-green-400">Included</span>
                  ) : (
                    <span className="text-gray-500">Not selected</span>
                  )}
                </p>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Pricing Breakdown & Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Breakdown */}
          {pricing && (
            <SectionCard icon={<CreditCard className="w-4 h-4" />} title="Price Breakdown">
              <div className="space-y-2.5 text-xs">
                {(pricing.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-[#222222]">
                    <span className="text-[#D1C7B7]">
                      {item.label} × {item.quantity}
                    </span>
                    <span className="font-mono text-[#F5F0E8]">
                      €{Number(item.total).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5 text-[#9A9182]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F5F0E8]">
                    €{Number(pricing.subtotal).toFixed(2)}
                  </span>
                </div>
                {pricing.surcharge_applied && (
                  <div className="flex justify-between py-1.5 text-[#C9A84C]">
                    <span>Late Booking Surcharge ({pricing.surcharge_percent}%)</span>
                    <span className="font-mono font-semibold">
                      €{Number(pricing.surcharge).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 text-[#9A9182]">
                  <span>VAT ({pricing.vat_percent ?? 23}%)</span>
                  <span className="font-mono text-[#F5F0E8]">
                    €{Number(pricing.vat).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#2A2A2A] text-sm items-baseline">
                  <span className="uppercase tracking-wider text-[#9A9182] font-mono text-xs">
                    Total
                  </span>
                  <span className="text-xl font-serif text-[#C9A84C] font-semibold">
                    €{Number(pricing.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </SectionCard>
          )}

          {/* Payment Details */}
          <SectionCard icon={<CreditCard className="w-4 h-4" />} title="Payment Details">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Stripe Status"
                  value={
                    booking.stripe_status ? (
                      <StatusBadge status={booking.stripe_status} />
                    ) : (
                      '—'
                    )
                  }
                />
                <Field
                  label="Payment Intent ID"
                  value={
                    booking.payment?.stripe_payment_intent_id ? (
                      <span className="font-mono text-xs text-[#C9A84C]">
                        {booking.payment.stripe_payment_intent_id}
                      </span>
                    ) : (
                      '—'
                    )
                  }
                />
                <Field
                  label="Created At"
                  value={new Date(booking.created_at).toLocaleString()}
                />
                {booking.updated_at && (
                  <Field
                    label="Updated At"
                    value={new Date(booking.updated_at).toLocaleString()}
                  />
                )}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppWrapper>
  )
}
