import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { PaginationState } from '@tanstack/react-table'
import type { ConciergeRequestStatus } from '@/features/vip-concierge/concierge-request.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useGetPaginatedConciergeRequests } from '@/features/vip-concierge/concierge-request.hooks.ts'
import ConciergeRequestTable from '@/features/vip-concierge/concierge-request-table.tsx'

export const Route = createFileRoute(
  '/_authenticated/admin/concierge-requests',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [status, setStatus] = useState<'all' | ConciergeRequestStatus>('all')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isFetching } = useGetPaginatedConciergeRequests({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    status: status === 'all' ? undefined : status,
  })

  const handleSetPagination: typeof setPagination = (updater) => {
    setPagination((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (next.pageSize !== prev.pageSize) return { ...next, pageIndex: 0 }
      return next
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Concierge Requests"
        pageSubtitle="Manage VIP concierge & airport assist requests"
      />

      <Card className="col-span-full w-full p-0 rounded shadow-xs">
        <CardHeader className="flex justify-between p-4 gap-6 md:gap-8">
          <Select
            value={status}
            onValueChange={(v) =>
              setStatus(v as 'all' | ConciergeRequestStatus)
            }
          >
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-0">
          <ConciergeRequestTable
            requests={data?.data ?? []}
            pagination={pagination}
            setPagination={handleSetPagination}
            totalCount={data?.pagination.total ?? 0}
            isLoading={isFetching}
          />
        </CardContent>
      </Card>
    </AppWrapper>
  )
}
