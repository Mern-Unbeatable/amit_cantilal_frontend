import type { BookingState } from '@/features/booking/booking.types.ts'
import { formatCurrency } from '@/lib/utils.ts'

interface BookingPrintReceiptProps {
  booking: BookingState
  whatsappNumber?: string | null
  contactEmail?: string | null
}

/**
 * Print-only view of a booking, styled to match the booking-confirmation
 * email (resources/views/emails/booking-confirmation.blade.php on the
 * backend) so admins can hand the client/driver a paper copy that looks
 * like the same document. Rendered `hidden print:block` — see
 * src/routes/_authenticated/admin/bookings/$id.tsx for where it's mounted
 * and how the rest of the app chrome is hidden on print.
 */
export function BookingPrintReceipt({
  booking,
  whatsappNumber,
  contactEmail,
}: BookingPrintReceiptProps) {
  const details = (booking.details ?? {}) as Record<string, string | number | undefined>
  const isTransferOrHourly = booking.service_type === 'transfer' || booking.service_type === 'hourly'
  const vehicle = details.vehicle_name ?? details.vehicle_type
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    : undefined

  return (
    <div className="mx-auto w-[600px] max-w-full bg-white font-sans text-[#333333]">
      {/* Header */}
      <div className="bg-[#0B0B0B] border-b-[3px] border-[#C9A84C] px-6 py-8 text-center">
        <img src="/logo512.png" alt="Off We Go Portugal" width={130} className="mx-auto" />
      </div>

      {/* Status heading */}
      <div className="px-8 pt-10 pb-4 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C9A84C] text-2xl text-[#C9A84C]">
          ✓
        </div>
        <h1 className="font-serif text-2xl font-normal tracking-wide text-[#1a1a1a]">
          BOOKING CONFIRMED
        </h1>
        <div className="mx-auto my-6 h-px w-15 bg-[#C9A84C]" />
        <p className="text-left text-sm leading-relaxed">Dear {booking.name},</p>
        <p className="mt-3 text-left text-sm leading-relaxed">
          Thank you for choosing Off We Go Portugal. Your booking has been confirmed
          and your driver will be ready for you.
        </p>
      </div>

      {/* Reference box */}
      <div className="px-8 py-2">
        <div className="border border-[#C9A84C] p-[18px] text-center">
          <p className="mb-1.5 text-[11px] font-bold tracking-[1.5px] text-[#C9A84C]">
            BOOKING REFERENCE
          </p>
          <p className="text-xl font-bold text-[#1a1a1a]">{booking.reference}</p>
        </div>
      </div>

      <div className="mx-8 border-t border-[#e5e0d8]" />

      {/* Trip details */}
      <div className="px-8 py-7">
        <p className="mb-4 text-xs font-bold tracking-[1.5px] text-[#C9A84C]">
          TRIP DETAILS
        </p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-[#f0ede6]">
              <td className="py-2.5 text-[#777777]">Service</td>
              <td className="py-2.5 text-right capitalize">{booking.service_type}</td>
            </tr>
            <tr className="border-b border-[#f0ede6]">
              <td className="py-2.5 text-[#777777]">Date</td>
              <td className="py-2.5 text-right">
                {new Date(booking.date).toLocaleDateString('en-GB', {
                  weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
                })}
              </td>
            </tr>
            {booking.pickup_time && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 text-[#777777]">Pickup Time</td>
                <td className="py-2.5 text-right">{booking.pickup_time.slice(0, 5)}</td>
              </tr>
            )}
            <tr className="border-b border-[#f0ede6]">
              <td className="py-2.5 text-[#777777]">Passengers</td>
              <td className="py-2.5 text-right">{booking.passengers}</td>
            </tr>
            {details.pickup_location && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 align-top text-[#777777]">Pickup Location</td>
                <td className="py-2.5 text-right">{details.pickup_location}</td>
              </tr>
            )}
            {details.dropoff_location && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 align-top text-[#777777]">Drop-off Location</td>
                <td className="py-2.5 text-right">{details.dropoff_location}</td>
              </tr>
            )}
            {booking.service_type === 'hourly' && details.hours && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 text-[#777777]">Duration</td>
                <td className="py-2.5 text-right">
                  {details.hours} hour{Number(details.hours) > 1 ? 's' : ''}
                </td>
              </tr>
            )}
            {vehicle && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 text-[#777777]">Vehicle</td>
                <td className="py-2.5 text-right capitalize">{vehicle}</td>
              </tr>
            )}
            {details.flight_number && (
              <tr className="border-b border-[#f0ede6]">
                <td className="py-2.5 text-[#777777]">Flight Number</td>
                <td className="py-2.5 text-right">{details.flight_number}</td>
              </tr>
            )}
            {booking.notes && (
              <tr>
                <td className="py-2.5 align-top text-[#777777]">Notes</td>
                <td className="py-2.5 text-right">{booking.notes}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mx-8 border-t border-[#e5e0d8]" />

      {/* Payment summary */}
      <div className="px-8 py-7">
        <p className="mb-4 text-xs font-bold tracking-[1.5px] text-[#C9A84C]">
          PAYMENT SUMMARY
        </p>
        <div className="flex items-center justify-between bg-[#F7F1E6] px-5 py-4">
          <span className="text-sm font-bold text-[#1a1a1a]">Total Paid</span>
          <span className="text-base font-bold text-[#1a1a1a]">
            {formatCurrency(booking.amount / 100)} {booking.currency}
          </span>
        </div>
      </div>

      <div className="mx-8 border-t border-[#e5e0d8]" />

      {/* What happens next */}
      <div className="px-8 py-7">
        <p className="mb-4 text-xs font-bold tracking-[1.5px] text-[#C9A84C]">
          WHAT HAPPENS NEXT
        </p>
        {isTransferOrHourly && (
          <>
            <p className="mb-2.5 text-sm leading-relaxed">
              Your driver will be waiting at the pickup location.
            </p>
            <ul className="mb-4 list-disc pl-5 text-sm leading-relaxed">
              <li>For airport pickups, we monitor your flight and wait 60 minutes at no extra charge.</li>
              <li>For other locations, we wait 15 minutes at no extra charge.</li>
            </ul>
          </>
        )}
        <p className="mb-6 text-sm leading-relaxed">
          If you have any questions or need to make changes, please contact us as soon
          as possible with your booking reference <strong>{booking.reference}</strong>.
        </p>
        {waLink && (
          <div className="mx-auto w-fit rounded-full bg-[#0B0B0B] px-7 py-3.5 text-center text-[13px] font-bold tracking-wide text-white">
            CONTACT US ON WHATSAPP
          </div>
        )}
      </div>

      <div className="mx-8 border-t border-[#e5e0d8]" />

      {/* Contact row */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-3 text-xs">
          <div>
            <p className="font-bold text-[#1a1a1a]">Phone / WhatsApp</p>
            <p className="mt-1 text-[#555555]">{whatsappNumber ?? '—'}</p>
          </div>
          <div>
            <p className="font-bold text-[#1a1a1a]">Email</p>
            <p className="mt-1 text-[#555555]">{contactEmail ?? '—'}</p>
          </div>
          <div>
            <p className="font-bold text-[#1a1a1a]">Website</p>
            <p className="mt-1 text-[#555555]">www.offwego.pt</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0B0B0B] px-6 py-8 text-center">
        <p className="font-serif text-sm text-[#C9A84C]">Thank you for traveling with us.</p>
        <p className="mt-1 font-serif text-sm text-[#C9A84C]">
          We look forward to providing you with an exceptional experience.
        </p>
        <div className="mx-auto my-5 h-px w-15 bg-[#C9A84C]" />
        <p className="text-xs text-[#C9A84C]">Off We Go Portugal – Premium Chauffeur Services</p>
        <p className="mt-2.5 text-[11px] text-[#999999]">
          Transfers &nbsp;|&nbsp; Tours &nbsp;|&nbsp; Corporate Mobility &nbsp;|&nbsp; Special Events
        </p>
        <p className="mt-2.5 text-[10px] text-[#777777]">
          © {new Date().getFullYear()} Off We Go Portugal. All rights reserved.
        </p>
      </div>
    </div>
  )
}
