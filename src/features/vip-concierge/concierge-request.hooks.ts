import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { conciergeRequestService } from './concierge-request.service.ts'
import type { ConciergeRequestStatus } from './concierge-request.types.ts'

export const conciergeRequestKeys = {
  all: ['concierge-requests'] as const,
  paginatedList: (params: object) =>
    [...conciergeRequestKeys.all, 'list', params] as const,
  detail: (id: number | string) =>
    [...conciergeRequestKeys.all, 'detail', id] as const,
}

export function useCreateConciergeRequest() {
  return useMutation({
    mutationFn: conciergeRequestService.create,
  })
}

export function useGetPaginatedConciergeRequests(params: {
  page: number
  pageSize: number
  status?: string
}) {
  return useQuery({
    queryKey: conciergeRequestKeys.paginatedList(params),
    queryFn: () => conciergeRequestService.getPaginated(params),
    staleTime: 1000 * 60 * 5,
  })
}

export function useUpdateConciergeRequestStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number | string
      status: ConciergeRequestStatus
    }) => conciergeRequestService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conciergeRequestKeys.all })
    },
  })
}

export function useDeleteConciergeRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number | string) => conciergeRequestService.destroy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conciergeRequestKeys.all })
    },
  })
}
