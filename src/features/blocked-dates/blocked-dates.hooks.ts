import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateBlockedDateRangePayload } from '@/features/blocked-dates/blocked-dates.types.ts'
import { blockedDatesService } from '@/features/blocked-dates/blocked-dates.service.ts'

export const blockedDatesKeys = {
  all: ['blocked-dates'] as const,
  public: () => [...blockedDatesKeys.all, 'public'] as const,
  admin: () => [...blockedDatesKeys.all, 'admin'] as const,
}

/** Used by the booking widgets to disable dates + show the "reach out" popup. */
export function usePublicBlockedDates() {
  return useQuery({
    queryKey: blockedDatesKeys.public(),
    queryFn: blockedDatesService.getPublicBlockedDates,
    staleTime: 1000 * 60 * 10,
  })
}

export function useAdminBlockedDates() {
  return useQuery({
    queryKey: blockedDatesKeys.admin(),
    queryFn: blockedDatesService.getAdminBlockedDates,
  })
}

export function useCreateBlockedDateRange() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateBlockedDateRangePayload) =>
      blockedDatesService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blockedDatesKeys.all })
    },
  })
}

export function useDeleteBlockedDateRange() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => blockedDatesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blockedDatesKeys.all })
    },
  })
}
