import type { ColumnDef } from '@tanstack/react-table'
import type { BookingState } from '@/features/booking/booking.types.ts'
import { formatCurrency } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button.tsx'
import { Eye } from 'lucide-react'

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
    cell: ({ row }) => (
      <Link to="/admin/bookings/$id" params={{ id: String(row.original.id) }}>
        <Button variant="ghost" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
      </Link>
    ),
  },
]
