import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card.tsx'
import { StatusPill } from '@/components/status-pill.tsx'
import { useDashboardRecentBookings } from '@/features/dashboard/dashboard.hooks.ts'
import { formatCurrency } from '@/lib/utils.ts'

export function RecentBookingsCard() {
  const { data: bookings = [], isFetching } = useDashboardRecentBookings()
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] uppercase tracking-wider text-primary font-medium">
          Recent Bookings
        </p>
        <Link
          to="/admin/bookings"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isFetching ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse bg-muted/20 rounded-md"
            />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3 pr-4">
                  Reference
                </th>
                <th className="text-left font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3 pr-4">
                  Guest
                </th>
                <th className="text-left font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3 pr-4">
                  Service
                </th>
                <th className="text-left font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3 pr-4">
                  Date
                </th>
                <th className="text-left font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3 pr-4">
                  Status
                </th>
                <th className="text-right font-medium text-[10px] uppercase tracking-wider text-muted-foreground pb-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() =>
                    navigate({
                      to: '/admin/bookings/$id',
                      params: { id: String(booking.id) },
                    })
                  }
                >
                  <td className="py-3 pr-4 font-mono text-xs text-foreground">
                    {booking.reference}
                  </td>
                  <td className="py-3 pr-4 text-foreground font-medium max-w-[160px] truncate">
                    {booking.name}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground capitalize">
                    {booking.service_type}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                    {new Date(booking.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="py-3 text-right text-foreground font-medium whitespace-nowrap">
                    {formatCurrency(booking.amount / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
