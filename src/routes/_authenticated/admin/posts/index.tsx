import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import type { PaginationState } from '@tanstack/react-table'
import PageHeader from '@/components/page-header.tsx'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import { DateRangePicker } from '@/components/date-range-picker.tsx'
import { useAdminPosts } from '@/features/blogs/blog.hooks.ts'
import BlogTable from '@/features/blogs/blog-table.tsx'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/_authenticated/admin/posts/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const navigate = useNavigate()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const { data, isFetching } = useAdminPosts({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    date_from: dateRange?.from
      ? format(dateRange.from, 'yyyy-MM-dd')
      : undefined,
    date_to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
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
      <PageHeader pageTitle="Posts" pageSubtitle="Manage blog content" />
      <Card className="col-span-full w-full p-0 rounded shadow-xs">
        <CardHeader className="flex justify-between p-4 gap-6 md:gap-8">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Filter by date range"
            numberOfMonths={2}
            className="w-full h-11"
          />
          <Button
            onClick={() => navigate({ to: '/admin/posts/create' })}
            className="gap-2 h-11"
          >
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <BlogTable
            posts={data?.data ?? []}
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
