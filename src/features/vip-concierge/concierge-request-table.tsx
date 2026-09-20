import { useMemo } from 'react'
import { conciergeRequestColumns } from './concierge-request-columns.tsx'
import type { Dispatch, SetStateAction } from 'react'
import type { PaginationState } from '@tanstack/react-table'
import type { ConciergeRequestState } from './concierge-request.types.ts'
import { useDataTableInstance } from '@/hooks/use-datatable-instance'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'

interface Props {
  requests: Array<ConciergeRequestState>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  totalCount: number
  isLoading: boolean
}

export default function ConciergeRequestTable({
  requests,
  pagination,
  setPagination,
  totalCount,
  isLoading,
}: Props) {
  const columns = useMemo(() => conciergeRequestColumns(), [])

  const table = useDataTableInstance<ConciergeRequestState, unknown>({
    data: requests,
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
      {!isLoading && totalCount > 0 && <DataTablePagination table={table} />}
    </div>
  )
}
