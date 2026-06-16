import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import type { PaginationState } from '@tanstack/react-table'
import { useAdminUsers } from '@/features/users/user.hooks.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import UserTable from '@/features/users/user-table.tsx'

export const Route = createFileRoute('/_authenticated/admin/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isFetching } = useAdminUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: search || undefined,
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
      <PageHeader pageTitle="Users" pageSubtitle="Manage system users" />
      <Card className="col-span-full w-full p-0 rounded shadow-xs">
        <CardHeader className="flex justify-between items-center p-4 gap-6 md:gap-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button
            onClick={() => navigate({ to: '/admin/users/create' })}
            className="gap-2 h-11"
          >
            <Plus className="w-4 h-4" /> New User
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <UserTable
            users={data?.data ?? []}
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
