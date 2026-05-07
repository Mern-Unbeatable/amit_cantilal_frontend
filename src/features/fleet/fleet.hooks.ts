import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AdminCreateFleetPayload, AdminUpdateFleetPayload, FleetPaginationParams } from '@/features/fleet/fleet.types.ts'
import { fleetService } from '@/features/fleet/fleet.service.ts'

export const FLEET_QUERY_KEY = ['fleet'] as const

export function useFleet() {
  return useQuery({
    queryKey: FLEET_QUERY_KEY,
    queryFn: fleetService.all,
  })
}

export function useFleetById(id: string) {
  return useQuery({
    queryKey: [...FLEET_QUERY_KEY, 'detail', id] as const,
    queryFn: () => fleetService.byId(id),
    enabled: Boolean(id),
  })
}

export function useFleetPaginated(params: FleetPaginationParams) {
  return useQuery({
    queryKey: [...FLEET_QUERY_KEY, 'paginated', params] as const,
    queryFn: () => fleetService.paginated(params),
    placeholderData: (previousData) => previousData,
  })
}

export function useCreateFleet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AdminCreateFleetPayload) => fleetService.create(payload),
    onSuccess: () => {
      toast.success('Fleet vehicle created successfully')
      queryClient.invalidateQueries({ queryKey: FLEET_QUERY_KEY })
    },
  })
}

export function useUpdateFleet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number, payload: AdminUpdateFleetPayload }) => fleetService.update(id, payload),
    onSuccess: () => {
      toast.success('Fleet vehicle updated successfully')
      queryClient.invalidateQueries({ queryKey: FLEET_QUERY_KEY })
    },
  })
}

export function useDeleteFleet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | number) => fleetService.remove(id),
    onSuccess: () => {
      toast.success('Fleet vehicle deleted successfully')
      queryClient.invalidateQueries({ queryKey: FLEET_QUERY_KEY })
    },
  })
}
