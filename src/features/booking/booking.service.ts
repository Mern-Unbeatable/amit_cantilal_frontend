import type {
  BookingPaginatedResponse,
  BookingState,
  BookingStatus,
  CreateBookingPayload,
  CreateBookingResponse,
} from '@/features/booking/booking.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const bookingService = {
  createBooking: async (payload: CreateBookingPayload) => {
    const response = await api.post<{ data: CreateBookingResponse }>(
      '/public/bookings',
      payload,
    )
    return unwrap(response)
  },

  getPaginatedBookings: async (params: {
    page: number
    pageSize: number
    status?: string
    serviceType?: string
    date_from?: string
    date_to?: string
  }) => {
    const response = await api.get<{ data: BookingPaginatedResponse }>(
      '/admin/bookings',
      {
        params: {
          page: params.page,
          per_page: params.pageSize,
          status: params.status,
          service_type: params.serviceType,
          date_from: params.date_from,
          date_to: params.date_to,
        },
      },
    )
    return unwrap(response)
  },

  byId: (id: number | string): Promise<BookingState> =>
    api.get<{ data: BookingState }>(`/admin/bookings/${id}`).then(unwrap),

  deleteBooking: (id: number | string): Promise<BookingState> =>
    api.delete<{ data: BookingState }>(`/admin/bookings/${id}`).then(unwrap),

  byPaymentIntent: (id: number | string): Promise<BookingState> =>
    api
      .get<{ data: BookingState }>(`/public/bookings/payment-intent/${id}`)
      .then(unwrap),

  lookup: (reference: string, email: string): Promise<BookingState> =>
    api
      .get<{ data: BookingState }>(`/public/bookings/lookup`, { params: { reference, email } })
      .then(unwrap),

  refreshPaymentIntent: (reference: string, email: string): Promise<CreateBookingResponse> =>
    api
      .post<{ data: CreateBookingResponse }>(`/public/bookings/${reference}/payment-intent`, { email })
      .then(unwrap),

  updateStatus: (
    id: number | string,
    status: BookingStatus,
  ): Promise<BookingState> => {
    if (status !== 'confirmed' && status !== 'cancelled') {
      return Promise.reject(new Error(`Unsupported status transition: ${status}`))
    }
    const action = status === 'confirmed' ? 'confirm' : 'cancel'
    return api
      .post<{ data: BookingState }>(`/admin/bookings/${id}/${action}`)
      .then(unwrap)
  },
}
