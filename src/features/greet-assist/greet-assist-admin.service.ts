import { api, unwrap } from '@/services/api.ts'
import type {
  AdminGreetAssistBooking,
  AdminGreetAssistListResponse,
} from './greet-assist-admin.types.ts'

export const greetAssistAdminService = {
  getBookings: async (params: {
    page: number
    status?: string
    search?: string
  }): Promise<AdminGreetAssistListResponse> => {
    const query = new URLSearchParams()
    query.set('page', String(params.page))
    query.set('service_type', 'greet_assist')
    if (params.status && params.status !== 'all') {
      query.set('status', params.status)
    }
    if (params.search && params.search.trim()) {
      query.set('search', params.search.trim())
    }

    const response = await api.get<{ data: AdminGreetAssistListResponse }>(
      `/admin/bookings?${query.toString()}`,
    )
    return unwrap(response)
  },

  getBooking: async (id: number | string): Promise<AdminGreetAssistBooking> => {
    const response = await api.get<{ data: AdminGreetAssistBooking }>(
      `/admin/bookings/${id}`,
    )
    return unwrap(response)
  },

  confirmBooking: async (
    id: number | string,
  ): Promise<{ message?: string }> => {
    const response = await api.post<{ message?: string }>(
      `/admin/bookings/${id}/confirm`,
    )
    return response.data
  },

  cancelBooking: async (
    id: number | string,
  ): Promise<{ message?: string }> => {
    const response = await api.post<{ message?: string }>(
      `/admin/bookings/${id}/cancel`,
    )
    return response.data
  },

  deleteBooking: async (
    id: number | string,
  ): Promise<{ message?: string }> => {
    const response = await api.delete<{ message?: string }>(
      `/admin/bookings/${id}`,
    )
    return response.data
  },
}
