import type { DashboardStats, MonthlyBooking, ServiceStatistic } from '@/features/dashboard/dashboard.types.ts'
import type { BookingState } from '@/features/booking/booking.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const dashboardService = {
  getStats: async () => {
    const response = await api.get<{ data: DashboardStats }>('/admin/dashboard/stats')
    return unwrap(response)
  },

  getMonthly: async () => {
    const response = await api.get<{ data: Array<MonthlyBooking> }>('/admin/dashboard/monthly')
    return unwrap(response)
  },

  getChannels: async () => {
    const response = await api.get<{ data: Array<ServiceStatistic> }>('/admin/dashboard/channels')
    return unwrap(response)
  },

  getRecentBookings: async () => {
    const response = await api.get<{ data: Array<BookingState> }>('/admin/dashboard/recent-bookings')
    return unwrap(response)
  },
}
