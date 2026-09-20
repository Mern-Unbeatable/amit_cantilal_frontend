import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { PaginationState } from '@tanstack/react-table'
import type { AdminUser } from '@/features/users/user.types.ts'
import { useDataTableInstance } from '@/hooks/use-datatable-instance'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { userColumns } from '@/features/users/user-columns.tsx'

interface UserTableProps {
  users: Array<AdminUser>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  totalCount: number
  isLoading: boolean
  hidePagination?: boolean
}

const UserTable = ({
  users,
  pagination,
  setPagination,
  totalCount,
  isLoading,
  hidePagination = false,
}: UserTableProps) => {
  const columns = useMemo(() => userColumns(), [])

  const table = useDataTableInstance<AdminUser, unknown>({
    data: users,
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

export default UserTable
