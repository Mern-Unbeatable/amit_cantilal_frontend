import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import { toast } from 'sonner'
import type {
  AdminGreetAssistBooking,
  AdminGreetAssistPagination,
} from '@/features/greet-assist/greet-assist-admin.types.ts'
import { greetAssistAdminService } from '@/features/greet-assist/greet-assist-admin.service.ts'
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
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/_authenticated/admin/greet-and-assist/')({
  component: RouteComponent,
})

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-900/40 text-green-300 border-green-800',
    pending: 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
    cancelled: 'bg-gray-800 text-gray-400 border-gray-700',
    payment_failed: 'bg-red-900/40 text-red-300 border-red-800',
  }
  const cls = styles[status] || 'bg-gray-800 text-gray-300 border-gray-700'
  return (
    <span className={`inline-block px-2.5 py-0.5 text-[11px] rounded-sm border uppercase font-mono ${cls}`}>
      {status}
    </span>
  )
}

function RouteComponent() {
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<string>('')

  const [bookings, setBookings] = useState<AdminGreetAssistBooking[]>([])
  const [pagination, setPagination] = useState<AdminGreetAssistPagination>({
    current_page: 1,
    last_page: 1,
    from: 0,
    to: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchBookings = useCallback(
    async (targetPage = page) => {
      setIsLoading(true)
      try {
        const res = await greetAssistAdminService.getBookings({
          page: targetPage,
          status,
          search: activeSearch,
        })
        setBookings(res.data)
        setPagination(res.pagination)
        setPage(res.pagination.current_page)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load bookings.'
        toast.error(msg)
      } finally {
        setIsLoading(false)
      }
    },
    [page, status, activeSearch],
  )

  useEffect(() => {
    fetchBookings(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, activeSearch])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveSearch(searchTerm)
  }

  const handleRowClick = (bookingId: number) => {
    navigate({
      to: '/admin/greet-and-assist/$id',
      params: { id: String(bookingId) },
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Greet & Assist"
        pageSubtitle="Manage airport greet & assist reservations"
      />

      <Card className="col-span-full w-full p-0 rounded-sm bg-[#121212] border-[#2A2A2A] shadow-xs text-[#D1C7B7]">
        {/* Filters Header (Without Service Type dropdown, as requested) */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 border-b border-[#222222]">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Status Filter */}
            <Select
              value={status}
              onValueChange={(val) => {
                setStatus(val)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[180px] bg-[#171717] border-[#2E2E2E] text-xs h-10">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2E2E2E] text-xs">
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="payment_failed">Payment failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-[260px]">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Reference, name, email"
                className="w-full bg-[#171717] border border-[#2E2E2E] focus:border-[#C9A84C] text-[#F5F0E8] pl-3 pr-8 py-2 rounded-sm text-xs focus:outline-none placeholder:text-[#555555]"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C9A84C]"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchBookings(page)}
              disabled={isLoading}
              className="bg-[#171717] border-[#2E2E2E] text-[#D1C7B7] hover:text-[#F5F0E8] hover:border-[#C9A84C] text-xs h-10 px-3"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        {/* Bookings Table */}
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left font-sans">
            <thead className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-[#2A2A2A] bg-[#0E0E0E]">
              <tr>
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Service</th>
                <th className="p-3.5">Date / Time</th>
                <th className="p-3.5">Airport / Flight</th>
                <th className="p-3.5 text-center">Pax</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Created</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500 text-sm">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500 text-sm">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const d = b.details || {}
                  const time = b.pickup_time ? String(b.pickup_time).slice(0, 5) : ''
                  const airportFlight = `${d.airport || 'LIS'} · ${d.flight_number || '—'}`

                  return (
                    <tr
                      key={b.id}
                      onClick={() => handleRowClick(b.id)}
                      className="border-b border-[#1F1F1F] hover:bg-[#181818] cursor-pointer transition-colors"
                    >
                      <td className="p-3.5 text-[#C9A84C] font-mono whitespace-nowrap font-medium">
                        <Link
                          to="/admin/greet-and-assist/$id"
                          params={{ id: String(b.id) }}
                          className="hover:underline"
                        >
                          {b.reference}
                        </Link>
                      </td>
                      <td className="p-3.5">
                        <div className="text-gray-200 font-medium">{b.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{b.email}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-gray-200">Greet &amp; Assist</div>
                        {d.greet_service_type && (
                          <div className="text-[11px] text-gray-500 uppercase font-mono">
                            {d.greet_service_type}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-gray-300 font-mono text-xs">
                        {b.date} {time}
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-gray-200 font-mono text-xs">
                        {airportFlight}
                      </td>
                      <td className="p-3.5 text-center text-gray-200 font-mono">
                        {b.passengers}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap text-[#C9A84C] font-mono font-medium">
                        €{(b.amount / 100).toFixed(2)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="p-3.5 text-[11px] text-gray-500 whitespace-nowrap font-mono">
                        {new Date(b.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <Link
                          to="/admin/greet-and-assist/$id"
                          params={{ id: String(b.id) }}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 text-xs border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0B0B0B] rounded-sm transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4 border-t border-[#222222] text-xs text-gray-400">
            <span>
              Showing {pagination.from || 0}–{pagination.to || 0} of {pagination.total} · Page{' '}
              {pagination.current_page} of {pagination.last_page}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchBookings(page - 1)}
                disabled={pagination.current_page <= 1 || isLoading}
                className="bg-[#171717] border-[#2E2E2E] text-xs h-8 px-3"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchBookings(page + 1)}
                disabled={pagination.current_page >= pagination.last_page || isLoading}
                className="bg-[#171717] border-[#2E2E2E] text-xs h-8 px-3"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppWrapper>
  )
}
