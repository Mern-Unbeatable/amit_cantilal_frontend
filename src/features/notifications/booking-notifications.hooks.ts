import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { bookingService } from '@/features/booking/booking.service.ts'
import { useBookingNotificationsStore } from '@/stores/booking-notifications.ts'

const POLL_INTERVAL_MS = 30_000

/**
 * Polls for recently-confirmed bookings while the admin panel is open and
 * surfaces new ones as a toast + an entry in the notification bell. This is
 * in-tab only by design — it stops the moment the tab isn't focused
 * (refetchIntervalInBackground defaults to false) and there is no
 * server-push/service-worker component, so nothing reaches the admin when
 * the panel isn't open.
 */
export function useBookingNotificationsPoll() {
  const { seenIds, hasBaseline, markSeen, addNotifications, setBaseline } =
    useBookingNotificationsStore()

  const { data } = useQuery({
    queryKey: ['bookings', 'notifications-poll'],
    queryFn: () =>
      bookingService.getPaginatedBookings({
        page: 1,
        pageSize: 10,
        status: 'confirmed',
        sort: 'updated_at',
      }),
    refetchInterval: POLL_INTERVAL_MS,
  })

  useEffect(() => {
    if (!data) return
    const items = data.data

    if (!hasBaseline) {
      // First poll ever (or first since seenIds was somehow cleared) —
      // record the current backlog as already-seen without notifying.
      setBaseline(items.map((b) => b.id))
      return
    }

    const seen = new Set(seenIds)
    const fresh = items.filter((b) => !seen.has(b.id))
    if (fresh.length === 0) return

    markSeen(fresh.map((b) => b.id))
    addNotifications(
      fresh.map((b) => ({
        id: b.id,
        reference: b.reference,
        name: b.name,
        updatedAt: b.updated_at,
      })),
    )

    fresh.forEach((b) => {
      toast.success(`Booking confirmed — ${b.reference}`, {
        description: b.name,
      })
    })
    // seenIds/hasBaseline intentionally omitted from deps: they change as a
    // *result* of this effect, and including them would re-run it on every
    // update. (No react-hooks/exhaustive-deps lint rule is configured in
    // this project, so no disable directive is needed for that.)
  }, [data])
}
