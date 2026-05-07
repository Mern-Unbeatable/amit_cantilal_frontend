import { Link, createFileRoute } from '@tanstack/react-router'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import type { FleetVehicle } from '@/features/fleet/fleet.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { DataTable } from '@/components/data-table/data-table.tsx'
import { DataTablePagination } from '@/components/data-table/data-table-pagination.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet.tsx'
import { useDeleteFleet, useFleetById, useFleetPaginated } from '@/features/fleet/fleet.hooks.ts'
import { useDataTableInstance } from '@/hooks/use-datatable-instance.ts'
import { formatCurrency } from '@/lib/utils.ts'
import { Spinner } from '@/components/ui/spinner.tsx'

export const Route = createFileRoute('/_authenticated/admin/fleet-vehicle/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [selectedFleetId, setSelectedFleetId] = useState<string>('')
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deletingFleetId, setDeletingFleetId] = useState<string>('')

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const normalizedSearch = useMemo(() => search.trim(), [search])

  const { data, isFetching } = useFleetPaginated({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: normalizedSearch || undefined,
  })

  const fleet = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const { mutate: deleteFleet, isPending: isDeleting } = useDeleteFleet()
  const { data: selectedFleet, isLoading: isDetailLoading, isError: isDetailError } = useFleetById(selectedFleetId)

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [normalizedSearch])

  const columns = useMemo<Array<ColumnDef<FleetVehicle, unknown>>>(
    () => [
      {
        accessorKey: 'name',
        header: 'Fleet Name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {formatCurrency(row.original.price)}
          </div>
        )
      },
      {
        id: 'fuel_type',
        header: 'Fuel Type',
        cell: ({ row }) => row.original.fuel_type ?? row.original.category ?? (row.original.is_electric ? 'electric' : 'diesel'),
      },
      {
        accessorKey: 'passengers',
        header: 'Passengers',
      },
      {
        accessorKey: 'suitcases',
        header: 'Suitcases',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedFleetId(String(row.original.id))
                setIsDetailOpen(true)
              }}
            >
              View
            </Button>
            <Button asChild type="button" variant="outline" size="sm">
              <Link
                to="/admin/fleet-vehicle/$fleetId/edit"
                params={{ fleetId: String(row.original.id) }}
              >
                <Pencil className="mr-1 size-3.5" />
                Edit
              </Link>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isDeleting && deletingFleetId === String(row.original.id)}
              onClick={() => {
                const fleetId = String(row.original.id)
                const canDelete = window.confirm(`Delete ${row.original.name}? This action cannot be undone.`)

                if (!canDelete) {
                  return
                }

                setDeletingFleetId(fleetId)
                deleteFleet(fleetId, {
                  onSettled: () => {
                    setDeletingFleetId('')
                  },
                })
              }}
            >
              <Trash2 className="mr-1 size-3.5" />
              {isDeleting && deletingFleetId === String(row.original.id) ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        ),
      },
    ],
    [deleteFleet, deletingFleetId, isDeleting],
  )

  const handleSetPagination: typeof setPagination = (updater) => {
    setPagination((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (next.pageSize !== prev.pageSize) {
        return { ...next, pageIndex: 0 }
      }
      return next
    })
  }

  const table = useDataTableInstance<FleetVehicle, unknown>({
    data: fleet,
    columns,
    getRowId: (row) => String(row.id),
    pagination,
    setPagination: handleSetPagination,
    totalCount,
  })

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Fleet Vehicles"
        pageSubtitle="Manage fleet vehicles"
      />

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">Fleet Vehicles</p>
            <p className="text-xs text-muted-foreground">Browse and search backend fleet records.</p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search fleet..."
              className="max-w-xs"
            />
            <Button asChild>
              <Link to="/admin/fleet-vehicle/create">
                <Plus className="mr-2 size-4" />
                Create Fleet
              </Link>
            </Button>
          </div>
        </div>

        <DataTable
          table={table}
          columns={columns}
          isLoading={isFetching}
          skeletonRows={10}
        />

        {!isFetching && totalCount > 0 ? (
          <DataTablePagination table={table} />
        ) : null}
      </div>

      <Sheet
        open={isDetailOpen}
        onOpenChange={(open) => {
          setIsDetailOpen(open)
          if (!open) {
            setSelectedFleetId('')
          }
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Fleet Detail</SheetTitle>
            <SheetDescription>Fleet vehicle details.</SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 text-sm">
            {isDetailLoading ? (
              <p className="text-muted-foreground"><Spinner/> Loading details...</p>
            ) : isDetailError || !selectedFleet ? (
              <p className="text-muted-foreground">Unable to load fleet details.</p>
            ) : (
              <>
                {selectedFleet.image ? (
                  <div className="rounded-md border p-3">
                    <p className="mb-2 text-xs text-muted-foreground">Image</p>
                    <img
                      src={selectedFleet.image}
                      alt={selectedFleet.name}
                      className="h-40 w-full rounded-md object-cover"
                    />
                  </div>
                ) : null}
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedFleet.name}</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Fuel Type</p>
                  <p className="font-medium capitalize">
                    {selectedFleet.fuel_type ?? selectedFleet.category ?? (selectedFleet.is_electric ? 'electric' : 'diesel')}
                  </p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Passengers</p>
                  <p className="font-medium">{selectedFleet.passengers}</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Suitcases</p>
                  <p className="font-medium">{selectedFleet.suitcases}</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-medium">{formatCurrency(selectedFleet.price)}</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="font-medium">{selectedFleet.description || '-'}</p>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </AppWrapper>
  )
}
