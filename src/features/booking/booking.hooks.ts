import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { loadStripe } from '@stripe/stripe-js'
import type { BookingStatus } from '@/features/booking/booking.types.ts'
import { bookingService } from '@/features/booking/booking.service.ts'

export const bookingKeys = {
  all: ['bookings'] as const,
  paginatedList: (params: object) =>
    [...bookingKeys.all, 'list', params] as const,
  detail: (id: number | string) =>
    [...bookingKeys.all, 'detail', id] as const,
  paymentIntent: (id: number | string) =>
    [...bookingKeys.all, 'paymentIntent', id] as const,
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: async (data) => {
      const stripe = await loadStripe(data.publishable_key)
      if (!stripe) return

      const { error } = await stripe.confirmPayment({
        clientSecret: data.client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/confirm`,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (error) {
        console.error('Payment confirmation error:', error)
      }
    },
  })
}

export function useGetPaginatedBookings(params: {
  page: number
  pageSize: number
  status?: string
  serviceType?: string
  date_from?: string
  date_to?: string
}) {
  return useQuery({
    queryKey: bookingKeys.paginatedList(params),
    queryFn: () => bookingService.getPaginatedBookings(params),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetBooking(id: number | string) {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => bookingService.byId(id),
    staleTime: 1000 * 60 * 5,
  })
}

export function useGetBookingByPaymentIntent(id: number | string) {
  return useQuery({
    queryKey: bookingKeys.paymentIntent(id),
    queryFn: () => bookingService.byPaymentIntent(id),
    staleTime: 1000 * 60 * 5,
  })
}



export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number | string
      status: BookingStatus
    }) => bookingService.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(data.id) })
    },
  })
}
