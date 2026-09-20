import * as React from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { flexRender } from '@tanstack/react-table'
import { DraggableRow } from './draggable-row'
import type { ColumnDef, Table as TanStackTable } from '@tanstack/react-table'
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableProps<TData, TValue> {
  table: TanStackTable<TData>
  columns: Array<ColumnDef<TData, TValue>>
  dndEnabled?: boolean
  onReorder?: (newData: Array<TData>) => void
  isLoading?: boolean // ✅ new
  skeletonRows?: number // ✅ configurable — defaults to 5
}

// ── Skeleton rows ─────────────────────────────────────────────────────────────
function SkeletonRows<TData, TValue>({
  columns,
  rows = 5,
}: {
  columns: Array<ColumnDef<TData, TValue>>
  rows?: number
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {columns.map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full rounded-sm" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

function renderTableBody<TData, TValue>({
  table,
  columns,
  dndEnabled,
  dataIds,
  isLoading,
  skeletonRows,
}: {
  table: TanStackTable<TData>
  columns: Array<ColumnDef<TData, TValue>>
  dndEnabled: boolean
  dataIds: Array<UniqueIdentifier>
  isLoading: boolean // ✅
  skeletonRows: number // ✅
}) {
  // ✅ Show skeletons while loading
  if (isLoading) {
    return <SkeletonRows columns={columns} rows={skeletonRows} />
  }

  if (!table.getRowModel().rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No data Found
        </TableCell>
      </TableRow>
    )
  }

  if (dndEnabled) {
    return (
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {table.getRowModel().rows.map((row) => (
          <DraggableRow key={row.id} row={row} />
        ))}
      </SortableContext>
    )
  }

  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={
            cell.column.columnDef.size !== 150
              ? { width: `${cell.column.getSize()}%` }
              : undefined
          }
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ))
}

export function DataTable<TData, TValue>({
  table,
  columns,
  dndEnabled = false,
  onReorder,
  isLoading = false, // ✅
  skeletonRows = 5, // ✅
}: DataTableProps<TData, TValue>) {
  const dataIds: Array<UniqueIdentifier> = table
    .getRowModel()
    .rows.map((row) => Number(row.id) as UniqueIdentifier)

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (active && over && active.id !== over.id && onReorder) {
      const oldIndex = dataIds.indexOf(active.id)
      const newIndex = dataIds.indexOf(over.id)
      const newData = arrayMove(table.options.data, oldIndex, newIndex)
      onReorder(newData)
    }
  }

  const hasFooter = table
    .getFooterGroups()
    .some((group) =>
      group.headers.some((header) => header.column.columnDef.footer),
    )

  const hasData = table.getRowModel().rows.length > 0 && !isLoading

  const tableContent = (
    <Table>
      <TableHeader className="sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={
                  header.column.columnDef.size !== 150
                    ? { width: `${header.getSize()}%` }
                    : undefined
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {renderTableBody({
          table,
          columns,
          dndEnabled,
          dataIds,
          isLoading,
          skeletonRows,
        })}
      </TableBody>
      {hasFooter && hasData && (
        <TableFooter className="text-primary">
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  style={
                    header.column.columnDef.size !== 150
                      ? { width: `${header.getSize()}%` }
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Table>
  )

  if (dndEnabled) {
    return (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={sortableId}
      >
        {tableContent}
      </DndContext>
    )
  }

  return tableContent
}
