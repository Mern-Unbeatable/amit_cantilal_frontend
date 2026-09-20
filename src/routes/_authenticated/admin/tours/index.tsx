import { Link, createFileRoute } from '@tanstack/react-router'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import type { Tour, TourCategory } from '@/features/tour/tour.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { DataTable } from '@/components/data-table/data-table.tsx'
import { DataTablePagination } from '@/components/data-table/data-table-pagination.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useDeleteTour, useToursPaginated } from '@/features/tour/tour.hooks.ts'
import { useDataTableInstance } from '@/hooks/use-datatable-instance.ts'
import { formatCurrency } from '@/lib/utils.ts'

export const Route = createFileRoute('/_authenticated/admin/tours/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'all' | TourCategory>('all')
  const [deletingTourId, setDeletingTourId] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const normalizedSearch = useMemo(() => search.trim(), [search])

  const { data, isFetching } = useToursPaginated({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: normalizedSearch || undefined,
    category: category === 'all' ? undefined : category,
  })
  const tours = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const { mutate: deleteTour, isPending: isDeleting } = useDeleteTour()

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [normalizedSearch, category])

  const columns = useMemo<Array<ColumnDef<Tour, unknown>>>(
    () => [
      {
        id: 'title',
        header: 'Title',
        cell: ({ row }) => row.original.title ?? row.original.name ?? '-',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        id: 'duration',
        header: 'Duration',
        cell: ({ row }) =>
          row.original.duration ??
          (typeof row.original.duration_minutes === 'number'
            ? `${row.original.duration_minutes} min`
            : '-'),
      },
      {
        accessorKey: 'max_guests',
        header: 'Max Guests',
      },
      {
        id: 'price',
        header: 'Price',
        cell: ({ row }) => {
          if (typeof row.original.price === 'number') {
            return formatCurrency(row.original.price)
          }

          if (typeof row.original.price_eur === 'number') {
            return formatCurrency(row.original.price_eur / 100)
          }

          return row.original.price_display ?? '-'
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button asChild type="button" variant="outline" size="sm">
              <Link
                to="/admin/tours/$tourId/edit"
                params={{ tourId: String(row.original.id) }}
              >
                <Pencil className="mr-1 size-3.5" />
                Edit
              </Link>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={
                isDeleting && deletingTourId === String(row.original.id)
              }
              onClick={() => {
                const tourId = String(row.original.id)
                const canDelete = window.confirm(
                  `Delete ${row.original.title ?? row.original.name ?? 'this tour'}? This action cannot be undone.`,
                )

                if (!canDelete) {
                  return
                }

                setDeletingTourId(tourId)
                deleteTour(tourId, {
                  onSettled: () => {
                    setDeletingTourId('')
                  },
                })
              }}
            >
              <Trash2 className="mr-1 size-3.5" />
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [deleteTour, deletingTourId, isDeleting],
  )

  const table = useDataTableInstance<Tour, unknown>({
    data: tours,
    columns,
    getRowId: (row) => String(row.id),
    pagination,
    setPagination,
    totalCount,
  })

  return (
    <AppWrapper>
      <PageHeader pageTitle="Tours" pageSubtitle="Manage tour offerings" />

      <div className="space-y-4 p-4 md:p-6">
        <div className="flex justify-end">
          <Button asChild>
            <Link to="/admin/tours/create">
              <Plus className="mr-2 size-4" />
              Create Tour
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tours"
            className="max-w-sm"
          />
          <Select
            value={category}
            onValueChange={(value) =>
              setCategory(value as 'all' | TourCategory)
            }
          >
            <SelectTrigger className="w-full md:w-55">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="on_demand">On demand</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          table={table}
          columns={columns}
          isLoading={isFetching}
          skeletonRows={8}
        />

        {!isFetching && totalCount > 0 && <DataTablePagination table={table} />}
      </div>
    </AppWrapper>
  )
}
