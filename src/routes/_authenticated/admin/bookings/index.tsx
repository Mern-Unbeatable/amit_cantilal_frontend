import { createFileRoute } from '@tanstack/react-router'
import {useState} from "react";
import {format} from "date-fns";
import type {BookingStatus, ServiceType} from "@/features/booking/booking.types.ts";
import type {DateRange} from "react-day-picker";
import type {PaginationState} from "@tanstack/react-table";
import AppWrapper from "@/components/layouts/sidebar/app-wrapper.tsx";
import PageHeader from "@/components/page-header.tsx";
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {DateRangePicker} from "@/components/date-range-picker.tsx";
import BookingDatatable from "@/features/booking/booking-datatable.tsx";
import {useGetPaginatedBookings} from "@/features/booking/booking.hooks.ts";

export const Route = createFileRoute('/_authenticated/admin/bookings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [status, setStatus] = useState<'all' | BookingStatus>('all')
  const [serviceType, setServiceType] = useState<'all' | ServiceType>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const { data, isFetching } = useGetPaginatedBookings({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    status: status === 'all' ? undefined : status,
    serviceType: serviceType === 'all' ? undefined : serviceType,
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
      <PageHeader
        pageTitle="Bookings"
        pageSubtitle="Manage customer bookings"
      />
      <Card className="col-span-full w-full p-0 rounded shadow-xs">
        <CardHeader className="flex justify-between p-4 gap-6 md:gap-8">
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as 'all' | BookingStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={serviceType}
            onValueChange={(value) =>
              setServiceType(value as 'all' | ServiceType)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>

          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Filter by date range"
            numberOfMonths={2}
            className="w-full h-11"
          />
        </CardHeader>
        <CardContent className="px-0">
          <BookingDatatable
            bookings={data?.data ?? []}
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
