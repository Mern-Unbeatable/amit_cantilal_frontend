import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/@types/api.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { extractApiErrors } from '@/features/auth/auth.hooks.ts'
import {
  useAdminBlockedDates,
  useCreateBlockedDateRange,
  useDeleteBlockedDateRange,
} from '@/features/blocked-dates/blocked-dates.hooks.ts'

export const Route = createFileRoute('/_authenticated/admin/blocked-dates')({
  component: RouteComponent,
})

const emptyForm = { label: '', start_date: '', end_date: '', message: '' }

function RouteComponent() {
  const { data: ranges, isLoading } = useAdminBlockedDates()
  const { mutate: createRange, isPending: isCreating } = useCreateBlockedDateRange()
  const { mutate: deleteRange } = useDeleteBlockedDateRange()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})

    createRange(
      {
        label: form.label,
        start_date: form.start_date,
        end_date: form.end_date,
        message: form.message || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Blocked date range added.')
          setForm(emptyForm)
          setIsDialogOpen(false)
        },
        onError: (error) => {
          const apiErrors = extractApiErrors(error as AxiosError<ApiError>)
          if (apiErrors) {
            setFieldErrors(apiErrors)
            return
          }
          toast.error('Could not add blocked date range.')
        },
      },
    )
  }

  const handleDelete = (id: number, label: string) => {
    const confirmed = window.confirm(
      `Remove "${label}"? Those dates will become bookable again.`,
    )
    if (!confirmed) return

    setDeletingId(id)
    deleteRange(id, {
      onSuccess: () => toast.success('Blocked date range removed.'),
      onError: () => toast.error('Could not remove blocked date range.'),
      onSettled: () => setDeletingId(null),
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Blocked Dates"
        pageSubtitle="Block bookings for busy periods (events, private hire, etc.)"
      />

      <Card className="p-7 mt-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-sm font-semibold text-primary">Blocked Ranges</p>
            <p className="text-xs text-muted-foreground">
              Dates in these ranges are disabled on the booking calendars — customers
              who click a blocked date see a popup pointing them to email/WhatsApp.
            </p>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                setForm(emptyForm)
                setFieldErrors({})
              }
            }}
          >
            <DialogTrigger asChild>
              <Button type="button">
                <Plus className="mr-2 size-4" />
                Block Dates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Block a Date Range</DialogTitle>
                <DialogDescription>
                  Customers won&apos;t be able to select these dates when booking.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={form.label}
                    onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                    placeholder="Lisbon Event — Sept 2026"
                    required
                  />
                  {fieldErrors.label && (
                    <p className="text-xs text-destructive">{fieldErrors.label}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={form.start_date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, start_date: e.target.value }))
                      }
                      required
                    />
                    {fieldErrors.start_date && (
                      <p className="text-xs text-destructive">{fieldErrors.start_date}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={form.end_date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, end_date: e.target.value }))
                      }
                      min={form.start_date || undefined}
                      required
                    />
                    {fieldErrors.end_date && (
                      <p className="text-xs text-destructive">{fieldErrors.end_date}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Popup Message (optional)</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="We're at limited availability for this period due to a special event. Please reach out to us directly by email or WhatsApp to book."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank to use the default message shown to customers.
                  </p>
                  {fieldErrors.message && (
                    <p className="text-xs text-destructive">{fieldErrors.message}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isCreating} className="min-w-[120px]">
                    {isCreating ? 'Adding...' : 'Add Blocked Range'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="h-40 animate-pulse bg-muted/20 rounded-md" />
        ) : ranges && ranges.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranges.map((range) => (
                <TableRow key={range.id}>
                  <TableCell className="font-medium">{range.label}</TableCell>
                  <TableCell>{format(new Date(`${range.start_date}T00:00:00`), 'd MMM yyyy')}</TableCell>
                  <TableCell>{format(new Date(`${range.end_date}T00:00:00`), 'd MMM yyyy')}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {range.message || '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === range.id}
                      onClick={() => handleDelete(range.id, range.label)}
                    >
                      <Trash2 className="mr-1 size-3.5" />
                      {deletingId === range.id ? 'Removing...' : 'Remove'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No blocked date ranges yet. Add one to close off bookings for a busy period.
          </p>
        )}
      </Card>
    </AppWrapper>
  )
}
