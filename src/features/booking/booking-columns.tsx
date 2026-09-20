import { Link } from '@tanstack/react-router'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { BookingState } from '@/features/booking/booking.types.ts'
import { formatCurrency } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useDeleteBooking } from '@/features/booking/booking.hooks.ts'

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  pending: 'secondary',
  confirmed: 'default',
  cancelled: 'destructive',
}

export const bookingColumns = (): Array<ColumnDef<BookingState, unknown>> => [
  {
    accessorKey: 'reference',
    header: 'Reference',
  },
  {
    id: 'guest',
    header: 'Guest',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'service_type',
    header: 'Service',
    cell: ({ row }) => (
      <span className="capitalize">{row.original.service_type}</span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'passengers',
    header: 'Pax',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status] ?? 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(row.original.amount / 100),
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const { mutate: deleteBooking } = useDeleteBooking()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                to="/admin/bookings/$id"
                params={{ id: String(row.original.id) }}
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                if (confirm(`Delete booking ${row.original.reference}?`)) {
                  deleteBooking(row.original.id)
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
