import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { PaginationState } from '@tanstack/react-table'
import type { BookingState } from '@/features/booking/booking.types.ts'
import { useDataTableInstance } from '@/hooks/use-datatable-instance'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { bookingColumns } from '@/features/booking/booking-columns.tsx'

interface BookingDatatableProps {
  bookings: Array<BookingState>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  totalCount: number
  isLoading: boolean
  hidePagination?: boolean
}

const BookingDatatable = ({
  bookings,
  pagination,
  setPagination,
  totalCount,
  isLoading,
  hidePagination = false,
}: BookingDatatableProps) => {
  const columns = useMemo(() => bookingColumns(), [])

  const table = useDataTableInstance<BookingState, unknown>({
    data: bookings,
    columns,
    getRowId: (row) => row.id.toString(),
    pagination,
    setPagination,
    totalCount,
  })

  return (
    <div className="space-y-4">
      <DataTable
        table={table}
        columns={columns}
        isLoading={isLoading}
        skeletonRows={10}
      />

      {!isLoading && totalCount > 0 && !hidePagination && (
        <DataTablePagination table={table} />
      )}
    </div>
  )
}

export default BookingDatatable
