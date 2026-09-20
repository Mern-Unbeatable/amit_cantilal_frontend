import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'

type UseDataTableInstanceProps<TData, TValue> = {
  data: Array<TData>
  columns: Array<ColumnDef<TData, TValue>>
  enableRowSelection?: boolean
  defaultPageIndex?: number
  defaultPageSize?: number
  getRowId?: (row: TData, index: number) => string
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  totalCount: number
}

// A basic "fuzzy" filter implementation
const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  // Return true if the value is found, false otherwise
  const itemValue = row.getValue(columnId)
  if (itemValue == null) return false

  // Simple case-insensitive inclusion check
  return String(itemValue).toLowerCase().includes(String(value).toLowerCase())
}

export function useDataTableInstance<TData, TValue>({
  data,
  columns,
  enableRowSelection = true,
  pagination,
  setPagination,
  getRowId,
  totalCount,
}: UseDataTableInstanceProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  return useReactTable({
    data,
    columns,
    rowCount: totalCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection,
    getRowId:
      getRowId ??
      ((row, index) =>
        'id' in (row as any) ? String((row as any).id) : String(index)),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    debugTable: true,
  })
}
