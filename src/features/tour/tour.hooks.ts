import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type {
  AdminCreateTourPayload,
  AdminUpdateTourPayload,
  TourPaginationParams,
} from '@/features/tour/tour.types.ts'
import { tourService } from '@/features/tour/tour.service.ts'

export const TOUR_QUERY_KEY = ['tour'] as const

export function useTours() {
  return useQuery({
    queryKey: TOUR_QUERY_KEY,
    queryFn: tourService.all,
    refetchOnWindowFocus: false,
  })
}

export function useTourById(id: string) {
  return useQuery({
    queryKey: [...TOUR_QUERY_KEY, 'detail', id] as const,
    queryFn: () => tourService.byId(id),
    enabled: Boolean(id),
  })
}

export function useToursPaginated(params: TourPaginationParams) {
  return useQuery({
    queryKey: [...TOUR_QUERY_KEY, 'paginated', params] as const,
    queryFn: () => tourService.paginated(params),
    placeholderData: (previousData) => previousData,
  })
}

export function useCreateTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AdminCreateTourPayload) => tourService.create(payload),
    onSuccess: () => {
      toast.success('Tour created successfully')
      queryClient.invalidateQueries({ queryKey: TOUR_QUERY_KEY })
    },
  })
}

export function useUpdateTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number, payload: AdminUpdateTourPayload }) => tourService.update(id, payload),
    onSuccess: () => {
      toast.success('Tour updated successfully')
      queryClient.invalidateQueries({ queryKey: TOUR_QUERY_KEY })
    },
  })
}

export function useDeleteTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | number) => tourService.remove(id),
    onSuccess: () => {
      toast.success('Tour deleted successfully')
      queryClient.invalidateQueries({ queryKey: TOUR_QUERY_KEY })
    },
  })
}
