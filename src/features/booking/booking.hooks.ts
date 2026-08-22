import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  activity: (id: number | string) =>
    [...bookingKeys.all, 'activity', id] as const,
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: bookingService.createBooking,
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



export function useLookupBooking() {
  return useMutation({
    mutationFn: ({ reference, email }: { reference: string; email: string }) =>
      bookingService.lookup(reference, email),
  })
}

export function useRefreshPaymentIntent() {
  return useMutation({
    mutationFn: ({ reference, email }: { reference: string; email: string }) =>
      bookingService.refreshPaymentIntent(reference, email),
  })
}

export function useStripeStatus() {
  return useMutation({
    mutationFn: (id: number | string) => bookingService.getStripeStatus(id),
  })
}

export function useBookingActivity(id: number | string) {
  return useQuery({
    queryKey: bookingKeys.activity(id),
    queryFn: () => bookingService.getActivity(id),
  })
}

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => bookingService.deleteBooking(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: bookingKeys.all }),
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
      queryClient.invalidateQueries({ queryKey: bookingKeys.activity(data.id) })
    },
  })
}
