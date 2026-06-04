import { format } from 'date-fns'
import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { ConciergeRequestState, ConciergeRequestStatus } from './concierge-request.types.ts'
import { useUpdateConciergeRequestStatus } from './concierge-request.hooks.ts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const statusVariant: Record<ConciergeRequestStatus, 'default' | 'secondary' | 'destructive'> = {
  new: 'secondary',
  in_progress: 'default',
  resolved: 'destructive',
}

const statusLabel: Record<ConciergeRequestStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
}

function UpdateStatusDialog({ request }: { request: ConciergeRequestState }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<ConciergeRequestStatus>(request.status)
  const { mutateAsync, isPending } = useUpdateConciergeRequestStatus()

  const handleSubmit = async () => {
    await mutateAsync({ id: request.id, status })
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setStatus(request.status)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Update status</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update concierge request status</DialogTitle>
          <DialogDescription>Set a new status for {request.name}.</DialogDescription>
        </DialogHeader>
        <Select value={status} onValueChange={(v) => setStatus(v as ConciergeRequestStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter showCloseButton>
          <Button
            onClick={handleSubmit}
            disabled={isPending || status === request.status}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function conciergeRequestColumns(): Array<ColumnDef<ConciergeRequestState, unknown>> {
  return [
    {
      accessorKey: 'name',
      header: 'Guest',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone ?? '—',
    },
    {
      accessorKey: 'airport',
      header: 'Airport',
    },
    {
      accessorKey: 'flight_details',
      header: 'Flight',
      cell: ({ row }) => row.original.flight_details ?? '—',
    },
    {
      accessorKey: 'passengers',
      header: 'Pax',
      cell: ({ row }) => row.original.passengers ?? '—',
    },
    {
      accessorKey: 'contact_method',
      header: 'Via',
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.contact_method}</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status]}>
          {statusLabel[row.original.status]}
        </Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Submitted',
      cell: ({ row }) => format(new Date(row.original.created_at), 'dd MMM yyyy'),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <UpdateStatusDialog request={row.original} />,
    },
  ]
}
