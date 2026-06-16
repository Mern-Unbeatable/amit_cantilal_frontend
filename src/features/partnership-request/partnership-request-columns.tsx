import { format } from 'date-fns'
import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type {
  PartnershipRequestState,
  PartnershipRequestStatus,
} from '@/features/partnership-request/partnership-request.types.ts'
import { useUpdatePartnershipRequestStatus } from '@/features/partnership-request/partnership-request.hooks.ts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'

const statusVariant: Record<
  PartnershipRequestStatus,
  'default' | 'secondary' | 'destructive'
> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
}

const statusLabel: Record<PartnershipRequestStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

function UpdatePartnershipStatusDialog({
  request,
}: {
  request: PartnershipRequestState
}) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<PartnershipRequestStatus>(request.status)
  const { mutateAsync, isPending } = useUpdatePartnershipRequestStatus()

  const handleSubmit = async () => {
    await mutateAsync({ id: request.id, status })
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) {
          setStatus(request.status)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update status
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update partnership status</DialogTitle>
          <DialogDescription>
            Set a new status for {request.company_name}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as PartnershipRequestStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter showCloseButton>
          <Button onClick={handleSubmit} disabled={isPending || status === request.status}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function partnershipRequestColumns(): Array<
  ColumnDef<PartnershipRequestState, unknown>
> {
  return [
    {
      accessorKey: 'company_name',
      header: 'Company',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.company_name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.company_type ?? '—'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'contact_name',
      header: 'Contact',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.contact_name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => row.original.phone ?? '—',
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.source}
        </Badge>
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
      cell: ({ row }) =>
        format(new Date(row.original.created_at), 'dd MMM yyyy'),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <UpdatePartnershipStatusDialog request={row.original} />,
    },
  ]
}
