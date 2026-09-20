import { Link } from '@tanstack/react-router'
import { Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useBookingNotificationsStore } from '@/stores/booking-notifications.ts'
import { useBookingNotificationsPoll } from '@/features/notifications/booking-notifications.hooks.ts'

const BookingNotificationsBell = () => {
  useBookingNotificationsPoll()

  const { notifications, clearNotifications } = useBookingNotificationsStore()
  const unreadCount = notifications.length

  return (
    <DropdownMenu onOpenChange={(open) => !open && clearNotifications()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 py-0 text-[10px] leading-none"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>Confirmed bookings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            No new confirmed bookings.
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} asChild className="cursor-pointer">
                <Link to="/admin/bookings/$id" params={{ id: String(n.id) }}>
                  <div className="flex w-full flex-col gap-0.5 py-0.5">
                    <span className="text-sm font-medium">{n.reference}</span>
                    <span className="text-xs text-muted-foreground">
                      {n.name} ·{' '}
                      {formatDistanceToNow(new Date(n.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BookingNotificationsBell
