import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { PaginationState } from '@tanstack/react-table'
import type {
  PartnershipRequestReSource,
  PartnershipRequestStatus,
} from '@/features/partnership-request/partnership-request.types.ts'
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
import { useGetPaginatedPartnershipRequest } from '@/features/partnership-request/partnership-request.hooks.ts'
import PartnershipRequestTable from '@/features/partnership-request/partnership-request-table.tsx'

export const Route = createFileRoute('/_authenticated/admin/partnerships')({
  component: RouteComponent,
})

function RouteComponent() {
  const [source, setSource] = useState<'all' | PartnershipRequestReSource>(
    'all',
  )
  const [status, setStatus] = useState<'all' | PartnershipRequestStatus>('all')

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isFetching } = useGetPaginatedPartnershipRequest({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    source: source === 'all' ? undefined : source,
    status: status === 'all' ? undefined : status,
  })

  const handleSetPagination: typeof setPagination = (updater) => {
    setPagination((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (next.pageSize !== prev.pageSize) {
        return { ...next, pageIndex: 0 }
      }
      return next
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Partnerships"
        pageSubtitle="Manage partnership requests"
      />

      <Card className="col-span-full w-full p-0 rounded shadow-xs">
        <CardHeader className="flex justify-between p-4 gap-6 md:gap-8">
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value as 'all' | PartnershipRequestStatus)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={source}
            onValueChange={(value) =>
              setSource(value as 'all' | PartnershipRequestReSource)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="partnerships">Partnerships</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-0">
          <PartnershipRequestTable
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
